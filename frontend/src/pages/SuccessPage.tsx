import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { CheckCircle, Users, MessageSquare, Trash2 } from "lucide-react";
import { getTamu, deleteRSVP, Tamu } from "../services/api";
import { rsvpStore } from "../store/rsvpStore";
import confetti from "canvas-confetti";

export function SuccessPage() {
  const navigate = useNavigate();
  const [guest, setGuest] = useState<Tamu | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const id = rsvpStore.getLastId();
    if (!id) { navigate("/"); return; }

    getTamu(id)
      .then(setGuest)
      .catch(() => navigate("/"));

    confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
  }, [navigate]);

  const handleCancel = async () => {
    if (!guest) return;
    setDeleting(true);
    try {
      await deleteRSVP(guest._id);
      rsvpStore.clear();
      navigate("/");
    } catch {
      alert("Gagal membatalkan RSVP. Coba lagi.");
    } finally {
      setDeleting(false);
    }
  };

  if (!guest) return null;

  return (
    <div className="min-h-screen bg-black text-white px-4 py-16">

      {/* Header */}
      <div className="max-w-xl mx-auto mb-14">
        <p className="text-zinc-600 text-[10px] tracking-[0.35em] uppercase mb-3">
          Konfirmasi
        </p>
        <div className="flex items-end gap-4">
          <h1 className="text-5xl font-extralight tracking-tight">You're in.</h1>
          <CheckCircle className="w-5 h-5 text-zinc-500 mb-2" />
        </div>
        <div className="mt-5 h-px bg-zinc-900" />
      </div>

      <div className="max-w-xl mx-auto">

        {/* Detail rows */}
        <div>
          <div className="border border-zinc-800 p-5">
            <p className="text-zinc-600 text-[10px] tracking-[0.3em] uppercase mb-2 flex items-center gap-2">
              <Users className="w-3 h-3" /> Nama
            </p>
            <p className="text-white text-sm font-light">{guest.nama}</p>
          </div>

          <div className="border border-t-0 border-zinc-800 p-5">
            <p className="text-zinc-600 text-[10px] tracking-[0.3em] uppercase mb-2">
              Email
            </p>
            <p className="text-white text-sm font-light">{guest.email}</p>
          </div>

          <div className="border border-t-0 border-zinc-800 p-5">
            <p className="text-zinc-600 text-[10px] tracking-[0.3em] uppercase mb-2 flex items-center gap-2">
              <Users className="w-3 h-3" /> Jumlah Tamu
            </p>
            <p className="text-white text-sm font-light">{guest.jumlah_tamu} orang</p>
          </div>

          {guest.ucapan && (
            <div className="border border-t-0 border-zinc-800 p-5">
              <p className="text-zinc-600 text-[10px] tracking-[0.3em] uppercase mb-2 flex items-center gap-2">
                <MessageSquare className="w-3 h-3" /> Ucapan
              </p>
              <p className="text-zinc-400 text-sm font-light leading-relaxed">
                "{guest.ucapan}"
              </p>
            </div>
          )}

          <div className="border border-t-0 border-zinc-900 px-5 py-4">
            <p className="text-zinc-700 text-xs font-light leading-relaxed">
              We're glad you can make it. See you on 12 September 2026.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-0 mt-6">
          <button
            onClick={() => navigate("/")}
            className="flex-1 border border-zinc-800 text-zinc-400 py-4 text-xs tracking-[0.25em] uppercase hover:border-zinc-600 hover:text-white transition-all"
          >
            ← Home
          </button>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="flex-1 border border-l-0 border-zinc-800 text-zinc-700 py-4 text-xs tracking-[0.25em] uppercase hover:border-zinc-600 hover:text-zinc-400 transition-all flex items-center justify-center gap-2"
          >
            <Trash2 className="w-3 h-3" /> Cancel RSVP
          </button>
        </div>

        <p className="text-zinc-800 text-[10px] tracking-widest text-center uppercase mt-10">
          Khalisa · 12 September 2026
        </p>
      </div>

      {/* Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-zinc-950 border border-zinc-800 p-8 w-full max-w-sm">
            <p className="text-zinc-600 text-[10px] tracking-[0.35em] uppercase mb-4">
              Konfirmasi
            </p>
            <h3 className="text-white text-xl font-extralight mb-3">
              Batalkan kehadiran?
            </h3>
            <p className="text-zinc-600 text-xs font-light leading-relaxed mb-8">
              Data RSVP kamu akan dihapus dari daftar tamu dan tidak bisa dikembalikan.
            </p>
            <div className="flex gap-0">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 border border-zinc-800 text-zinc-500 py-3 text-xs tracking-[0.2em] uppercase hover:text-white hover:border-zinc-600 transition-all"
              >
                Batal
              </button>
              <button
                onClick={handleCancel}
                disabled={deleting}
                className="flex-1 border border-l-0 border-zinc-800 bg-white text-black py-3 text-xs tracking-[0.2em] uppercase hover:bg-zinc-200 disabled:opacity-40 transition-all"
              >
                {deleting ? "..." : "Ya, Batalkan"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}