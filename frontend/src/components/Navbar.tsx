import { useNavigate, useLocation } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { useState } from "react";

const navItems = [
  { label: "Home", path: "/" },
  { label: "RSVP", path: "/rsvp" },
  { label: "Guests", path: "/guests" },
  { label: "Contact", path: "/contact" },
];

export function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [particles, setParticles] = useState<
    { x: number; y: number; id: number }[]
  >([]);

  const handleMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newParticles = Array.from({ length: 6 }).map((_, i) => ({
      x: x + (Math.random() - 0.5) * 12,
      y: y + (Math.random() - 0.5) * 12,
      id: Date.now() + i,
    }));

    setParticles((prev) => [...prev, ...newParticles]);

    // remove after fade
    setTimeout(() => {
      setParticles((prev) => prev.slice(newParticles.length));
    }, 400);
  };

  return (
    <nav
      onMouseMove={handleMove}
      className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-white/10 overflow-hidden"
    >
      {/* ✨ glitter particles */}
      {particles.map((p) => (
        <span
          key={p.id}
          className="pointer-events-none absolute w-[2px] h-[2px] bg-white rounded-full animate-fade"
          style={{
            left: p.x,
            top: p.y,
          }}
        />
      ))}

      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-white hover:text-zinc-300 transition-colors"
        >
          <Sparkles className="w-5 h-5 text-zinc-300" />
          <span className="font-medium tracking-wide text-sm">
            Birthday Event
          </span>
        </button>

        {/* Navigation */}
        <div className="flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className="relative text-sm text-zinc-500 hover:text-white transition-colors"
              >
                {item.label}

                <span
                  className={`absolute left-0 -bottom-1 h-[1.5px] w-full transition-all duration-300 ${
                    isActive
                      ? "bg-zinc-300 opacity-100"
                      : "bg-zinc-300 opacity-0"
                  }`}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* animation */}
      <style>
        {`
          @keyframes fade {
            0% {
              opacity: 1;
              transform: scale(1);
            }
            100% {
              opacity: 0;
              transform: scale(0.5) translateY(4px);
            }
          }

          .animate-fade {
            animation: fade 0.4s ease-out forwards;
          }
        `}
      </style>
    </nav>
  );
}