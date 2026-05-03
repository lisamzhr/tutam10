const express = require("express");
const router = express.Router();
const {
  buatTamu,
  semuaTamu,
  detailTamu,
  hapusTamu,
  cariTamuByEmail,
} = require("../controllers/tamuController");
const { validasiTamu } = require("../middleware/validasi");

router.post("/", validasiTamu, buatTamu);
router.get("/", semuaTamu);
router.get("/email/:email", cariTamuByEmail);
router.get("/:id", detailTamu);
router.delete("/:id", hapusTamu);

module.exports = router;