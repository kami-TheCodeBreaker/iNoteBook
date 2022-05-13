import NoteContext from "./NoteContext";
import { useState } from "react";
import { toast } from "react-toastify";

const NoteState = (props) => {
  const [loading, setLoading] = useState(true);
  const host = "http://localhost:5000";
  const initialNotes = [];
  const [notes, setNotes] = useState(initialNotes);
  const getAllNotes = async () => {
    const url = `${host}/api/notes/fetchallnotes`;
    const response = await fetch(url, {
      method: "Get",
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI3YmZjZDMxMGY1MTE0Nzk5ODE3ODQ2In0sImlhdCI6MTY1MjI5MjgxOX0.Dp63sjlzLXKqdsDrx-o-i0aBXvrkAMum4RFRXQeZMV0",
      },
    });
    const json = await response.json();
    setNotes(json);
    setLoading(false);
  };

  // Add a Note
  const addNote = async (title, description, tags) => {
    if (!tags) tags = "General"; // check if no tag then assign a tag
    // Api call
    try {
      const url = `${host}/api/notes/addnote`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI3YmZjZDMxMGY1MTE0Nzk5ODE3ODQ2In0sImlhdCI6MTY1MjI5MjgxOX0.Dp63sjlzLXKqdsDrx-o-i0aBXvrkAMum4RFRXQeZMV0",
        },
        body: JSON.stringify({ title, description, tag: tags }),
      });
      const json = await response.json();
      if (response.status !== 200) return toast.warning(json.error);

      getAllNotes();
    } catch (error) {
      console.log("error is",error.message)
    }
  };
  // Delete a Note
  const deleteNote = (id) => {
    // Todo Api call
    const newNotes = notes.filter((note) => note._id !== id); // filter all notes where _id is not equal to params (id)
    setNotes(newNotes);
  };

  // Update a Note
  const updateNote = (id) => {
    // Todo Api call
  };

  return (
    <NoteContext.Provider
      value={{
        notes,
        setNotes,
        addNote,
        deleteNote,
        updateNote,
        getAllNotes,
        loading,
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
