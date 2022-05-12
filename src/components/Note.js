import React, { useContext } from "react";
import NoteContext from "../Context/Note/NoteContext";
import AddNote from "./AddNote";
import NoteItem from "./NoteItem";
function Note() {
  const context = useContext(NoteContext);
  const { notes } = context;
  return (
    <div className="mt-20 w-4/6 mx-auto ">
      <AddNote />
      <div className="notes ">
        <h2 className="text-3xl font-semibold flex justify-center mt-20 mb-20">
          {notes.length > 0 ? "Your Notes" : "Add your First Note"}
        </h2>

        <div className="notes-container flex gap-11 flex-wrap justify-center">
          {notes.map((note) => {
            const { _id, title, description, date, tag } = note;
            return (
              <NoteItem
                key={_id}
                id={_id}
                title={title}
                description={description}
                date={date}
                tag={tag}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Note;
