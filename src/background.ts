import browser from "webextension-polyfill";

browser.action.onClicked.addListener((tab) => {
  browser.scripting.executeScript({
    func: () => {
      type Config = {
        blurSize: number;
      };

      function getBgVideo(mainVideo: HTMLVideoElement): HTMLDivElement {
        const BACKGROUND_VIDEO_ID: string =
          "youtube-blur-edges--background-video";

        const existing = document.getElementById(BACKGROUND_VIDEO_ID);
        if (existing !== null) {
          return existing as HTMLDivElement;
        }

        let bgVideo = document.createElement("div");
        bgVideo.id = BACKGROUND_VIDEO_ID;
        mainVideo.parentNode!.insertBefore(bgVideo, mainVideo);

        return bgVideo;
      }

      const MAIN_VIDEO_ID: string = "youtube-blur-edges--main-video";

      function onChange(mainVideo: HTMLVideoElement, config: Config): void {
        const bgVideo = getBgVideo(mainVideo);
        bgVideo.style.left = "0";
        bgVideo.style.width = "100%";
        bgVideo.style.height = mainVideo.style.height;
      }

      function findMainVideo(): HTMLVideoElement | null {
        return document.querySelector(
          "div#container > div.html5-video-player > div.html5-video-container > video.html5-main-video",
        );
      }

      const mainVideo = findMainVideo()!;
      mainVideo.id = MAIN_VIDEO_ID;
      const config: Config = {
        blurSize: 16,
      };

      let bgVideo = getBgVideo(mainVideo);

      bgVideo.style.filter = `blur(${config.blurSize}px)`;
      bgVideo.style.backgroundImage = `-moz-element(#${MAIN_VIDEO_ID})`;
      bgVideo.style.backgroundSize = "cover";

      const observer = new MutationObserver((_mutationList, _observer) => {
        onChange(mainVideo, config);
      });

      onChange(mainVideo, config);
      observer.observe(mainVideo, { attributes: true });
    },
    target: {
      tabId: tab.id || 0,
    },
  });
});
