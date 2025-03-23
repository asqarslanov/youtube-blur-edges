<script lang="ts">
  import browser from "webextension-polyfill";
</script>

<article class="flex size-full flex-col items-center p-4">
  <h1 class="font-bold">YouTube Blur Edges</h1>

  <button
    class="bg-ytcolor-idle hover:bg-ytcolor-hover active:bg-ytcolor-active cursor-pointer justify-self-end rounded-md px-3 py-1"
    onclick={() => {
      browser.tabs
        .query({ active: true, currentWindow: true })
        .then((tabs) => {
          return tabs[0].id || 0;
        })
        .then((tabId) => {
          browser.scripting.executeScript({
            func: () => {
              type Config = {
                blurSize: number;
              };

              function createBgVideo(
                mainVideo: HTMLVideoElement,
                config: Config,
              ): HTMLDivElement {
                const BACKGROUND_VIDEO_ID: string =
                  "youtube-blur-edges--background-video";

                const existing = document.getElementById(BACKGROUND_VIDEO_ID);
                if (existing !== null) {
                  return existing as HTMLDivElement;
                }

                let bgVideo = document.createElement("div");
                bgVideo.id = BACKGROUND_VIDEO_ID;

                bgVideo.style.width = "100lvw";
                bgVideo.style.height = "100lvh";
                bgVideo.style.left = "0";
                bgVideo.style.filter = `blur(${config.blurSize}px)`;
                bgVideo.style.backgroundImage = `-moz-element(#${mainVideo.id})`;
                bgVideo.style.backgroundSize = "cover";

                mainVideo.parentNode!.insertBefore(bgVideo, mainVideo);

                return bgVideo;
              }

              const MAIN_VIDEO_ID: string = "youtube-blur-edges--main-video";

              const mainVideo = document.querySelector<HTMLVideoElement>(
                "div#container > div.html5-video-player > div.html5-video-container > video.html5-main-video",
              )!;
              if (mainVideo.id.length === 0) {
                mainVideo.id = MAIN_VIDEO_ID;
              }

              const config: Config = {
                blurSize: 24,
              };

              createBgVideo(mainVideo, config);
            },
            target: { tabId },
          });
        });
    }}
  >
    Activate
  </button>
</article>
