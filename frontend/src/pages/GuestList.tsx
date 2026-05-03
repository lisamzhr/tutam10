import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Users, MessageSquare, ArrowRight } from "lucide-react";
import { getGuestList, Tamu } from "../services/api";

const AVATAR_IMAGES = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&q=80",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&q=80",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&q=80",
  "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&q=80",
  "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&q=80",
];

function getInitials(name: string) {
  return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function GuestList() {
  const navigate = useNavigate();
  const [guests, setGuests] = useState<Tamu[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getGuestList()
      .then((data) => setGuests(data.filter((g) => g.status_kehadiran === "hadir")))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const totalPeople = guests.reduce((sum, g) => sum + g.jumlah_tamu, 0);

  return (
    <div className="min-h-screen bg-black text-white px-4 py-16">

      {/* Header */}
      <div className="max-w-4xl mx-auto mb-16">
        <p className="text-zinc-600 text-[10px] tracking-[0.35em] uppercase mb-3">
          Khalisa · 15 May 2026
        </p>
        <div className="flex items-end justify-between">
          <h1 className="text-5xl font-extralight tracking-tight">Guest List</h1>
          <div className="text-right">
            <p className="text-3xl font-extralight tabular-nums">{guests.length}</p>
            <p className="text-zinc-600 text-[10px] tracking-[0.2em] uppercase mt-1">
              Confirmed · {totalPeople} people
            </p>
          </div>
        </div>
        <div className="mt-5 h-px bg-zinc-900" />
      </div>

      {/* Hero strip — stacked portraits */}
      <div className="max-w-4xl mx-auto mb-16 overflow-hidden">
        <div className="grid grid-cols-3 h-48">
          {[
            "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80",
            "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800&q=80",
            "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=800&q=80",
          ].map((src, i) => (
            <div key={i} className="overflow-hidden">
              <img
                src={src}
                alt=""
                className="w-full h-full object-cover opacity-40 hover:opacity-60 transition-opacity duration-500 scale-105 hover:scale-100"
              />
            </div>
          ))}
        </div>
        <div className="h-px bg-zinc-900" />
      </div>

      <div className="max-w-4xl mx-auto">

        {/* Loading */}
        {loading && (
          <div className="text-center py-24">
            <p className="text-zinc-700 text-xs tracking-[0.3em] uppercase animate-pulse">
              Loading...
            </p>
          </div>
        )}

        {/* Empty state */}
        {!loading && guests.length === 0 && (
          <div className="border border-zinc-900 py-20 text-center">
            <Users className="w-6 h-6 text-zinc-800 mx-auto mb-6" />
            <p className="text-zinc-600 text-xs tracking-[0.3em] uppercase mb-2">
              No guests yet
            </p>
            <p className="text-zinc-800 text-xs mb-10">
              Be the first to confirm your attendance
            </p>
            <button
              onClick={() => navigate("/rsvp")}
              className="border border-zinc-800 text-zinc-400 px-8 py-3 text-xs tracking-[0.25em] uppercase hover:border-white hover:text-white transition-all"
            >
              RSVP Now
            </button>
          </div>
        )}

        {/* Guest table */}
        {!loading && guests.length > 0 && (
          <>
            {/* Column headers */}
            <div className="grid grid-cols-12 gap-4 px-5 mb-3">
              <p className="col-span-1 text-zinc-700 text-[10px] tracking-[0.25em] uppercase">#</p>
              <p className="col-span-4 text-zinc-700 text-[10px] tracking-[0.25em] uppercase">Name</p>
              <p className="col-span-2 text-zinc-700 text-[10px] tracking-[0.25em] uppercase text-center">Guests</p>
              <p className="col-span-3 text-zinc-700 text-[10px] tracking-[0.25em] uppercase">Date</p>
              <p className="col-span-2 text-zinc-700 text-[10px] tracking-[0.25em] uppercase">Note</p>
            </div>
            <div className="h-px bg-zinc-900 mb-0" />

            {guests.map((guest, i) => (
              <div
                key={guest._id}
                className="grid grid-cols-12 gap-4 items-start px-5 py-5 border-b border-zinc-900 hover:bg-zinc-950 transition-colors"
              >
                {/* Index */}
                <p className="col-span-1 text-zinc-700 text-xs tabular-nums font-light pt-0.5">
                  {String(i + 1).padStart(2, "0")}
                </p>
                        
                {/* Name + Message */}
                <div className="col-span-5">
                  <p className="text-white text-sm font-light">{guest.nama}</p>
                  {guest.ucapan && (
                    <p className="text-zinc-600 text-xs font-light mt-1 leading-relaxed">
                      "{guest.ucapan}"
                    </p>
                  )}
                </div>
              
                {/* Guest count */}
                <div className="col-span-2 flex justify-center pt-0.5">
                  <div className="border border-zinc-800 text-zinc-400 text-xs px-2.5 py-1 tabular-nums">
                    {guest.jumlah_tamu}
                  </div>
                </div>
              
                {/* Date */}
                <p className="col-span-4 text-zinc-600 text-xs font-light pt-0.5">
                  {formatDate(guest.createdAt)}
                </p>
              </div>
            ))}

            {/* Footer row */}
            <div className="flex items-center justify-between px-5 pt-5 mt-2">
              <p className="text-zinc-700 text-[10px] tracking-[0.2em] uppercase">
                {guests.length} confirmed · {totalPeople} total people
              </p>
              <button
                onClick={() => navigate("/rsvp")}
                className="flex items-center gap-2 text-zinc-600 text-[10px] tracking-[0.2em] uppercase hover:text-white transition-colors"
              >
                Add your RSVP <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}