import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5050/api/brews";

const initialForm = {
  coffeeName: "",
  brewMethod: "",
  coffeeAmount: "",
  waterAmount: "",
  brewTime: "",
  notes: "",
};

function BrewForm({
  editingBrew,
  onBrewCreated,
  onBrewUpdated,
  onCancelEdit,
}) {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");

  useEffect(() => {
    if (editingBrew) {
      setForm({
        coffeeName: editingBrew.coffeeName,
        brewMethod: editingBrew.brewMethod,
        coffeeAmount: String(editingBrew.coffeeAmount),
        waterAmount: String(editingBrew.waterAmount),
        brewTime: String(editingBrew.brewTime),
        notes: editingBrew.notes,
      });
    } else {
      setForm(initialForm);
    }

    setError("");
  }, [editingBrew]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    const hasBlankField = Object.values(form).some(
      (value) => value.trim() === ""
    );

    if (hasBlankField) {
      setError("Please complete all fields.");
      return;
    }

    try {
      const payload = {
        ...form,
        coffeeAmount: Number(form.coffeeAmount),
        waterAmount: Number(form.waterAmount),
        brewTime: Number(form.brewTime),
      };

      if (editingBrew) {
        const response = await axios.put(
          `${API_URL}/${editingBrew.id}`,
          payload
        );

        onBrewUpdated(response.data);
      } else {
        const response = await axios.post(API_URL, payload);

        onBrewCreated(response.data);
      }

      setForm(initialForm);
    } catch (error) {
      console.error("Failed to save brew:", error);
      setError(
        editingBrew
          ? "Failed to update brew."
          : "Failed to create brew."
      );
    }
  };

  return (
    <section>
      <h2>{editingBrew ? "Edit Brew" : "Log a Brew"}</h2>

      {error && <p>{error}</p>}

      <form onSubmit={handleSubmit}>
        <label>
          Coffee Name
          <input
            type="text"
            name="coffeeName"
            value={form.coffeeName}
            onChange={handleChange}
          />
        </label>

        <label>
          Brew Method
          <select
            name="brewMethod"
            value={form.brewMethod}
            onChange={handleChange}
          >
            <option value="">Select method</option>
            <option value="V60">V60</option>
            <option value="French Press">French Press</option>
            <option value="AeroPress">AeroPress</option>
            <option value="Chemex">Chemex</option>
            <option value="Espresso">Espresso</option>
          </select>
        </label>

        <label>
          Coffee Amount (g)
          <input
            type="number"
            name="coffeeAmount"
            value={form.coffeeAmount}
            onChange={handleChange}
          />
        </label>

        <label>
          Water Amount (ml)
          <input
            type="number"
            name="waterAmount"
            value={form.waterAmount}
            onChange={handleChange}
          />
        </label>

        <label>
          Brew Time (seconds)
          <input
            type="number"
            name="brewTime"
            value={form.brewTime}
            onChange={handleChange}
          />
        </label>

        <label>
          Notes
          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
          />
        </label>

        <button type="submit">
          {editingBrew ? "Update Brew" : "Save Brew"}
        </button>

        {editingBrew && (
          <button type="button" onClick={onCancelEdit}>
            Cancel
          </button>
        )}
      </form>
    </section>
  );
}

export default BrewForm;