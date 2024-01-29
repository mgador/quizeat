function RadioInputButton({ label, value, checked, onChange }) {
  return (
    <label
      className={`inline-flex items-center px-4 py-2 me-2 p-3 text-white rounded-md cursor-pointer focus:outline-none focus:ring focus:border-blue-300 flex-auto ${
        checked
          ? "bg-opacity-75 bg-indigo-600"
          : "hover:bg-opacity-50 bg-primary"
      }`}
    >
      <input
        type="radio"
        value={value}
        checked={checked}
        onChange={onChange}
        className="hidden"
      />
      {label}
    </label>
  );
}

export default RadioInputButton;
