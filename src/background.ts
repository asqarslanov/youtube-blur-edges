import browser from "webextension-polyfill";

browser.action.onClicked.addListener((tab) => {
  browser.scripting.executeScript({
    func: () => {
      type Config = {
        blurSize: number;
      };

      function createBackgroundBlur(
        video: HTMLVideoElement,
        config: Config,
      ): void {
        // const BACKGROUND_VIDEO_ID: string =
        //   "youtube-blur-edges--background-video";

        // const old = document.getElementById(BACKGROUND_VIDEO_ID);
        // if (old !== null) {
        //   old.remove();
        // }

        const backgroundVideo = video;
        // const backgroundVideo = video.cloneNode() as HTMLVideoElement;
        // backgroundVideo.id = BACKGROUND_VIDEO_ID;

        backgroundVideo.style.filter = `blur(${config.blurSize}px)`;
        backgroundVideo.style.left = "0";
        backgroundVideo.style.width = "100%";

        // video.parentNode!.appendChild(backgroundVideo);
      }

      function findVideo(): HTMLVideoElement | null {
        return document.querySelector(
          "div#container > div.html5-video-player > div.html5-video-container > video.html5-main-video",
        );
      }

      const mainVideo = findVideo()!;
      const config: Config = {
        blurSize: 16,
      };

      createBackgroundBlur(mainVideo, config);

      const observer = new MutationObserver((_mutationList, _observer) => {
        createBackgroundBlur(mainVideo, config);
      });
      observer.observe(mainVideo, { attributes: true });
    },
    target: {
      tabId: tab.id || 0,
    },
  });
});
