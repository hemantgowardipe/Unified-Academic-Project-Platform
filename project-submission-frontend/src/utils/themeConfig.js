export function getTheme(isDark) {
  return {
    bg: isDark ? "bg-[#0d1117]" : "bg-[#ffffff]",
    cardBg: isDark ? "bg-[#161b22]" : "bg-white",
    border: isDark ? "border-[#30363d]" : "border-[#d1d9e0]",
    text: {
      primary: isDark ? "text-[#f0f6fc]" : "text-[#1f2328]",
      secondary: isDark ? "text-[#8d96a0]" : "text-[#656d76]",
      muted: isDark ? "text-[#7d8590]" : "text-[#848d97]",
    },
    accent: isDark ? "bg-[#1f6feb]" : "bg-[#0969da]",
    accentHover: isDark ? "hover:bg-[#388bfd]" : "hover:bg-[#0860ca]",
    button: isDark
      ? "bg-[#21262d] hover:bg-[#30363d]"
      : "bg-[#f6f8fa] hover:bg-[#f3f4f6]",
    buttonBorder: isDark ? "border-[#30363d]" : "border-[#d1d9e0]",
    searchBg: isDark ? "bg-[#0d1117]" : "bg-white",
    searchBorder: isDark
      ? "border-[#30363d] focus:border-[#388bfd]"
      : "border-[#d1d9e0] focus:border-[#0969da]",
  };
}
