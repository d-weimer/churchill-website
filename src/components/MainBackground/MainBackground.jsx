import { useEffect, useRef, useState } from "react";
import "./MainBackground.css";

const VIDEO_SOURCES = [
  `${import.meta.env.BASE_URL}videos/writing-bg.mp4`,
  `${import.meta.env.BASE_URL}videos/voice-bg.mp4`,
  `${import.meta.env.BASE_URL}videos/film-bg.mp4`,
  `${import.meta.env.BASE_URL}videos/music-bg.mp4`,
  `${import.meta.env.BASE_URL}videos/gallery-bg.mp4`,
];

export default function MainBackground({ activeIndex }) {
  const videoRef = useRef(null);
  const [displayedIndex, setDisplayedIndex] = useState(activeIndex);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayedIndex(activeIndex);
    }, 150);

    return () => clearTimeout(timer);
  }, [activeIndex]);

  const currentVideoSrc = VIDEO_SOURCES[displayedIndex] || VIDEO_SOURCES[0];

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    let isCancelled = false;

    const playVideo = async () => {
      try {
        if (!videoElement.src.endsWith(currentVideoSrc)) {
          videoElement.src = currentVideoSrc;
          videoElement.load();
        }

        if (!isCancelled) {
          const playPromise = videoElement.play();
          if (playPromise !== undefined) {
            await playPromise.catch(() => {
              // Suppress abort errors from rapid skipping
            });
          }
        }
      } catch (err) {
        // Suppress loading errors
      }
    };

    playVideo();

    return () => {
      isCancelled = true;
    };
  }, [currentVideoSrc]);

  return (
    <div className="main-background">
      <video
        ref={videoRef}
        className="main-background__video"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      />
      <div className="main-background__overlay" />
    </div>
  );
}
