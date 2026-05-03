import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, MapPin, Clock } from "lucide-react";

  const birthdayDate = new Date("2026-09-12T18:00:00");

export function LandingPage() {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState({
    days: 0, hours: 0, minutes: 0, seconds: 0,
  });
  useEffect(() => {
    const calculate = () => {
      const diff = birthdayDate.getTime() - new Date().getTime();
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      }
    };
    calculate();
    const timer = setInterval(calculate, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-black">

      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1920&q=80"
          alt="hero"
          className="absolute inset-0 w-full h-full object-cover opacity-50 scale-110 animate-[slowZoom_20s_linear_infinite]"
        />
        <div className="absolute inset-0 bg-black/70" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent,black_80%)]" />

        <div className="relative z-10 text-center px-4">
          <p className="text-zinc-400 text-xs tracking-[0.4em] uppercase mb-6 animate-fadeUp">
            You are invited
          </p>
          <h1 className="text-6xl md:text-8xl font-light text-white mb-4 tracking-tight animate-fadeUp delay-100">
            Happy Birthday
          </h1>
          <p className="text-3xl md:text-4xl text-zinc-300 mb-2 animate-fadeUp delay-200">
            Khalisa
          </p>
          <p className="text-zinc-500 text-sm mt-4 animate-fadeUp delay-300">
            Celebrate the moment together
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12 animate-fadeUp delay-500">
            <button
              onClick={() => navigate("/rsvp")}
              className="bg-white text-black px-8 py-3 text-sm font-medium hover:bg-zinc-200 transition-all"
            >
              RSVP Now
            </button>
            <button
              onClick={() => navigate("/guests")}
              className="border border-white/20 text-white px-8 py-3 text-sm hover:bg-white/10 transition-all"
            >
              Guest List
            </button>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-600 text-xs">
          <span>Scroll</span>
          <div className="w-px h-8 bg-zinc-600 animate-pulse" />
        </div>

        <style>{`
          @keyframes slowZoom {
            0% { transform: scale(1.1); }
            100% { transform: scale(1.2); }
          }
          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeUp { animation: fadeUp 1s ease forwards; }
          .delay-100 { animation-delay: 0.1s; }
          .delay-200 { animation-delay: 0.2s; }
          .delay-300 { animation-delay: 0.3s; }
          .delay-500 { animation-delay: 0.5s; }
        `}</style>
      </div>

      {/* Event Details + Countdown */}
      <div className="px-6 py-24 max-w-4xl mx-auto">
        <div className="grid md:grid-cols-3 gap-10 mb-24 text-center">
          {[
            { icon: Calendar, label: "Date", value: "12 September 2026", sub: "Friday" },
            { icon: Clock, label: "Time", value: "18:00 WIB", sub: "Until late" },
            { icon: MapPin, label: "Location", value: "Grand Ballroom", sub: "Sunset Hotel, Jakarta" },
          ].map(({ icon: Icon, label, value, sub }) => (
            <div key={label} className="group">
              <Icon className="w-5 h-5 text-zinc-400 mx-auto mb-4 group-hover:text-white transition-colors" />
              <p className="text-zinc-500 text-xs tracking-widest mb-2">{label}</p>
              <p className="text-white text-lg">{value}</p>
              <p className="text-zinc-600 text-sm mt-1">{sub}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-4 gap-6 max-w-lg mx-auto">
          {[
            { value: timeLeft.days, label: "Hari" },
            { value: timeLeft.hours, label: "Jam" },
            { value: timeLeft.minutes, label: "Menit" },
            { value: timeLeft.seconds, label: "Detik" },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <p className="text-4xl font-light text-white">
                {String(value).padStart(2, "0")}
              </p>
              <p className="text-zinc-600 text-xs mt-1 tracking-wide">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Photo Strip */}
      <div className="grid grid-cols-3 gap-2 px-4 max-w-4xl mx-auto mb-24">
        {[
          "https://images.unsplash.com/photo-1531058020387-3be344556be6?w=600&q=80",
          "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=600&q=80",
          "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=600&q=80",
        ].map((src, i) => (
          <div key={i} className="aspect-square rounded-2xl overflow-hidden">
            <img
              src={src}
              alt=""  // ← tambah ini
              className="w-full h-full object-cover scale-110 hover:scale-100 transition-transform duration-700"
            />
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="text-center pb-24 px-4">
        <p className="text-zinc-500 text-sm mb-6">Ready to join?</p>
        <button
          onClick={() => navigate("/rsvp")}
          className="bg-zinc-500 hover:bg-zinc-400 text-white px-10 py-3 rounded-full text-sm font-medium transition-all"
        >
          Konfirmasi Kehadiran
        </button>
      </div>

    </div>
  );
}