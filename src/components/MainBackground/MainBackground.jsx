import { useEffect, useRef } from "react";

import "./MainBackground.css";

const VIDEO_SOURCES = [
  "/videos/writing-bg.mp4",
  "/videos/voice-bg.mp4",
  "/videos/film-bg.mp4",
  "/videos/music-bg.mp4",
  "/videos/gallery-bg.mp4",
];

export default function MainBackground({ activeIndex }) {
  const videoRef = useRef(null);
  const currentVideoSrc = VIDEO_SOURCES[activeIndex] || VIDEO_SOURCES[0];

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
    }
  }, [activeIndex]);

  return (
    <div className="main-background">
      <video
        ref={videoRef}
        key={currentVideoSrc}
        className="main-background__video"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={currentVideoSrc} type="video/mp4" />
      </video>
      <div className="main-background__overlay" />
    </div>
  );
}
