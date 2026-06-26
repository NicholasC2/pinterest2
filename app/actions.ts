"use server";

import client from "@/lib/mongodb";
import { Account } from "@/src/Account";
import { Collection, Document } from "mongodb";

async function getDB<T extends Document>(name: string): Promise<Collection<T>> {
  await client.connect();

  const db = client.db("pinterest2");

  return db.collection<T>(name);
}

export async function accountExists(username: string): Promise<Boolean> {
  const accounts = await getDB<Account>("accounts");

  return !!await accounts.findOne({ name: username })
}

export async function addAccount(acc: Account) {
  const accounts = await getDB<Account>("accounts");

  if(await accountExists(acc.name)) {
    throw new Error("Account exists")
  }

  await accounts.insertOne(acc);
}

export async function removeAccount(username: string) {
  const accounts = await getDB<Account>("accounts");
  
  await accounts.deleteMany({
    name: username,
  });
}