import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Routine from "../../components/Routine/Routine";
import NavBar from "../../components/NavBar/NavBar";

const CalendarPage = () => {
  const [events, setEvents] = useState([]);

  const handleDateClick = (arg) => {
    alert("Clicked on date: " + arg.dateStr);
  };

  const handleAddRoutine = (routine) => {
    setEvents([...events, { title: routine.name, date: routine.date }]);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedEvents = Array.from(events);
    const [movedRoutine] = reorderedEvents.splice(result.source.index, 1);
    reorderedEvents.splice(result.destination.index, 0, movedRoutine);

    setEvents(reorderedEvents);
  };

  const renderEventContent = (eventInfo) => {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    );
  };

  return (
    <div>
      <NavBar />
      <Routine date={null} onAddRoutine={handleAddRoutine} />
      <DragDropContext onDragEnd={handleDragEnd}>
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          weekends={false}
          events={events}
          dateClick={handleDateClick}
          eventContent={renderEventContent}
          droppable
          eventReceive={(event) => {
            setEvents([
              ...events,
              { title: event.event.title, date: event.event.start },
            ]);
          }}
        />
        <Droppable droppableId="routines">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {events.map((event, index) => (
                <Draggable
                  key={event.title}
                  draggableId={event.title}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      {event.title}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default CalendarPage;
