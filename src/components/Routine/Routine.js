import React, { useState, useEffect } from "react";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import useAuth from "../../hooks/useAuth";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import { Stack } from "@mui/material";
import Button from "@mui/material/Button";

const RoutinePage = ({ onRoutineDrop }) => {
  const [routines, setRoutines] = useState([]);
  const [routineName, setRoutineName] = useState("");
  const [routineDescription, setRoutineDescription] = useState("");
  const [user, token] = useAuth();

  useEffect(() => {
    fetchRoutines();
  }, []);

  const fetchRoutines = async () => {
    try {
      const response = await axios.get("https://localhost:5000/api/routines", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setRoutines(response.data);
    } catch (error) {
      console.error("Error fetching routines:", error);
    }
  };

  const handleAddRoutine = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://localhost:5000/api/routines",
        {
          name: routineName,
          description: routineDescription,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      if (response.status === 200) {
        const newRoutine = response.data;
        setRoutines([...routines, newRoutine]);
        setRoutineName("");
        setRoutineDescription("");

        alert(`Routine added: ${newRoutine.name} - ${newRoutine.description}`);
      } else {
        console.error("Failed to add routine:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding routine:", error);
    }
  };

  const handleDeleteRoutine = async (id) => {
    try {
      const response = await axios.delete(
        `https://localhost:5000/api/routines/${id}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      if (response.status === 200) {
        const updatedRoutines = routines.filter((routine) => routine.id !== id);
        setRoutines(updatedRoutines);
      } else {
        console.error("Failed to delete routine:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting routine:", error);
    }
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedRoutines = Array.from(routines);
    const [movedRoutine] = reorderedRoutines.splice(result.source.index, 1);
    reorderedRoutines.splice(result.destination.index, 0, movedRoutine);

    setRoutines(reorderedRoutines);
  };

  return (
    <>
      <h1>Create Your Routine</h1>
      <Stack
        direction={"row"}
        spacing={2}
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        onSubmit={handleAddRoutine}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="routine-name"
          label="Routine Name"
          variant="outlined"
          value={routineName}
          onChange={(e) => setRoutineName(e.target.value)}
          required
        />
        <TextField
          id="routine-description"
          label="Description"
          variant="outlined"
          multiline
          value={routineDescription}
          onChange={(e) => setRoutineDescription(e.target.value)}
          required
        />
        <Button variant="contained" size="small" type="submit">
          Add Routine
        </Button>
      </Stack>

      <div>
        <h2>Your Routines</h2>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="routines">
            {(provided) => (
              <List {...provided.droppableProps} ref={provided.innerRef}>
                {routines.map((routine, index) => (
                  <Draggable
                    key={routine.id.toString()}
                    draggableId={routine.id.toString()}
                    index={index}
                  >
                    {(provided) => (
                      <ListItem
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <ListItemButton>
                          <ListItemText
                            primary={routine.name}
                            secondary={routine.description}
                          />
                          <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={() => handleDeleteRoutine(routine.id)}
                          ></IconButton>
                        </ListItemButton>
                      </ListItem>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </List>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </>
  );
};

export default RoutinePage;
