import React, { useContext, useEffect } from "react";
import NoteContext from "../Context/Note/NoteContext";
import AddNote from "./AddNote";
import NoteItem from "./NoteItem";
import SpinLoader from "./SpinLoader";
import { useNavigate } from "react-router-dom";

function Note() {
  const navigate = useNavigate();
  const context = useContext(NoteContext);
  const { notes, getAllNotes, loading} = context;
  useEffect(() => {
    if (localStorage.getItem("auth-token")) {
      getAllNotes();
    } else {
      navigate("/login");
    }

    //eslint-disable-next-line
  }, []);
  return (
    <div className="mt-20 w-4/6 mx-auto ">
      <AddNote />
      {loading && <SpinLoader />}
      {loading || (
        <div className="notes ">
          <h2 className="text-3xl font-semibold flex justify-center mt-20 mb-20">
            {notes.length > 0 ? "Your Notes" : "Add your First Note"}
          </h2>

          <div className="notes-container  justify-center sm:justify-center  md:justify-center lg:justify-start flex gap-11 flex-wrap ">
            {notes.map((note) => {
              return <NoteItem key={note._id} note={note} />;
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default Note;
