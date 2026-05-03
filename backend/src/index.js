require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/database");
const tamuRoutes = require("./routes/tamuRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://tutam10-rcwn.vercel.app",
  ],
  credentials: true,
}));
app.use(express.json());

app.use("/api/tamu", tamuRoutes);

app.get("/", (req, res) => {
  res.json({ pesan: "RSVP API berjalan!" });
});

app.listen(PORT, () => {
  console.log(`Server jalan di http://localhost:${PORT}`);
});