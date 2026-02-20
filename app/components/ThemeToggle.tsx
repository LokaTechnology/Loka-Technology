"use client";
import { useEffect, useState } from "react";

type Theme = "light" | "dark" | "contrast";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");
  const [isOpen, setIsOpen] = useState(false);

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
    setIsOpen(false);
  }

  const themeIcons = {
    light: "☀️",
    dark: "🌙",
    contrast: "◐"
  };

  return (
    <div className="theme-toggle-wrapper">
      <button 
        className="theme-toggle-btn"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle theme"
      >
        {themeIcons[theme]}
      </button>
      
      {isOpen && (
        <>
          <div className="theme-backdrop" onClick={() => setIsOpen(false)} />
          <div className="theme-dropdown">
            <button onClick={() => apply("light")} className={theme === "light" ? "active" : ""}>
              ☀️ Light
            </button>
            <button onClick={() => apply("dark")} className={theme === "dark" ? "active" : ""}>
              🌙 Dark
            </button>
            <button onClick={() => apply("contrast")} className={theme === "contrast" ? "active" : ""}>
              ◐ High Contrast
            </button>
          </div>
        </>
      )}
    </div>
  );
}