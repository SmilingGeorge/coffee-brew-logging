function BrewFilter({ value, onChange }) {
  return (
    <label>
      Filter by method
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        <option value="">All methods</option>
        <option value="V60">V60</option>
        <option value="French Press">French Press</option>
        <option value="AeroPress">AeroPress</option>
        <option value="Chemex">Chemex</option>
        <option value="Espresso">Espresso</option>
      </select>
    </label>
  );
}

export default BrewFilter;