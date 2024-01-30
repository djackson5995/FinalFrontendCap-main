import React, { useState } from "react";
import axios from "axios";

const ExercisePost = () => {
  const [type, setType] = useState("");
  const [weight, setWeight] = useState(0);
  const [reps, setReps] = useState(0);
  const [sets, setSets] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleTypeChange = (e) => {
    setType(e.target.value);
  };

  const handleWeightChange = (e) => {
    setWeight(e.target.value);
  };

  const handleRepsChange = (e) => {
    setReps(e.target.value);
  };

  const handleSetsChange = (e) => {
    setSets(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const token = localStorage.getItem(
        "fe66cb08-5741-44de-8e28-1708ee8d1649"
      );
      const response = await axios.post(
        "https://localhost:5001/api/exercises",
        {
          Type: type,
          Weight: weight,
          Reps: reps,
          Sets: sets,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setLoading(false);
      setSuccess(true);
      setType("");
      setWeight(0);
      setReps(0);
      setSets(0);
    } catch (error) {
      setLoading(false);
      setError("Failed to create exercise. Please try again.");
    }
  };

  return (
    <div>
      <h1>Create Your Exercise</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Type:</label>
          <input
            type="text"
            value={type}
            onChange={handleTypeChange}
            required
          />
        </div>
        <div>
          <label>Weight:</label>
          <input
            type="number"
            value={weight}
            onChange={handleWeightChange}
            required
          />
        </div>
        <div>
          <label>Reps:</label>
          <input
            type="number"
            value={reps}
            onChange={handleRepsChange}
            required
          />
        </div>
        <div>
          <label>Sets:</label>
          <input
            type="number"
            value={sets}
            onChange={handleSetsChange}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Exercise"}
        </button>
      </form>
      {error && <p>{error}</p>}
      {success && <p>Exercise created successfully!</p>}
    </div>
  );
};

export default ExercisePost;
