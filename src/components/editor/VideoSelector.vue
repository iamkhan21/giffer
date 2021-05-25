<template>
  <h2>Upload video with the form below, that you going to use for gif</h2>
  <section>
    <el-upload
      :auto-upload="false"
      :on-change="selectVideo"
      :show-file-list="false"
      accept="video/*"
      class="upload-video"
      drag
    >
      <i class="el-icon-upload"></i>
      <p class="el-upload__text">
        Drag or, click and select a video for converting
      </p>
      <template v-slot:tip>
        <p class="el-upload__tip">Max video size is 2GB.</p>
      </template>
    </el-upload>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "vuex";
import { Message } from "element3";

export default defineComponent({
  name: "VideoSelector",
  setup() {
    const store = useStore();

    const selectVideo = ({ raw }: any) => {
      const isLt2M = raw.size / 1024 / 1024 / 1024 < 2;
      if (!isLt2M) {
        Message.error("Selected file is more than 2MB!");
      } else {
        store.dispatch("editor/selectVideo", raw);
      }
    };

    return { selectVideo };
  },
});
</script>

<style scoped>
.upload-video {
  margin: 60px auto;
}
</style>

<style lang="scss">
.upload-video {
  .el-upload-dragger {
    height: 35vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .el-upload,
  .el-upload-dragger {
    width: 100%;
  }
}
</style>
