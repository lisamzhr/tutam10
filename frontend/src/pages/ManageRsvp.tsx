import { useState } from "react";
import { useNavigate } from "react-router";
import { Mail, Users, MessageSquare, Trash2, CheckCircle } from "lucide-react";
import { getTamuByEmail, deleteRSVP, Tamu } from "../services/api";

export function ManageRsvp() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [guest, setGuest] = useState<Tamu | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [done, setDone] = useState(false);

  const handleLookup = async () => {
    if (!email.trim()) { setError("Masukkan email kamu"); return; }
    setLoading(true);
    setError("");
    setGuest(null);
    try {
      const data = await getTamuByEmail(email.trim());
      setGuest(data);
    } catch {
      setError("Email tidak ditemukan dalam daftar tamu.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async () => {
    if (!guest) return;
    setDeleting(true);
    try {
      await deleteRSVP(guest._id);
      setDone(true);
      setShowConfirm(false);
      setGuest(null);
    } catch {
      setError("Gagal membatalkan RSVP. Coba lagi.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white px-4 py-16">

      {/* Header */}
      <div className="max-w-xl mx-auto mb-14">
        <p className="text-zinc-600 text-[10px] tracking-[0.35em] uppercase mb-3">
          Kelola RSVP
        </p>
        <h1 className="text-5xl font-extralight tracking-tight">Manage RSVP</h1>
        <div className="mt-5 h-px bg-zinc-900" />
      </div>

      <div className="max-w-xl mx-auto">

        {/* Done state */}
        {done && (
          <div className="border border-zinc-800 p-8 text-center">
            <p className="text-zinc-400 text-sm font-light mb-2">RSVP berhasil dibatalkan.</p>
            <p className="text-zinc-700 text-xs mb-8">Kamu bisa daftar ulang kapan saja.</p>
            <button
              onClick={() => navigate("/rsvp")}
              className="border border-zinc-800 text-zinc-400 px-8 py-3 text-xs tracking-[0.25em] uppercase hover:border-white hover:text-white transition-all"
            >
              RSVP Lagi
            </button>
          </div>
        )}

        {/* Lookup form */}
        {!done && (
          <>
            {error && (
              <div className="border border-zinc-800 bg-zinc-950 text-zinc-500 px-4 py-3 text-xs tracking-wide mb-6">
                {error}
              </div>
            )}

            <div className="border border-zinc-800 p-5 focus-within:border-zinc-500 transition-colors">
              <label className="flex items-center gap-2 text-zinc-600 text-[10px] tracking-[0.3em] uppercase mb-3">
                <Mail className="w-3 h-3" /> Email yang didaftarkan
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(""); }}
                onKeyDown={(e) => e.key === "Enter" && handleLookup()}
                placeholder="nama@email.com"
                className="w-full bg-transparent text-white text-sm font-light placeholder:text-zinc-700 outline-none"
              />
            </div>

            <button
              onClick={handleLookup}
              disabled={loading}
              className="w-full border border-t-0 border-zinc-800 bg-white text-black py-4 text-xs tracking-[0.25em] uppercase font-medium hover:bg-zinc-200 disabled:opacity-40 transition-all"
            >
              {loading ? "Mencari..." : "Cari →"}
            </button>

            {/* Result */}
            {guest && (
              <div className="mt-8">
                <div className="border border-zinc-800 p-5">
                  <p className="text-zinc-600 text-[10px] tracking-[0.3em] uppercase mb-3 flex items-center gap-2">
                    <CheckCircle className="w-3 h-3" /> Ditemukan
                  </p>
                  <p className="text-white text-sm font-light">{guest.nama}</p>
                  <p className="text-zinc-600 text-xs mt-1">{guest.email}</p>
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

                <div className="flex gap-0 mt-6">
                  <button
                    onClick={() => { setGuest(null); setEmail(""); }}
                    className="flex-1 border border-zinc-800 text-zinc-500 py-4 text-xs tracking-[0.25em] uppercase hover:border-zinc-600 hover:text-white transition-all"
                  >
                    ← Kembali
                  </button>
                  <button
                    onClick={() => setShowConfirm(true)}
                    className="flex-1 border border-l-0 border-zinc-800 text-zinc-700 py-4 text-xs tracking-[0.25em] uppercase hover:border-zinc-600 hover:text-zinc-400 transition-all flex items-center justify-center gap-2"
                  >
                    <Trash2 className="w-3 h-3" /> Cancel RSVP
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        <p className="text-zinc-800 text-[10px] tracking-widest text-center uppercase mt-12">
          Khalisa · 15 May 2026
        </p>
      </div>

      {/* Confirm modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-zinc-950 border border-zinc-800 p-8 w-full max-w-sm">
            <p className="text-zinc-600 text-[10px] tracking-[0.35em] uppercase mb-4">Konfirmasi</p>
            <h3 className="text-white text-xl font-extralight mb-3">Batalkan kehadiran?</h3>
            <p className="text-zinc-600 text-xs font-light leading-relaxed mb-8">
              Data RSVP atas nama <span className="text-zinc-400">{guest?.nama}</span> akan dihapus permanen.
            </p>
            <div className="flex gap-0">
              <button
                onClick={() => setShowConfirm(false)}
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