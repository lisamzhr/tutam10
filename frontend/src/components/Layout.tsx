import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

export function Layout({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [muted, setMuted] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const play = () => {
      audioRef.current?.play().then(() => setPlaying(true)).catch(() => {});
    };
    document.addEventListener("click", play, { once: true });
    return () => document.removeEventListener("click", play);
  }, []);

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !muted;
    setMuted(!muted);
  };

  return (
    <div className="relative min-h-screen bg-zinc-950 text-white">
      {/* Audio */}
      <audio
        ref={audioRef}
        loop
        src="/starostin-classical-emotional-piano-music-368073.mp3"
      />

      {/* Tombol mute pojok kanan bawah */}
      {playing && (
        <button
          onClick={toggleMute}
          className="fixed bottom-6 right-6 z-50 bg-zinc-900/80 backdrop-blur-md border border-zinc-800 p-3 rounded-full hover:border-pink-600 transition-all group"
          title={muted ? "Nyalakan musik" : "Matikan musik"}
        >
          {muted
            ? <VolumeX className="w-4 h-4 text-zinc-500 group-hover:text-pink-400 transition-colors" />
            : <Volume2 className="w-4 h-4 text-pink-400 animate-pulse" />
          }
        </button>
      )}

      {/* Background image */}
      <div
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-[0.15]"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1920&q=80')`,
        }}
      />
      {/* Gradient overlay */}
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-zinc-950/90 via-zinc-950/70 to-zinc-950/95" />
      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}