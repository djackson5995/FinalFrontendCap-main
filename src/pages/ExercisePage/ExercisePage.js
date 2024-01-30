import React from "react";
import ExercisePost from "../../components/ExercisePost/ExercisePost";
import ExerciseList from "../../components/ExerciseGet/ExerciseGet";
import NavBar from "../../components/NavBar/NavBar";

const ExercisePage = () => {
  return (
    <div>
      <NavBar />
      <h1>Exercise Page</h1>
      <ExercisePost />
      <ExerciseList />
    </div>
  );
};

export default ExercisePage;
