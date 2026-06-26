"use client";

import Image from "next/image";
import Navbar from "../../utils/navbar";
import { accountExists, addAccount, removeAccount } from "../../actions";
import { useState } from "react";
import { Account } from "@/src/Account";

import { hash } from "argon2"
import { hashOptions } from "@/app/utils/constants";

export default function CreateAccount() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
  
    async function handleSubmit(e: React.SubmitEvent) {
        e.preventDefault();
  
        const salt = Buffer.from(crypto.randomUUID());

        const passwordHash = await hash(password, {
            ...hashOptions,
            salt
        });

        const account = new Account(username, passwordHash, new Date());

        addAccount(account);
    }

	return (
		<>
			<Navbar />

            <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={async(e) => {
                    setUsername(e.target.value)
                    
                    const status = document.querySelector(".status");

                    if(!status) return;

                    status.innerHTML = await accountExists(username) ? "Username Taken" : "Username Available"
                }}
            />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <label className="status"></label>

            <button type="submit">Submit</button>
            </form>
		</>
	);
}
