import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export interface TamuPayload {
  nama: string;
  email: string;
  jumlah_tamu: number;
  ucapan: string;
  status_kehadiran: "hadir" | "tidak_hadir";
}

export interface Tamu {
  _id: string;
  nama: string;
  email: string;
  jumlah_tamu: number;
  ucapan: string;
  status_kehadiran: "hadir" | "tidak_hadir";
  createdAt: string;
}

export const submitRSVP = async (data: TamuPayload) => {
  const res = await api.post("/tamu", data);
  return res.data;
};

export const getGuestList = async (): Promise<Tamu[]> => {
  const res = await api.get("/tamu");
  return res.data.data;
};

export const getTamu = async (id: string): Promise<Tamu> => {
  const res = await api.get(`/tamu/${id}`);
  return res.data.data;
};

export const deleteRSVP = async (id: string) => {
  const res = await api.delete(`/tamu/${id}`);
  return res.data;
};

export const getTamuByEmail = async (email: string): Promise<Tamu> => {
  const res = await api.get(`/tamu/email/${encodeURIComponent(email)}`);
  return res.data.data;
};