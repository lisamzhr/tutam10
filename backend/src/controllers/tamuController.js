const Tamu = require("../models/Tamu");

// CREATE — POST /api/tamu
const buatTamu = async (req, res) => {
  try {
    const { nama, email, jumlah_tamu, ucapan, status_kehadiran } = req.body;

    // Cek email sudah terdaftar belum
    const sudahAda = await Tamu.findOne({ email: email.toLowerCase() });
    if (sudahAda) {
      return res.status(409).json({
        sukses: false,
        pesan: "Email ini sudah terdaftar.",
      });
    }

    const tamu = await Tamu.create({
      nama,
      email,
      jumlah_tamu,
      ucapan,
      status_kehadiran,
    });

    res.status(201).json({
      sukses: true,
      pesan: "RSVP berhasil!",
      data: tamu,
    });
  } catch (error) {
    res.status(500).json({ sukses: false, pesan: "Terjadi kesalahan server" });
  }
};

// READ — GET /api/tamu (semua tamu yang hadir, untuk Guest List)
const semuaTamu = async (req, res) => {
  try {
    const tamu = await Tamu.find({ status_kehadiran: "hadir" })
      .select("nama ucapan jumlah_tamu createdAt status_kehadiran")
      .sort({ createdAt: -1 });

    res.json({
      sukses: true,
      total: tamu.length,
      data: tamu,
    });
  } catch (error) {
    res.status(500).json({ sukses: false, pesan: "Terjadi kesalahan server" });
  }
};

// READ — GET /api/tamu/:id (detail satu tamu, untuk Sukses Page)
const detailTamu = async (req, res) => {
  try {
    const tamu = await Tamu.findById(req.params.id);

    if (!tamu) {
      return res.status(404).json({
        sukses: false,
        pesan: "Data tamu tidak ditemukan",
      });
    }

    res.json({ sukses: true, data: tamu });
  } catch (error) {
    res.status(500).json({ sukses: false, pesan: "Terjadi kesalahan server" });
  }
};

// DELETE — DELETE /api/tamu/:id (batalkan kehadiran)
const hapusTamu = async (req, res) => {
  try {
    const tamu = await Tamu.findByIdAndDelete(req.params.id);

    if (!tamu) {
      return res.status(404).json({
        sukses: false,
        pesan: "Data tamu tidak ditemukan",
      });
    }

    res.json({
      sukses: true,
      pesan: `RSVP atas nama ${tamu.nama} telah dibatalkan.`,
    });
  } catch (error) {
    res.status(500).json({ sukses: false, pesan: "Terjadi kesalahan server" });
  }
};

// GET /api/tamu/email/:email
const cariTamuByEmail = async (req, res) => {
  try {
    const tamu = await Tamu.findOne({ 
      email: req.params.email.toLowerCase() 
    });

    if (!tamu) {
      return res.status(404).json({
        sukses: false,
        pesan: "Email tidak ditemukan dalam daftar tamu.",
      });
    }

    res.json({ sukses: true, data: tamu });
  } catch (error) {
    res.status(500).json({ sukses: false, pesan: "Terjadi kesalahan server" });
  }
};

module.exports = { buatTamu, semuaTamu, detailTamu, hapusTamu, cariTamuByEmail };