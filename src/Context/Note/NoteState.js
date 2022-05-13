import NoteContext from "./NoteContext";
import { useState } from "react";
import { toast } from "react-toastify";

const NoteState = (props) => {
  const defaultNote = {
    id:"",
    etitle: "default",
    edescription: "default",
    etag: "default",
  };
  const [note, setNote] = useState(defaultNote);
  const [tags, setTags] = useState([]); //initially tags are set to empty []

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

      toast.success("Note Added Successfully");
      getAllNotes();
    } catch (error) {
      console.log("error is", error.message);
    }
  };
  // Delete a Note
  const deleteNote = async (id) => {
    // Api call
    try {
      const url = `${host}/api/notes/deletenote/${id}`;
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI3YmZjZDMxMGY1MTE0Nzk5ODE3ODQ2In0sImlhdCI6MTY1MjI5MjgxOX0.Dp63sjlzLXKqdsDrx-o-i0aBXvrkAMum4RFRXQeZMV0",
        },
      });
      const json = await response.json();
      if (response.status !== 200) return toast.warning(json.error);
      toast.success("Note deleted Successfully ");
      getAllNotes();
    } catch (error) {
      console.log("error is", error.message);
    }
  };

  // Update  Note
  const updateExistingNote = async (id,title, description, tags) => {
    // Api call 
    try {
      const url = `${host}/api/notes/updatenote/${id}`;
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI3YmZjZDMxMGY1MTE0Nzk5ODE3ODQ2In0sImlhdCI6MTY1MjI5MjgxOX0.Dp63sjlzLXKqdsDrx-o-i0aBXvrkAMum4RFRXQeZMV0",
        },
        body: JSON.stringify({ title, description, tag: tags }),
      });
      const json = await response.json();
      if (response.status !== 200) return toast.warning(json.error);
      toast.success("Note Updated Successfully ");
      getAllNotes();
    } catch (error) {
      console.log("error is", error.message);
    }
  };
  return (
    <NoteContext.Provider
      value={{
        notes,
        setNotes,
        addNote,
        deleteNote,
        updateExistingNote,
        getAllNotes,
        loading,
        setNote,
        note,tags,setTags
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
