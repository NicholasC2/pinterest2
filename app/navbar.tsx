"use client";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FaX } from "react-icons/fa6";

export function Navbar() {
  const [loginOpen, setLoginOpen] = useState(false);

    return (
      <>
        <nav className="flex flex-row w-full gap-2 h-10 p-2" style={{backgroundColor: "var(--bg-secondary)"}}>
          <div>
            <a href="/">Home</a>
          </div>
          <div className="flex flex-row w-full flex-1"></div>
          <div className="flex flex-row" style={{backgroundColor: "var(--bg-tertiary)", alignItems: "center"}}>
            <input type="text" style={{outline: "none"}}></input>
            <FaSearch className="m-2" />
          </div>
          <div className="flex flex-row gap-2">
            <button onClick={()=>{setLoginOpen(!loginOpen)}}>Log in</button>
            <button>Sign up</button>
          </div>
        </nav>

        {loginOpen && <div className="w-full h-full" style={{position: "absolute", top: 0, left: 0, backgroundColor: "#00000060"}}>
          <div 
            className="flex flex-col p-5" 
            style={{
              position: "absolute", 
              top: "50%", 
              left: "50%", 
              transform: "translate(-50%, -50%)", 
              backgroundColor: "var(--bg-secondary)"
            }} onBlur={()=>{setLoginOpen(false)}}>
              <FaX size={14} style={{cursor: "pointer", position: "absolute", right: "10px", top: "10px"}} onClick={()=>{setLoginOpen(false)}} />
              <label>Username:</label>
              <input type="text" style={{outline: "none", backgroundColor: "var(--bg-tertiary)"}}></input>
              <label>Password:</label>
              <input type="password" style={{outline: "none", backgroundColor: "var(--bg-tertiary)"}}></input>
              <button>Log in</button>
          </div>
        </div>}
      </>
    )
}