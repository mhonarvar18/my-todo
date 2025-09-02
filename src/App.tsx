// src/App.tsx
import { useMemo, useState } from "react";
import { useTodos } from "./hooks/useTodos";
import TodoForm from "./components/TodoForm";
import TodoFilters from "./components/TodoFilters";
import TodoList from "./components/TodoList";
import SortControls from "./components/SortControls";
import { sortTodos, type SortMode } from "./utils/sort";
import "./index.css";

export default function App() {
  // منطق تودوها از هوک اختصاصی
  const { add, toggle, edit, remove, clearDone, remainingCount, byFilter, move } = useTodos();

  // فیلتر وضعیت، جستجو و حالت مرتب‌سازی
  const [filter, setFilter] = useState<"all" | "active" | "done">("all");
  const [query, setQuery] = useState("");
  const [sortMode, setSortMode] = useState<SortMode>("createdAt_desc");

  // خروجی قابل نمایش: ابتدا فیلتر وضعیت، سپس جستجو، و در نهایت مرتب‌سازی
  const visibleTodos = useMemo(() => {
    const base = byFilter(filter);
    const searched = query.trim()
      ? base.filter(t => t.text.toLowerCase().includes(query.trim().toLowerCase()))
      : base;
    return sortTodos(searched, sortMode);
  }, [filter, query, byFilter, sortMode]);

  const isManual = sortMode === "manual";

  return (
    <div className="container">
      {/* هدر */}
      <div className="header">
        <div className="title">لیست کارها (Todo)</div>
        <div className="counter">
          {remainingCount === 0 ? "همه انجام شد 🎉" : `${remainingCount} کار باقی‌مانده`}
        </div>
      </div>

      {/* فرم افزودن آیتم جدید */}
      <TodoForm onAdd={add} />

      {/* فیلترها + جستجو + حذف انجام‌شده‌ها */}
      <TodoFilters
        filter={filter}
        onChange={setFilter}
        onClearDone={clearDone}
        query={query}
        setQuery={setQuery}
      />

      {/* کنترل مرتب‌سازی (از جمله حالت manual برای Drag & Drop) */}
      <SortControls mode={sortMode} onChange={setSortMode} />

      {/* لیست: وقتی manual است، Drag فعال می‌شود و onMove به هوک وصل است */}
      <TodoList
        todos={visibleTodos}
        onToggle={toggle}
        onEdit={edit}
        onRemove={remove}
        onMove={move}
        sortable={isManual}
      />
    </div>
  );
}
