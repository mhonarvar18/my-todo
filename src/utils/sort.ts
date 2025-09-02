import type { Todo } from "../types/todo";


export type SortMode =
  | "manual"            // ⬅️ جدید
  | "createdAt_desc"
  | "createdAt_asc"
  | "status_active"
  | "status_done"
  | "text_asc"
  | "text_desc";

export function sortTodos(list: Todo[], mode: SortMode): Todo[] {
  const arr = [...list];
  switch (mode) {
    case "manual":
      return arr.sort((a, b) => (a.order ?? 0) - (b.order ?? 0)); // ⬅️
    case "createdAt_desc":
      return arr.sort((a, b) => b.createdAt - a.createdAt);
    case "createdAt_asc":
      return arr.sort((a, b) => a.createdAt - b.createdAt);
    case "status_active":
      return arr.sort((a, b) => Number(a.done) - Number(b.done));
    case "status_done":
      return arr.sort((a, b) => Number(b.done) - Number(a.done));
    case "text_asc":
      return arr.sort((a, b) => a.text.localeCompare(b.text, "fa"));
    case "text_desc":
      return arr.sort((a, b) => b.text.localeCompare(a.text, "fa"));
    default:
      return arr;
  }
}