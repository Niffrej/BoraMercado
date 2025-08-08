import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;
if (!MONGODB_URI) {
  throw new Error(
    "Missing MONGODB_URI environment variable. Set it in .env.local (dev) e no Vercel (Production/Preview)."
  );
}

let isConnected = 0;

export async function connectToDatabase() {
  if (isConnected) return;
  const conn = await mongoose.connect(MONGODB_URI, {
    dbName: "BoraMercado"
  });
  isConnected = conn.connections[0].readyState;
}
