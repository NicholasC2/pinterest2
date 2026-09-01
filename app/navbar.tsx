import { FaSearch } from "react-icons/fa";

export function Navbar() {
    return (
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
          <button>Log in</button>
          <button>Sign up</button>
        </div>
      </nav>
    )
}