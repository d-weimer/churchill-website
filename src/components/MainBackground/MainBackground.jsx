import "./MainBackground.css";

const VIDEO_SOURCES = [
  `${import.meta.env.BASE_URL}videos/writing-bg.mp4`,
  `${import.meta.env.BASE_URL}videos/voice-bg.mp4`,
  `${import.meta.env.BASE_URL}videos/film-bg.mp4`,
  `${import.meta.env.BASE_URL}videos/music-bg.mp4`,
  `${import.meta.env.BASE_URL}videos/gallery-bg.mp4`,
];

export default function MainBackground({ activeIndex }) {
  const currentVideoSrc = VIDEO_SOURCES[activeIndex] || VIDEO_SOURCES[0];

  return (
    <div className="main-background">
      <video
        key={currentVideoSrc}
        src={currentVideoSrc}
        className="main-background__video"
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="main-background__overlay" />
    </div>
  );
}
