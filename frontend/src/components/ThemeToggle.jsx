import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [dark, setDark] = useState(() => {
  return localStorage.getItem("theme") === "dark";
});

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
  <div className="flex items-center gap-2">
    
    {/* Icon (optional) */}
    <span className="text-sm">
      {dark ? "🌙" : "☀️"}
    </span>

    {/* Toggle */}
    <div
      onClick={() => setDark(!dark)}
      className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition
        ${dark ? "bg-indigo-600" : "bg-gray-300"}
      `}
    >
      <div
        className={`bg-white w-4 h-4 rounded-full shadow-md transform transition
          ${dark ? "translate-x-6" : "translate-x-0"}
        `}
      />
    </div>

  </div>
);
};

export default ThemeToggle;