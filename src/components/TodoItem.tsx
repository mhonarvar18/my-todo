import { useState } from "react";
import type { Todo } from "../types/todo";

type Props = {
  todo: Todo;
  onToggle: (id: string) => void;
  onEdit: (id: string, text: string) => void;
  onRemove: (id: string) => void;
};

export default function TodoItem({ todo, onToggle, onEdit, onRemove }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(todo.text);

  function startEdit() {
    setDraft(todo.text);
    setIsEditing(true);
  }

  function save() {
    const val = draft.trim();
    if (val && val !== todo.text) onEdit(todo.id, val);
    setIsEditing(false);
  }

  return (
    <div className={`item ${todo.done ? "done" : ""}`}>
      <input type="checkbox" className="checkbox" checked={todo.done} onChange={() => onToggle(todo.id)} />

      <div className="text">
        {isEditing ? (
          <input
            className="edit-input"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onBlur={save}
            onKeyDown={(e) => e.key === "Enter" && save()}
          />
        ) : (
          <span onDoubleClick={startEdit} title="برای ویرایش دوبار کلیک کنید">
            {todo.text}
          </span>
        )}
      </div>

      <div className="item-actions">
        {isEditing ? (
          <button className="btn primary" onClick={save}>ذخیره</button>
        ) : (
          <button className="btn" onClick={startEdit}>ویرایش</button>
        )}
      </div>

      <button className="btn danger" onClick={() => onRemove(todo.id)}>حذف</button>
    </div>
  );
}
