import { useState } from "react";

type Props = { onAdd: (text: string) => void };

export default function TodoForm({ onAdd }: Props) {
  const [text, setText] = useState("");

  function submit() {
    if (!text.trim()) return;
    onAdd(text);
    setText("");
  }

  return (
    <div className="row">
      <input
        className="input"
        placeholder="چه کاری می‌خوای انجام بدی؟ (Enter)"
        value={text}
        onChange={e => setText(e.target.value)}
        onKeyDown={e => e.key === "Enter" && submit()}
        autoFocus
      />
      <button className="btn primary" onClick={submit} disabled={!text.trim()}>
        افزودن
      </button>
    </div>
  );
}
