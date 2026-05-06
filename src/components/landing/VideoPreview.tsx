import { useEffect, useRef, useState } from "react";
import previewImg from "@/assets/preview-section.png";

const VIDEO_SRC = "/assets/hermesworld/video/world-demo-720p.mp4";
const POSTER_SRC = "/assets/hermesworld/video/world-demo-poster.jpg";

export function VideoPreview() {
  const [showVideo, setShowVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (!showVideo) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowVideo(false);
    };
    window.addEventListener("keydown", onKey);
    // Try autoplay when modal opens (muted ensures it plays everywhere; user can unmute via controls)
    videoRef.current?.play().catch(() => undefined);
    return () => window.removeEventListener("keydown", onKey);
  }, [showVideo]);

  return (
    <>
      <section id="preview" className="relative w-full bg-[#0a0f1a]">
        <div className="relative w-full max-w-[1536px] mx-auto">
          <img
            src={previewImg}
            alt="See HermesWorld in action — Live systems, real agents, a world that reacts"
            className="w-full h-auto block"
            draggable={false}
          />

          {/* Play button overlay — centered on the video area in preview-section.png */}
          <button
            onClick={() => setShowVideo(true)}
            className="absolute cursor-pointer"
            style={{ top: "25%", left: "35%", width: "20%", height: "40%" }}
            aria-label="Play HermesWorld preview video"
          />

          {/* Watch Preview button overlay (lower-left badge in the section image) */}
          <button
            onClick={() => setShowVideo(true)}
            className="absolute cursor-pointer"
            style={{ top: "68%", left: "2.5%", width: "22%", height: "8%" }}
            aria-label="Watch HermesWorld preview video"
          />
        </div>
      </section>

      {/* Video lightbox modal */}
      {showVideo && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-6"
          onClick={() => setShowVideo(false)}
          role="dialog"
          aria-modal="true"
          aria-label="HermesWorld preview video"
        >
          <div
            className="relative w-full max-w-[1080px] aspect-video rounded-xl overflow-hidden border border-gold/30 shadow-[0_0_80px_rgba(241,197,109,0.18)] bg-black"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              ref={videoRef}
              src={VIDEO_SRC}
              poster={POSTER_SRC}
              className="w-full h-full object-cover"
              controls
              autoPlay
              muted
              playsInline
              preload="metadata"
            />
            <button
              onClick={() => setShowVideo(false)}
              className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/70 border border-gold/30 flex items-center justify-center text-parchment hover:bg-black/90 transition-colors text-lg"
              aria-label="Close video"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </>
  );
}
