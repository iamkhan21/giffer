<template>
  <h2>Mark the moment you going convert to gif</h2>
  <section>
    <Player
      ref="playerEl"
      loop
      playsinline
      :currentTime="currentTime"
      @vmCurrentTimeChange="onTimeUpdate"
      @vmDurationChange="getDuration"
    >
      <Video>
        <source :data-src="videoUrl" />
      </Video>

      <DefaultUi noControls>
        <Controls fullWidth pin="bottom">
          <ControlGroup>
            <ScrubberControl />
          </ControlGroup>
          <ControlGroup space="top">
            <PlaybackControl />
            <VolumeControl />
            <TimeProgress />
            <ControlSpacer />
            <el-button circle icon="el-icon-scissors" @click="setFlag" />
          </ControlGroup>
        </Controls>
      </DefaultUi>
    </Player>
  </section>

  <section class="range-section">
    <el-slider v-model="selectedRange" :max="duration" range :step="0.01" />
  </section>

  <section>
    <div v-if="fragmentSelected">
      <p>
        Selected moment starts at {{ selectedRange[0] }}s and ends at
        {{ selectedRange[1] }}s
      </p>
      <div class="btn-group">
        <el-button icon="el-icon-s-ticket" @click="playbackFragment"
          >Watch fragment</el-button
        >
        <el-button icon="el-icon-picture" type="primary" @click="convertVideo"
          >Convert to gif
        </el-button>
      </div>
    </div>
    <p v-else>Please, select fragment for converting to gif</p>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent, onUnmounted, ref } from "vue";
import { useStore } from "vuex";
import {
  ControlGroup,
  Controls,
  ControlSpacer,
  DefaultUi,
  PlaybackControl,
  Player,
  ScrubberControl,
  TimeProgress,
  Video,
  VolumeControl,
} from "@vime/vue-next";

import "@vime/core/themes/default.css";

export default defineComponent({
  name: "FragmentSelector",
  components: {
    Player,
    Video,
    DefaultUi,
    Controls,
    ControlSpacer,
    ControlGroup,
    VolumeControl,
    ScrubberControl,
    PlaybackControl,
    TimeProgress,
  },
  setup: function () {
    const store = useStore();
    const playerEl = ref<any>(null);

    const currentTime = ref(0);
    const duration = ref(0);
    const selectedRange = ref([0, 0]);
    const videoUrl = computed(() => store.getters["editor/videoUrl"]);

    const fragmentSelected = computed(() => {
      const [start, end] = selectedRange.value;
      return end - start > 0.5;
    });

    let isPlaybackFragment = false;

    const getDuration = (time: number) => {
      const dur = Math.round(time);
      duration.value = dur;
      selectedRange.value = [dur, dur];
    };

    const playbackFragment = () => {
      isPlaybackFragment = true;
      currentTime.value = selectedRange.value[0];
      playerEl.value.play();
    };

    const onTimeUpdate = (time: number) => {
      currentTime.value = time;
      if (isPlaybackFragment && time >= selectedRange.value[1]) {
        isPlaybackFragment = false;
        playerEl.value.pause();
      }
    };

    const setFlag = () => {
      playerEl.value.pause();

      let [start, end] = selectedRange.value;
      const curT = Math.round(currentTime.value * 100) / 100;

      if (start > curT) start = curT;
      else end = curT;

      selectedRange.value = [start, end];
    };

    const convertVideo = () => {
      store.dispatch("editor/convertVideoToGif", selectedRange.value);
    };

    onUnmounted(() => videoUrl.value && URL.revokeObjectURL(videoUrl.value));

    return {
      currentTime,
      videoUrl,
      playerEl,
      duration,
      selectedRange,
      fragmentSelected,
      onTimeUpdate,
      getDuration,
      convertVideo,
      playbackFragment,
      setFlag,
    };
  },
});
</script>

<style scoped>
.range-section {
  margin: 20px 10px 0;
}
</style>
