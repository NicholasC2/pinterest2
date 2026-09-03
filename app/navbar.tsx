"use client";
import { SyntheticEvent, useEffect, useState } from "react";
import { FaBars, FaLayerGroup, FaSearch } from "react-icons/fa";
import { FaBurger, FaX } from "react-icons/fa6";

export function Navbar() {
  const [openForm, setOpenForm] = useState(0);

  return (
    <>
      <nav className="flex flex-row w-full gap-2 h-10 p-2" style={{backgroundColor: "var(--bg-secondary)", alignItems: "center"}}>
        <div>
          <a href="/">Home</a>
        </div>
        <div className="flex flex-row w-full flex-1"></div>
        <div className="flex flex-row gap-2" style={{ textWrap: "nowrap" }}>
          <div
            className="flex flex-row"
            style={{
              backgroundColor: "var(--bg-tertiary)",
            }}
          >
            <input type="text" className="w-full" style={{ outline: "none" }} />
            <FaSearch className="m-2" />
          </div>

          <button onClick={() => setOpenForm(1)} className="cursor-pointer">Log in</button>
          <button onClick={() => setOpenForm(2)} className="cursor-pointer">Sign up</button>
        </div>
      </nav>

      {openForm === 1 && // login
        <div 
          className="w-full h-full" 
          style={{
            position: "absolute", 
            top: 0, 
            left: 0, 
            backgroundColor: "#00000050"
          }}
          onClick={(ev) => {
            if (ev.target === ev.currentTarget) {
              setOpenForm(0);
            }
          }}
        >
          <form
            onSubmit={login}
            className="flex flex-col p-5" 
            style={{
              position: "absolute", 
              top: "50%", 
              left: "50%", 
              transform: "translate(-50%, -50%)", 
              backgroundColor: "var(--bg-secondary)"
            }}
          >
            <FaX size={14} style={{cursor: "pointer", position: "absolute", right: "10px", top: "10px"}} onClick={()=>{setOpenForm(0)}} />
            <label>Username:</label>
            <input type="text" name="username" style={{outline: "none", backgroundColor: "var(--bg-tertiary)"}}></input>
            <label>Password:</label>
            <input type="password" name="password" style={{outline: "none", backgroundColor: "var(--bg-tertiary)"}}></input>
            <input type="submit" value="Log In" className="cursor-pointer"></input>
            
            <span className="status"></span>
          </form>
        </div>
      }

      {openForm === 2 && //signup
        <div 
          className="w-full h-full" 
          style={{
            position: "absolute", 
            top: 0, 
            left: 0, 
            backgroundColor: "#00000050"
          }}
          onClick={(ev) => {
            if (ev.target === ev.currentTarget) {
              setOpenForm(0);
            }
          }}
        >
          <form
            onSubmit={signup}
            className="flex flex-col p-5" 
            style={{
              position: "absolute", 
              top: "50%", 
              left: "50%", 
              transform: "translate(-50%, -50%)", 
              backgroundColor: "var(--bg-secondary)"
            }}
          >
            <FaX size={14} style={{cursor: "pointer", position: "absolute", right: "10px", top: "10px"}} onClick={()=>{setOpenForm(0)}} />
            <label>Username:</label>
            <input type="text" name="username" style={{outline: "none", backgroundColor: "var(--bg-tertiary)"}}></input>
            <label>Password:</label>
            <input type="password" name="password" style={{outline: "none", backgroundColor: "var(--bg-tertiary)"}}></input>
            <label>Confirm Password:</label>
            <input type="password" name="password" style={{outline: "none", backgroundColor: "var(--bg-tertiary)"}}></input>
            <input type="submit" value="Sign Up" className="cursor-pointer"></input>

            <span className="status"></span>
          </form>
        </div>
      }
    </>
  )
}

function signup(ev: SyntheticEvent) {
  if(!(ev.target instanceof HTMLFormElement)) return;

  ev.preventDefault();

  const username = ev.target[0].value;
  const password = ev.target[1].value;
  const confirmPassword = ev.target[2].value;

  const status = ev.target.querySelector(".status")

  if(status instanceof HTMLElement) {
    if(password !== confirmPassword) {
      status.innerText = "Passwords do not match!"
      status.style.color = "red"
    } else {
      status.innerText = ""
    }
  }
}

function login(ev: SyntheticEvent) {
  if(!(ev.target instanceof HTMLFormElement)) return;
  
  ev.preventDefault();

  const username = ev.target[0].value;
  const password = ev.target[1].value;

  console.log(username, password)
}