<template>
  <article>
    <section class="steps">
      <el-steps :active="activeStep" align-center finish-status="success">
        <el-step
          icon="el-icon-upload"
          title="Upload video"
          @click="navigateTo(0)"
        />
        <el-step
          icon="el-icon-scissors"
          title="Select fragment"
          @click="navigateTo(1)"
        />
        <el-step icon="el-icon-picture" title="Save gif" />
      </el-steps>
    </section>
    <component v-bind:is="activeComponent"></component>
  </article>
</template>

<script lang="ts">
import { computed, defineAsyncComponent, defineComponent } from "vue";
import VideoSelector from "@/components/editor/VideoSelector.vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "Editor",
  components: {
    VideoSelector,
    FragmentSelector: defineAsyncComponent(
      () => import("@/components/editor/FragmentSelector.vue")
    ),
    GifViewer: defineAsyncComponent(
      () => import("@/components/editor/GifViewer.vue")
    ),
  },
  setup() {
    const store = useStore();
    const activeStep = computed(() => store.state.editor.activeStep);

    const navigateTo = (step: number) => {
      if (activeStep.value > step) store.commit("editor/setActiveStep", step);
    };

    return {
      activeComponent: computed(
        () => store.getters["editor/activeStepComponent"]
      ),
      activeStep,
      navigateTo,
    };
  },
});
</script>

<style lang="scss">
.steps .el-step__title.is-success {
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
}

.btn-group {
  margin-top: 30px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 15px;
}

.btn-group > .el-button {
  width: 100%;

  & + .el-button {
    margin-left: 0;
  }
}
</style>

<style scoped>
.steps {
  margin-bottom: 40px;
}
</style>
