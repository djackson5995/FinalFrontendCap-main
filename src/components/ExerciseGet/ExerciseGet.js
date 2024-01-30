import React, { useState, useEffect } from "react";
import axios from "axios";

const ExerciseList = () => {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const token = localStorage.getItem(
          "fe66cb08-5741-44de-8e28-1708ee8d1649"
        );
        const response = await axios.get(
          "https://localhost:5001/api/exercises",
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        setExercises(response.data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching exercises.");
        setLoading(false);
      }
    };

    fetchExercises();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Exercise List</h2>
      <ul>
        {exercises.map((exercise) => (
          <li key={exercise.id}>
            <strong>{exercise.type}</strong>
            <p>Weight: {exercise.weight}</p>
            <p>Reps: {exercise.reps}</p>
            <p>Sets: {exercise.sets}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExerciseList;
