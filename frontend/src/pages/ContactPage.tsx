import { useNavigate } from "react-router";
import { MapPin, Phone, MessageCircle, Navigation } from "lucide-react";

export function ContactPage() {
  const navigate = useNavigate();

  const phoneNumber = "+6285947600020";
  const whatsappMessage = "Halo, saya ingin bertanya tentang acara ulang tahun";
  const locationName = "Grand Ballroom, Sunset Hotel";
  const locationAddress = "Jl. Merdeka No. 123, Jakarta Pusat, DKI Jakarta 10110";
  const mapsUrl = "https://maps.app.goo.gl/yptHQRgUFFpCdiMm8";

  const handleWhatsApp = () => {
    const url = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(url, "_blank");
  };

  const handleMaps = () => window.open(mapsUrl, "_blank");
  const handleCall = () => { window.location.href = `tel:${phoneNumber}`; };

  return (
    <div className="min-h-screen bg-black text-white px-4 py-16">

      {/* Header */}
      <div className="max-w-xl mx-auto mb-14">
        <p className="text-zinc-600 text-[10px] tracking-[0.35em] uppercase mb-3">
          Informasi
        </p>
        <h1 className="text-5xl font-extralight tracking-tight">Contact</h1>
        <div className="mt-5 h-px bg-zinc-900" />
      </div>

      <div className="max-w-xl mx-auto space-y-0">

        {/* Location block */}
        <div className="border border-zinc-800">
          {/* Map image */}
          <div className="relative h-48 overflow-hidden border-b border-zinc-800">
            <img
              src="https://images.unsplash.com/photo-1526779259212-939e64788e3c?w=800&q=80"
              alt="map"
              className="w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <Navigation className="w-5 h-5 text-zinc-400" />
            </div>
          </div>

          {/* Location info */}
          <div className="p-5">
            <p className="text-zinc-600 text-[10px] tracking-[0.3em] uppercase mb-3 flex items-center gap-2">
              <MapPin className="w-3 h-3" /> Venue
            </p>
            <p className="text-white text-sm font-light">{locationName}</p>
            <p className="text-zinc-600 text-xs font-light mt-1 leading-relaxed">{locationAddress}</p>
          </div>

          {/* Maps button */}
          <button
            onClick={handleMaps}
            className="w-full border-t border-zinc-800 py-4 text-xs tracking-[0.25em] uppercase text-zinc-400 hover:text-white hover:bg-zinc-950 transition-all flex items-center justify-center gap-2"
          >
            <Navigation className="w-3 h-3" />
            Open in Google Maps
          </button>
        </div>

        {/* WhatsApp */}
        <button
          onClick={handleWhatsApp}
          className="w-full border border-t-0 border-zinc-800 p-5 flex items-center justify-between hover:bg-zinc-950 transition-all group"
        >
          <div className="flex items-center gap-4">
            <MessageCircle className="w-4 h-4 text-zinc-600 group-hover:text-white transition-colors" />
            <div className="text-left">
              <p className="text-zinc-600 text-[10px] tracking-[0.3em] uppercase mb-1">WhatsApp</p>
              <p className="text-white text-sm font-light">{phoneNumber}</p>
            </div>
          </div>
          <span className="text-zinc-700 text-xs tracking-widest group-hover:text-zinc-400 transition-colors">→</span>
        </button>

        {/* Phone */}
        <button
          onClick={handleCall}
          className="w-full border border-t-0 border-zinc-800 p-5 flex items-center justify-between hover:bg-zinc-950 transition-all group"
        >
          <div className="flex items-center gap-4">
            <Phone className="w-4 h-4 text-zinc-600 group-hover:text-white transition-colors" />
            <div className="text-left">
              <p className="text-zinc-600 text-[10px] tracking-[0.3em] uppercase mb-1">Phone</p>
              <p className="text-white text-sm font-light">{phoneNumber}</p>
            </div>
          </div>
          <span className="text-zinc-700 text-xs tracking-widest group-hover:text-zinc-400 transition-colors">→</span>
        </button>

        {/* Note */}
        <div className="border border-t-0 border-zinc-900 px-5 py-4">
          <p className="text-zinc-700 text-xs font-light leading-relaxed">
            Having trouble finding the venue? Don't hesitate to reach out - we're happy to help.
          </p>
        </div>

        {/* Footer */}
        <p className="text-zinc-800 text-[10px] tracking-widest text-center uppercase pt-8">
          Khalisa · 15 May 2026
        </p>
      </div>
    </div>
  );
}