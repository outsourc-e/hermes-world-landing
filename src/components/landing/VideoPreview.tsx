import { useState } from "react";
import previewImg from "@/assets/preview-section.png";

const VIDEO_URL = "https://www.youtube.com/embed/dQw4w9WgXcQ";

export function VideoPreview() {
  const [showVideo, setShowVideo] = useState(false);

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

          {/* Play button overlay — centered on the video area */}
          <button
            onClick={() => setShowVideo(true)}
            className="absolute cursor-pointer"
            style={{ top: "25%", left: "35%", width: "20%", height: "40%" }}
            aria-label="Play preview video"
          />

          {/* Watch Preview button overlay */}
          <button
            onClick={() => setShowVideo(true)}
            className="absolute cursor-pointer"
            style={{ top: "68%", left: "2.5%", width: "22%", height: "8%" }}
            aria-label="Watch Preview"
          />
        </div>
      </section>

      {/* Video lightbox modal */}
      {showVideo && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-6"
          onClick={() => setShowVideo(false)}
        >
          <div
            className="relative w-full max-w-[960px] aspect-video rounded-xl overflow-hidden border border-gold/30 shadow-[0_0_80px_rgba(241,197,109,0.15)]"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={`${VIDEO_URL}?autoplay=1&rel=0`}
              title="HermesWorld Preview"
              className="w-full h-full"
              allow="autoplay; encrypted-media; fullscreen"
              allowFullScreen
            />
            <button
              onClick={() => setShowVideo(false)}
              className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/60 border border-gold/30 flex items-center justify-center text-parchment hover:bg-black/80 transition-colors text-lg"
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
