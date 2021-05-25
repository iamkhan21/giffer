export default {
  setActiveStep(state: any, step: number) {
    state.activeStep = step;
  },
  setVideoFile(state: any, file: File) {
    state.videoFile = file;
  },
  setGifUrl(state: any, url: string) {
    state.gifUrl = url;
  },
};
