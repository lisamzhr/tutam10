const { body, validationResult } = require("express-validator");

const tampilkanError = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      sukses: false,
      pesan: errors.array()[0].msg,
    });
  }
  next();
};

const validasiTamu = [
  body("nama").trim().notEmpty().withMessage("Nama wajib diisi"),

  body("email")
    .trim()
    .notEmpty().withMessage("Email wajib diisi")
    .isEmail().withMessage("Format email tidak valid"),

  body("jumlah_tamu")
    .optional()
    .isInt({ min: 1, max: 10 })
    .withMessage("Jumlah tamu antara 1–10"),

  body("status_kehadiran")
    .notEmpty().withMessage("Status kehadiran wajib dipilih")
    .isIn(["hadir", "tidak_hadir"])
    .withMessage("Status harus 'hadir' atau 'tidak_hadir'"),

  tampilkanError,
];

module.exports = { validasiTamu };