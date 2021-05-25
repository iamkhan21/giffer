<template>
  <section>
    <div><img class="gif" alt="Gif from video" :src="gifUrl" /></div>

    <div class="btn-group">
      <el-button icon="el-icon-picture-outline" @click="createNew"
        >Create new</el-button
      >
      <el-button icon="el-icon-download" type="primary" @click="download"
        >Download
      </el-button>
    </div>
  </section>
</template>

<script>
import { computed, defineComponent, onMounted, onUnmounted } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "GifViewer",
  setup() {
    const store = useStore();
    const gifUrl = computed(() => store.state.editor.gifUrl);

    const download = () => store.dispatch("editor/downloadGif");
    const createNew = () => store.commit("editor/setActiveStep", 0);

    onUnmounted(() => gifUrl.value && URL.revokeObjectURL(gifUrl.value));

    return {
      gifUrl,
      download,
      createNew,
    };
  },
});
</script>

<style scoped>
.gif {
  width: 100%;
}
</style>
