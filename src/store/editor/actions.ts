import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import { nanoid } from "nanoid";
import { ElLoading } from "element3";

const ffmpeg = createFFmpeg();

export default {
  selectVideo({ commit }: any, file: File) {
    commit("setVideoFile", file);
    commit("setActiveStep", 1);
  },
  async convertVideoToGif(
    { state: { videoFile }, commit }: any,
    range: number[]
  ) {
    const loading = ElLoading.service({
      lock: true,
      target: document.querySelector("#app>main") as HTMLElement,
      text: "Converting...",
    });

    !ffmpeg.isLoaded() && (await ffmpeg.load());

    const fileName = `${nanoid()}.${videoFile?.type.split("/")[1]}`;
    const outputName = `${nanoid()}.gif`;
    const startFrom = range[0];
    const duration = range[1] - startFrom;

    // Write the file to memory
    ffmpeg.FS("writeFile", fileName, await fetchFile(videoFile));

    // Run the FFMpeg command
    await ffmpeg.run(
      "-i",
      fileName,
      "-t",
      duration.toString(),
      "-ss",
      startFrom.toString(),
      "-f",
      "gif",
      outputName
    );

    // Read the result
    const data = ffmpeg.FS("readFile", outputName);

    // Create a URL
    const gifUrl = URL.createObjectURL(
      new Blob([data.buffer], { type: "image/gif" })
    );

    commit("setGifUrl", gifUrl);
    commit("setActiveStep", 2);

    loading.close();
  },
  downloadGif({ state: { gifUrl } }: any) {
    const a = document.createElement("a");
    a.href = gifUrl;
    a.download = nanoid();
    document.body.appendChild(a);
    a.click();
    setTimeout(function () {
      document.body.removeChild(a);
    }, 0);
  },
};
