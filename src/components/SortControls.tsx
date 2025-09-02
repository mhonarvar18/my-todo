import type { SortMode } from "../utils/sort";

type Props = { mode: SortMode; onChange: (m: SortMode) => void };

export default function SortControls({ mode, onChange }: Props) {
  return (
    <div className="sort-wrap">
      <select
        className="select"
        value={mode}
        onChange={(e) => onChange(e.target.value as SortMode)}
        title="مرتب‌سازی"
      >
        <option value="createdAt_desc">جدیدترین</option>
        <option value="createdAt_asc">قدیمی‌ترین</option>
        <option value="status_active">اول فعال‌ها</option>
        <option value="status_done">اول انجام‌شده‌ها</option>
        <option value="text_asc">الفبا A→Z</option>
        <option value="text_desc">الفبا Z→A</option>
        <option value="manual">ترتیب دستی (Drag)</option>
      </select>
    </div>
  );
}
