import PropTypes from "prop-types";

export default function SearchBar({ query, onChange }) {
  return (
    <div className="search-bar">
      <input
        className="search-input"
        placeholder="جستجو..."
        value={query}
        onChange={(e) => onChange(e.target.value)}
      />
      {query && (
        <button
          className="search-clear"
          onClick={() => onChange("")}
          title="پاک‌کردن جستجو"
        >
          ×
        </button>
      )}
    </div>
  );
}

SearchBar.propTypes = {
  query: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
