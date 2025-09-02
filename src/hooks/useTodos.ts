// ...
import { useEffect, useMemo, useState } from "react";
import type { Todo } from "../types/todo";
import { loadJSON, saveJSON } from "utils/storage";
import { STORAGE_KEY } from "constants";
import { uid } from "utils/uid";

function normalizeOrder(list: Todo[]): Todo[] {
  // اگر بعضی‌ها order ندارند، بر اساس createdAt مقداردهی کن
  let needFix = list.some(t => (t as any).order === undefined);
  if (!needFix) return list;

  // ترتیب اولیه: بر اساس createdAt صعودی
  const fixed = [...list]
    .sort((a,b) => a.createdAt - b.createdAt)
    .map((t, i) => ({ ...t, order: i + 1 }));
  return fixed;
}

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(
    () => normalizeOrder(loadJSON<Todo[]>(STORAGE_KEY, []))
  );

  useEffect(() => {
    saveJSON(STORAGE_KEY, todos);
  }, [todos]);

  function nextOrderValue(list: Todo[]) {
    return list.length ? Math.max(...list.map(t => t.order ?? 0)) + 1 : 1;
  }

  function add(text: string) {
    const value = text.trim();
    if (!value) return;
    setTodos(prev => {
      const normalized = normalizeOrder(prev);
      return [
        { id: uid(), text: value, done: false, createdAt: Date.now(), order: nextOrderValue(normalized) },
        ...normalized
      ];
    });
  }

  function toggle(id: string) {
    setTodos(prev => prev.map(t => (t.id === id ? { ...t, done: !t.done } : t)));
  }

  function remove(id: string) {
    setTodos(prev => prev.filter(t => t.id !== id));
  }

  function edit(id: string, newText: string) {
    const value = newText.trim();
    if (!value) return;
    setTodos(prev => prev.map(t => (t.id === id ? { ...t, text: value } : t)));
  }

  function clearDone() {
    setTodos(prev => prev.filter(t => !t.done));
  }

  // مرتب‌سازی بر اساس فیلتر
  function byFilter(filter: "all" | "active" | "done"): Todo[] {
    const base =
      filter === "active" ? todos.filter(t => !t.done)
      : filter === "done" ? todos.filter(t => t.done)
      : todos;
    return base;
  }

  // جابه‌جایی دستی: id را قبل از overId قرار بده
  function move(id: string, overId: string) {
    setTodos(prev => {
      const list = [...prev].sort((a,b) => a.order - b.order);
      const fromIndex = list.findIndex(t => t.id === id);
      const toIndex = list.findIndex(t => t.id === overId);
      if (fromIndex < 0 || toIndex < 0) return prev;

      const [item] = list.splice(fromIndex, 1);
      list.splice(toIndex, 0, item);

      // reindex: 1..n
      const reindexed = list.map((t, i) => ({ ...t, order: i + 1 }));
      return reindexed;
    });
  }

  const remainingCount = useMemo(() => todos.filter(t => !t.done).length, [todos]);

  return { todos, add, toggle, remove, edit, clearDone, remainingCount, byFilter, move };
}
