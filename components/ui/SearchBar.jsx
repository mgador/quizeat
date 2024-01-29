function SearchBar({ onChange }) {
  return (
    <div className="form-control">
      <input
        type="text"
        placeholder="Search"
        className="input input-bordered w-24 md:w-auto rounded-full input-md h-10"
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;
