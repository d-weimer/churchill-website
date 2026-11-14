import { useEffect, useState, useRef } from "react";
import "./MainBackground.css";
import { settingsApi } from "../../data/settingsData";

function getYouTubeId(url) {
  if (!url) return null;
  const regExp =
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regExp);
  return match ? match[1] : null;
}

function getVimeoId(url) {
  if (!url) return null;
  const regExp =
    /(?:vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/[^\/]+\/videos\/|album\/[^\/]+\/video\/|video\/|manage\/videos\/)?|player\.vimeo\.com\/video\/)([0-9]+)/;
  const match = url.match(regExp);
  if (match && match[1]) return match[1];
  const fallback = url.match(/([0-9]{6,})/);
  return fallback ? fallback[1] : null;
}

// Sub-component to manage individual YouTube API players, force HD quality, and destroy captions
function YouTubeBackgroundPlayer({ youtubeId, isActive }) {
  const containerRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    if (!youtubeId || !containerRef.current) return;

    let isMounted = true;

    const initPlayer = () => {
      if (!isMounted || !containerRef.current) return;
      containerRef.current.innerHTML = "";
      const divId = `yt-player-${youtubeId}-${Math.random().toString(36).substring(7)}`;
      const div = document.createElement("div");
      div.id = divId;
      div.style.width = "100%";
      div.style.height = "100%";
      containerRef.current.appendChild(div);

      try {
        playerRef.current = new window.YT.Player(divId, {
          videoId: youtubeId,
          playerVars: {
            autoplay: 1,
            mute: 1,
            loop: 1,
            playlist: youtubeId,
            controls: 0,
            disablekb: 1,
            fs: 0,
            modestbranding: 1,
            rel: 0,
            iv_load_policy: 3,
            cc_load_policy: 0,
            playsinline: 1,
          },
          events: {
            onReady: (event) => {
              event.target.mute();
              event.target.setPlaybackQuality("hd1080");
              event.target.playVideo();
              // Forcefully unload the captions module to remove top/bottom subtitles
              try {
                if (typeof event.target.unloadModule === "function") {
                  event.target.unloadModule("captions");
                  event.target.unloadModule("cc");
                }
              } catch {}
            },
            onStateChange: (event) => {
              if (event.data === window.YT.PlayerState.ENDED) {
                event.target.playVideo();
              }
            },
          },
        });
      } catch {}
    };

    if (!window.YT || !window.YT.Player) {
      if (!document.getElementById("youtube-iframe-api")) {
        const tag = document.createElement("script");
        tag.id = "youtube-iframe-api";
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScript = document.getElementsByTagName("script")[0];
        firstScript.parentNode.insertBefore(tag, firstScript);
      }
      window.onYouTubeIframeAPIReady = initPlayer;
      const interval = setInterval(() => {
        if (window.YT && window.YT.Player) {
          clearInterval(interval);
          initPlayer();
        }
      }, 100);
      return () => {
        isMounted = false;
        clearInterval(interval);
      };
    } else {
      initPlayer();
    }

    return () => {
      isMounted = false;
      if (
        playerRef.current &&
        typeof playerRef.current.destroy === "function"
      ) {
        try {
          playerRef.current.destroy();
        } catch {}
      }
    };
  }, [youtubeId]);

  return (
    <div className="main-background__iframe-wrapper">
      <div ref={containerRef} className="main-background__youtube" />
      <div className="main-background__interaction-barrier" />
    </div>
  );
}

export default function MainBackground({ activeIndex }) {
  const [customVideos, setCustomVideos] = useState({});

  const loadVideos = () => {
    settingsApi.getSettings().then((data) => {
      setCustomVideos({
        0: data.writingVideoUrl,
        1: data.voiceVideoUrl,
        2: data.filmVideoUrl,
        3: data.musicVideoUrl,
        4: data.galleryVideoUrl,
      });
    });
  };

  useEffect(() => {
    loadVideos();
    window.addEventListener("storage", loadVideos);
    return () => window.removeEventListener("storage", loadVideos);
  }, []);

  return (
    <div className="main-background">
      {[0, 1, 2, 3, 4].map((index) => {
        const url = customVideos[index] || "";
        const youtubeId = getYouTubeId(url);
        const vimeoId = getVimeoId(url);
        const isActive = index === activeIndex;

        return (
          <div
            key={index}
            className={`main-background__layer ${isActive ? "is-active" : ""}`}
          >
            {youtubeId ? (
              <YouTubeBackgroundPlayer
                youtubeId={youtubeId}
                isActive={isActive}
              />
            ) : vimeoId ? (
              <div className="main-background__iframe-wrapper">
                <iframe
                  className="main-background__youtube"
                  src={`https://player.vimeo.com/video/${vimeoId}?autoplay=1&autopause=0&muted=1&loop=1&background=1&transparent=0`}
                  title={`Background ${index}`}
                  allow="autoplay; fullscreen; picture-in-picture"
                  tabIndex="-1"
                  frameBorder="0"
                />
                <div className="main-background__interaction-barrier" />
              </div>
            ) : url ? (
              <video
                className="main-background__video"
                src={url}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
              />
            ) : (
              <div className="main-background__fallback" />
            )}
          </div>
        );
      })}
      <div className="main-background__overlay" />
    </div>
  );
}
