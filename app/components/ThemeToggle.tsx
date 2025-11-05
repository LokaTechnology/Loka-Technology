"use client";
import { useEffect, useState } from "react";

type Theme = "light" | "dark" | "contrast";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const saved = (localStorage.getItem("theme") as Theme) || "light";
    setTheme(saved);
    document.documentElement.setAttribute("data-theme", saved === "light" ? "" : saved);
  }, []);

  function apply(t: Theme) {
    setTheme(t);
    localStorage.setItem("theme", t);
    if (t === "light") document.documentElement.removeAttribute("data-theme");
    else document.documentElement.setAttribute("data-theme", t);
  }

  return (
    <div className="mobile-auth" style={{ gap: 8 }}>
      <button className="btn" onClick={() => apply("light")}>Light</button>
      <button className="btn" onClick={() => apply("dark")}>Dark</button>
      <button className="btn" onClick={() => apply("contrast")}>High contrast</button>
    </div>
  );
}
