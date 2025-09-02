type Props = {
  filter: "all" | "active" | "done";
  onChange: (f: "all" | "active" | "done") => void;
  onClearDone: () => void;
  query: string;
  setQuery: (q: string) => void;
};

export default function TodoFilters({ filter, onChange, onClearDone, query, setQuery }: Props) {
  return (
    <div className="filters">
      <div className="filters-left">
        <button className="btn" onClick={() => onChange("all")}
          style={{ borderColor: filter === "all" ? "var(--accent)" : undefined }}>
          همه
        </button>
        <button className="btn" onClick={() => onChange("active")}
          style={{ borderColor: filter === "active" ? "var(--accent)" : undefined }}>
          فعال
        </button>
        <button className="btn" onClick={() => onChange("done")}
          style={{ borderColor: filter === "done" ? "var(--accent)" : undefined }}>
          انجام‌شده
        </button>
      </div>

      <div className="filters-center">
        <div className="search-bar">
          <input
            className="search-input"
            placeholder="جستجو..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button className="search-clear" onClick={() => setQuery("")} title="پاک‌کردن">×</button>
          )}
        </div>
      </div>

      <div className="filters-right">
        <button className="btn danger" onClick={onClearDone}>حذف انجام‌شده‌ها</button>
      </div>
    </div>
  );
}
