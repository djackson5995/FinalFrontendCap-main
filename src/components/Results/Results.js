import React, { useEffect, useState } from "react";
import axios from "axios";

const Results = () => {
  const [bodyPartList, setBodyPartList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://exercisedb.p.rapidapi.com/exercises/name/%7Bname%7D",
          {
            headers: {
              "X-RapidAPI-Key":
                "7a2f44f764msh63c760a318b54e7p13f836jsnd7e899cd9c27",
              "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
            },
          }
        );
        setBodyPartList(response.data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching data");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Body Parts</h2>
      <ul>
        {bodyPartList.map((part, index) => (
          <li key={index}>{part}</li>
        ))}
      </ul>
    </div>
  );
};

export default Results;
