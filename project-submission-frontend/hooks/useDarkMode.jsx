import { useState, useEffect } from "react";

export default function useDarkMode() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDark(darkModeMediaQuery.matches);

    const handleThemeChange = (e) => setIsDark(e.matches);
    darkModeMediaQuery.addEventListener("change", handleThemeChange);

    return () =>
      darkModeMediaQuery.removeEventListener("change", handleThemeChange);
  }, []);

  return isDark;
}
