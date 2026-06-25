"use server";

import client from "@/lib/mongodb";
import { Account } from "@/src/Account";

const db = client.db("pinterest2");

export async function createImage(data: FormData) {
  await client.connect();

  await db.collection("images").insertOne({
    title: data.get("title") as string,
    createdAt: new Date(),
  });
}

export async function addAccount(acc: Account) {
  await client.connect();

  await db.collection("accounts").insertOne({
    _id: acc.name,
    createdAt: new Date(),
  });
}

export async function removeAccount(username: string) {
  await client.connect();
  
  await db.collection("accounts").deleteOne({
    _id: username,
  });
}