import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { Session } from "./accounts/session";
import { Database } from "./database/database"

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

const db = new Database("file:tchat.db");

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const account = await db.getUser(username);

  if (!account) {
    return res.status(401).json({ error: "Invalid login" });
  }

  const ok = await account.checkPassword(password);

  if (!ok) {
    return res.status(401).json({ error: "Invalid login" });
  }

  const session = new Session(crypto.randomUUID(), Date.now())

  await account.sessions.push(session);

  res.cookie("sessionId", session.id, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
  });

  res.json({ success: true });
});

app.listen(3001, () => {
  console.log("API running on http://localhost:3001");
});