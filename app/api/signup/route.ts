import { NextResponse } from "next/server";
import { LowSync, SyncAdapter } from "lowdb";

const db = new LowSync()

export async function POST(request: Request) {
  const body = await request.json();

  const { username, password } = body;

  console.log(username, password);

  return NextResponse.json({
    message: "Account created!",
  });
}