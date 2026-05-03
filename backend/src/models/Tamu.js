const mongoose = require("mongoose");

const tamuSchema = new mongoose.Schema(
  {
    nama: {
      type: String,
      required: [true, "Nama wajib diisi"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email wajib diisi"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    jumlah_tamu: {
      type: Number,
      default: 1,
      min: 1,
      max: 10,
    },
    ucapan: {
      type: String,
      default: "",
      maxlength: 500,
    },
    status_kehadiran: {
      type: String,
      enum: ["hadir", "tidak_hadir"],
      required: true,
    },
  },
  {
    timestamps: true, // otomatis tambah createdAt & updatedAt
  }
);

module.exports = mongoose.model("Tamu", tamuSchema);