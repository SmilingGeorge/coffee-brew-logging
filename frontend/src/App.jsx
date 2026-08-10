import { useEffect, useState } from "react";
import axios from "axios";
import BrewForm from "./components/BrewForm";
import BrewFilter from "./components/BrewFilter";
import "./App.css";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5050/api/brews";

function App() {
  const [brews, setBrews] = useState([]);
  const [brewCount, setBrewCount] = useState(0);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [editingBrew, setEditingBrew] = useState(null);

  const fetchBrews = async (method = "") => {
    try {
      setLoading(true);

      const response = await axios.get(API_URL, {
        params: method ? { method } : {},
      });

      setBrews(response.data.brews);
      setBrewCount(response.data.brewCount);
    } catch (error) {
      console.error("Failed to fetch brews:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBrews();
  }, []);

  const handleFilterChange = (method) => {
    setFilter(method);
    fetchBrews(method);
  };

  const handleBrewCreated = (newBrew) => {
    setBrewCount((current) => current + 1);

    if (!filter || newBrew.brewMethod === filter) {
      setBrews((current) => [newBrew, ...current]);
    }
  };

  const handleBrewUpdated = (updatedBrew) => {
    setEditingBrew(null);

    if (!filter || updatedBrew.brewMethod === filter) {
      setBrews((current) =>
        current.map((brew) =>
          brew.id === updatedBrew.id ? updatedBrew : brew
        )
      );
    } else {
      setBrews((current) =>
        current.filter((brew) => brew.id !== updatedBrew.id)
      );
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this brew?"
    );

    if (!confirmed) return;

    try {
      await axios.delete(`${API_URL}/${id}`);

      setBrews((current) =>
        current.filter((brew) => brew.id !== id)
      );

      setBrewCount((current) => current - 1);

      if (editingBrew?.id === id) {
        setEditingBrew(null);
      }
    } catch (error) {
      console.error("Failed to delete brew:", error);
      alert("Failed to delete brew.");
    }
  };

  return (
    <div className="app">
      <header className="hero">
        <div>
          <p className="eyebrow">COFFEE BREW LOG</p>
          <h1>Brews: {brewCount}</h1>
          <p className="subtitle">
            Keep track of every cup, recipe and brewing experiment.
          </p>
        </div>
      </header>

      <div className="content">
        <section className="form-card">
          <BrewForm
            editingBrew={editingBrew}
            onBrewCreated={handleBrewCreated}
            onBrewUpdated={handleBrewUpdated}
            onCancelEdit={() => setEditingBrew(null)}
          />
        </section>

        <section className="list-section">
          <div className="list-header">
            <div>
              <p className="eyebrow">YOUR LOG</p>
              <h2>Recent Brews</h2>
            </div>

            <BrewFilter
              value={filter}
              onChange={handleFilterChange}
            />
          </div>

          {loading ? (
            <div className="empty-state">
              <p>Loading brews...</p>
            </div>
          ) : brews.length === 0 ? (
            <div className="empty-state">
              <p>No brews found.</p>
            </div>
          ) : (
            <div className="brew-list">
              {brews.map((brew) => (
                <article className="brew-card" key={brew.id}>
                  <div className="brew-main">
                    <div>
                      <span className="method">
                        {brew.brewMethod}
                      </span>

                      <h3>{brew.coffeeName}</h3>
                    </div>

                    <div className="brew-actions">
                      <button
                        type="button"
                        className="edit-button"
                        onClick={() => setEditingBrew(brew)}
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        className="delete-button"
                        onClick={() => handleDelete(brew.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>

                  <div className="brew-details">
                    <span>
                      <strong>{brew.coffeeAmount}g</strong> coffee
                    </span>

                    <span>
                      <strong>{brew.waterAmount}ml</strong> water
                    </span>

                    <span>
                      <strong>{brew.brewTime}s</strong> brew time
                    </span>
                  </div>

                  <p className="notes">{brew.notes}</p>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default App;