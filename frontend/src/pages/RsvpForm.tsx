import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, Users, MessageSquare, CheckCircle, Trash2 } from "lucide-react";
import { submitRSVP, getTamuByEmail, deleteRSVP, Tamu } from "../services/api";
import { rsvpStore } from "../store/rsvpStore";

export function RsvpForm() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<"new" | "manage">("new");

  // — NEW RSVP STATE —
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    jumlah_tamu: 1,
    status_kehadiran: "hadir" as "hadir" | "tidak_hadir",
    ucapan: "",
  });

  // — MANAGE STATE —
  const [manageEmail, setManageEmail] = useState("");
  const [manageLoading, setManageLoading] = useState(false);
  const [manageError, setManageError] = useState("");
  const [foundGuest, setFoundGuest] = useState<Tamu | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [cancelDone, setCancelDone] = useState(false);

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError("");
  };

  const validateStep1 = () => {
    if (!formData.nama.trim()) return "Nama wajib diisi";
    if (!formData.email.trim()) return "Email wajib diisi";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      return "Format email tidak valid";
    return "";
  };

  const handleNext = () => {
    const err = validateStep1();
    if (err) { setError(err); return; }
    setStep(2);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await submitRSVP(formData);
      rsvpStore.setLastId(res.data._id);
      if (formData.status_kehadiran === "hadir") {
        navigate("/success");
      } else {
        navigate("/");
      }
    } catch (err: any) {
      setError(err.response?.data?.pesan || "Gagal mengirim RSVP. Coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  const handleLookup = async () => {
    if (!manageEmail.trim()) { setManageError("Masukkan email kamu"); return; }
    setManageLoading(true);
    setManageError("");
    setFoundGuest(null);
    try {
      const data = await getTamuByEmail(manageEmail.trim());
      setFoundGuest(data);
    } catch {
      setManageError("Email tidak ditemukan dalam daftar tamu.");
    } finally {
      setManageLoading(false);
    }
  };

  const handleCancel = async () => {
    if (!foundGuest) return;
    setDeleting(true);
    try {
      await deleteRSVP(foundGuest._id);
      setFoundGuest(null);
      setManageEmail("");
      setCancelDone(true);
      setShowConfirm(false);
    } catch {
      setManageError("Gagal membatalkan RSVP. Coba lagi.");
    } finally {
      setDeleting(false);
    }
  };

  const switchTab = (t: "new" | "manage") => {
    setTab(t);
    setError("");
    setManageError("");
    setFoundGuest(null);
    setCancelDone(false);
    setStep(1);
  };

  return (
    <div className="min-h-screen bg-black text-white px-4 py-16">

      {/* Header */}
      <div className="max-w-xl mx-auto mb-14">
        <p className="text-zinc-600 text-[10px] tracking-[0.35em] uppercase mb-3">
          Khalisa · 15 May 2026
        </p>
        <h1 className="text-5xl font-extralight tracking-tight">RSVP</h1>
        <div className="mt-5 h-px bg-zinc-900" />
      </div>

      <div className="max-w-xl mx-auto">

        {/* Tab switcher */}
        <div className="flex gap-0 mb-10">
          {(["new", "manage"] as const).map((t) => (
            <button
              key={t}
              onClick={() => switchTab(t)}
              className={`flex-1 py-3 text-xs tracking-[0.25em] uppercase border transition-all ${
                tab === t
                  ? "bg-white text-black border-white"
                  : "bg-transparent text-zinc-600 border-zinc-800 hover:border-zinc-600 hover:text-zinc-400"
              } ${t === "manage" ? "border-l-0" : ""}`}
            >
              {t === "new" ? "RSVP Baru" : "Kelola RSVP"}
            </button>
          ))}
        </div>

        {/* ── TAB: NEW RSVP ── */}
        {tab === "new" && (
          <>
            {/* Step indicator */}
            <div className="flex items-center gap-0 mb-10">
              {[1, 2].map((s) => (
                <div key={s} className="flex items-center">
                  <div className="flex items-center gap-3">
                    <div className={`w-7 h-7 flex items-center justify-center text-xs font-light border transition-all duration-300 ${
                      step > s ? "bg-white border-white text-black"
                      : step === s ? "border-white text-white bg-transparent"
                      : "border-zinc-800 text-zinc-700 bg-transparent"
                    }`}>
                      {step > s ? <CheckCircle className="w-3.5 h-3.5" /> : s}
                    </div>
                    <span className={`text-xs tracking-widest uppercase transition-colors duration-300 ${step >= s ? "text-white" : "text-zinc-700"}`}>
                      {s === 1 ? "Data Diri" : "Detail"}
                    </span>
                  </div>
                  {s < 2 && <div className="mx-5 w-16 h-px bg-zinc-800" />}
                </div>
              ))}
            </div>

            {error && (
              <div className="border border-zinc-800 bg-zinc-950 text-zinc-500 px-4 py-3 text-xs tracking-wide mb-6">
                {error}
              </div>
            )}

            {step === 1 && (
              <div>
                <div className="border border-zinc-800 p-5 focus-within:border-zinc-500 transition-colors">
                  <label className="flex items-center gap-2 text-zinc-600 text-[10px] tracking-[0.3em] uppercase mb-3">
                    <User className="w-3 h-3" /> Nama Lengkap
                  </label>
                  <input
                    type="text"
                    value={formData.nama}
                    onChange={(e) => handleChange("nama", e.target.value)}
                    placeholder="Masukkan nama lengkap"
                    className="w-full bg-transparent text-white text-sm font-light placeholder:text-zinc-700 outline-none"
                  />
                </div>
                <div className="border border-t-0 border-zinc-800 p-5 focus-within:border-zinc-500 transition-colors">
                  <label className="flex items-center gap-2 text-zinc-600 text-[10px] tracking-[0.3em] uppercase mb-3">
                    <Mail className="w-3 h-3" /> Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    placeholder="nama@email.com"
                    className="w-full bg-transparent text-white text-sm font-light placeholder:text-zinc-700 outline-none"
                  />
                </div>
                <button
                  onClick={handleNext}
                  className="w-full border border-t-0 border-zinc-800 bg-white text-black py-4 text-xs tracking-[0.25em] uppercase font-medium hover:bg-zinc-200 transition-all"
                >
                  Lanjut →
                </button>
              </div>
            )}

            {step === 2 && (
              <div>
                {/* Status */}
                <div className="border border-zinc-800 p-5">
                  <label className="text-zinc-600 text-[10px] tracking-[0.3em] uppercase mb-4 block">
                    Status Kehadiran
                  </label>
                  <div className="grid grid-cols-2 gap-0">
                    {[
                      { value: "hadir", label: "Hadir" },
                      { value: "tidak_hadir", label: "Tidak Hadir" },
                    ].map((opt, i) => (
                      <button
                        key={opt.value}
                        onClick={() => handleChange("status_kehadiran", opt.value)}
                        className={`py-3 text-xs tracking-[0.2em] uppercase border transition-all duration-200 ${
                          i === 1 ? "border-l-0" : ""
                        } ${
                          formData.status_kehadiran === opt.value
                            ? "bg-white text-black border-white"
                            : "bg-transparent text-zinc-500 border-zinc-700 hover:border-zinc-500 hover:text-zinc-300"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {formData.status_kehadiran === "hadir" && (
                  <div className="border border-t-0 border-zinc-800 p-5">
                    <label className="flex items-center gap-2 text-zinc-600 text-[10px] tracking-[0.3em] uppercase mb-4">
                      <Users className="w-3 h-3" /> Jumlah Tamu
                    </label>
                    <div className="flex items-center gap-0">
                      <button
                        onClick={() => handleChange("jumlah_tamu", Math.max(1, formData.jumlah_tamu - 1))}
                        className="w-10 h-10 border border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-white transition-all text-lg font-light"
                      >−</button>
                      <span className="text-white text-lg font-extralight w-14 text-center tabular-nums">
                        {formData.jumlah_tamu}
                      </span>
                      <button
                        onClick={() => handleChange("jumlah_tamu", Math.min(10, formData.jumlah_tamu + 1))}
                        className="w-10 h-10 border border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-white transition-all text-lg font-light"
                      >+</button>
                    </div>
                  </div>
                )}

                <div className={`border border-zinc-800 p-5 focus-within:border-zinc-500 transition-colors ${formData.status_kehadiran === "hadir" ? "border-t-0" : "border-t-0"}`}>
                  <label className="flex items-center gap-2 text-zinc-600 text-[10px] tracking-[0.3em] uppercase mb-3">
                    <MessageSquare className="w-3 h-3" /> Ucapan
                    <span className="text-zinc-700 normal-case tracking-normal">— opsional</span>
                  </label>
                  <textarea
                    value={formData.ucapan}
                    onChange={(e) => handleChange("ucapan", e.target.value)}
                    rows={4}
                    placeholder="Tulis ucapan untuk yang berulang tahun..."
                    className="w-full bg-transparent text-white text-sm font-light placeholder:text-zinc-700 outline-none resize-none"
                  />
                </div>

                <div className="flex gap-0">
                  <button
                    onClick={() => setStep(1)}
                    className="flex-1 border border-t-0 border-zinc-800 text-zinc-500 py-4 text-xs tracking-[0.25em] uppercase hover:border-zinc-600 hover:text-white transition-all"
                  >
                    ← Kembali
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="flex-1 border border-t-0 border-l-0 border-zinc-800 bg-white text-black py-4 text-xs tracking-[0.25em] uppercase font-medium hover:bg-zinc-200 disabled:opacity-40 transition-all"
                  >
                    {loading ? "Mengirim..." : "Kirim RSVP"}
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {/* ── TAB: MANAGE RSVP ── */}
        {tab === "manage" && (
          <>
            {cancelDone ? (
              <div className="border border-zinc-800 p-8 text-center">
                <p className="text-zinc-400 text-sm font-light mb-2">RSVP berhasil dibatalkan.</p>
                <p className="text-zinc-700 text-xs mb-8">Kamu bisa daftar ulang kapan saja.</p>
                <button
                  onClick={() => { setCancelDone(false); switchTab("new"); }}
                  className="border border-zinc-800 text-zinc-400 px-8 py-3 text-xs tracking-[0.25em] uppercase hover:border-white hover:text-white transition-all"
                >
                  RSVP Lagi
                </button>
              </div>
            ) : (
              <>
                {manageError && (
                  <div className="border border-zinc-800 bg-zinc-950 text-zinc-500 px-4 py-3 text-xs tracking-wide mb-6">
                    {manageError}
                  </div>
                )}

                {!foundGuest && (
                  <>
                    <div className="border border-zinc-800 p-5 focus-within:border-zinc-500 transition-colors">
                      <label className="flex items-center gap-2 text-zinc-600 text-[10px] tracking-[0.3em] uppercase mb-3">
                        <Mail className="w-3 h-3" /> Email yang didaftarkan
                      </label>
                      <input
                        type="email"
                        value={manageEmail}
                        onChange={(e) => { setManageEmail(e.target.value); setManageError(""); }}
                        onKeyDown={(e) => e.key === "Enter" && handleLookup()}
                        placeholder="nama@email.com"
                        className="w-full bg-transparent text-white text-sm font-light placeholder:text-zinc-700 outline-none"
                      />
                    </div>
                    <button
                      onClick={handleLookup}
                      disabled={manageLoading}
                      className="w-full border border-t-0 border-zinc-800 bg-white text-black py-4 text-xs tracking-[0.25em] uppercase font-medium hover:bg-zinc-200 disabled:opacity-40 transition-all"
                    >
                      {manageLoading ? "Mencari..." : "Cari →"}
                    </button>
                  </>
                )}

                {foundGuest && (
                  <>
                    <div className="border border-zinc-800 p-5">
                      <p className="text-zinc-600 text-[10px] tracking-[0.3em] uppercase mb-2 flex items-center gap-2">
                        <CheckCircle className="w-3 h-3" /> Ditemukan
                      </p>
                      <p className="text-white text-sm font-light">{foundGuest.nama}</p>
                      <p className="text-zinc-600 text-xs mt-1">{foundGuest.email}</p>
                    </div>
                    <div className="border border-t-0 border-zinc-800 p-5">
                      <p className="text-zinc-600 text-[10px] tracking-[0.3em] uppercase mb-2 flex items-center gap-2">
                        <Users className="w-3 h-3" /> Jumlah Tamu
                      </p>
                      <p className="text-white text-sm font-light">{foundGuest.jumlah_tamu} orang</p>
                    </div>
                    {foundGuest.ucapan && (
                      <div className="border border-t-0 border-zinc-800 p-5">
                        <p className="text-zinc-600 text-[10px] tracking-[0.3em] uppercase mb-2 flex items-center gap-2">
                          <MessageSquare className="w-3 h-3" /> Ucapan
                        </p>
                        <p className="text-zinc-400 text-sm font-light leading-relaxed">"{foundGuest.ucapan}"</p>
                      </div>
                    )}
                    <div className="flex gap-0 mt-6">
                      <button
                        onClick={() => { setFoundGuest(null); setManageEmail(""); }}
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
                  </>
                )}
              </>
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
              Data RSVP atas nama <span className="text-zinc-400">{foundGuest?.nama}</span> akan dihapus permanen.
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