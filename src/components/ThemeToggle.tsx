import { useEffect, useState } from "react";
import { applyTheme, getInitialTheme, Theme } from "utils/themes";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(() => getInitialTheme());

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  return (
    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
      <select
        className="select"
        value={theme}
        onChange={(e) => setTheme(e.target.value as Theme)}
        title="قالب"
        aria-label="قالب"
      >
        <option value="system">سیستم</option>
        <option value="light">روشن</option>
        <option value="dark">تاریک</option>
      </select>
    </div>
  );
}
