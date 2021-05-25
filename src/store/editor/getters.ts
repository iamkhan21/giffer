const tabs: Record<number, string> = {
  0: "VideoSelector",
  1: "FragmentSelector",
  2: "GifViewer",
};

export default {
  activeStepComponent(state: any): string {
    return tabs[state.activeStep];
  },
  videoUrl({ videoFile }: any) {
    return videoFile && URL.createObjectURL(videoFile);
  },
  gifUrl({ gifFile }: any) {
    return gifFile && URL.createObjectURL(gifFile);
  },
};
