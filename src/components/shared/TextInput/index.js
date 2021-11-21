function TextInput({ label, value, onChange }) {
  return (
    <label className="flex flex-col text-gray-700 text-sm font-bold mb-2">
      { label }
      <input
        className="mt-2 shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight"
        placeholder="e.g. The Room"
        value={ value }
        onChange={ onChange }
      />
    </label>
  );
}

export default TextInput;
