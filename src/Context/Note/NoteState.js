import NoteContext from "./NoteContext";
import { useState } from "react";
import { toast } from "react-toastify";

const NoteState = (props) => {
  const defaultNote = {
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  };
  const checkToken = () => {
    const authToken = localStorage.getItem("auth-token");
    if (!authToken) {
      toast.warning("Login required");
      return false;
    }
    return authToken;
  };
  const [note, setNote] = useState(defaultNote);
  const [tags, setTags] = useState([]); //initially tags are set to empty []
  const [isExecuted, setIsExecuted] = useState(false)

  const [loading, setLoading] = useState(true);
  const host = "http://localhost:5000";
  const initialNotes = [];
  const [notes, setNotes] = useState(initialNotes);

  // fetch all notes
  const getAllNotes = async () => {
    const authToken = checkToken(); // check for auth-tokeen
    if (!authToken) return;
    try {
      const url = `${host}/api/notes/fetchallnotes`;
      const response = await fetch(url, {
        method: "Get",
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken,
        },
      });
      const json = await response.json();
      setNotes(json);
      setLoading(false);
    } catch (error) {
      toast.warning("error is", error.message);
    }
  };

  // Add a Note
  const addNote = async (title, description, tags) => {
    // to check whether user is registered or not
    const authToken = checkToken();
    if (!authToken) return;
    if (!tags) tags = "General"; // check if no tag then assign a tag
    // Api call
    try {
      const url = `${host}/api/notes/addnote`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken,
        },
        body: JSON.stringify({ title, description, tag: tags }),
      });
      const json = await response.json();
      if (response.status !== 200) return toast.warning(json.error);

      toast.success("Note Added Successfully");
      getAllNotes();
    } catch (error) {
      toast.warning("error is", error.message);
    }
  };
  // Delete a Note
  const deleteNote = async (id) => {
    // Api call
    try {
      const authToken = checkToken(); // check for auth-tokeen
      if (!authToken) return;

      const url = `${host}/api/notes/deletenote/${id}`;
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken,
        },
      });
      const json = await response.json();
      if (response.status !== 200) return toast.warning(json.error);
      toast.success("Note deleted Successfully ");
      getAllNotes();
    } catch (error) {
      toast.warning("error is", error.message);
    }
  };

  // Update  Note
  const updateExistingNote = async (id, title, description, tags) => {
    // Api call
    try {
      const authToken = checkToken(); // check for auth-tokeen
      if (!authToken) return;

      const url = `${host}/api/notes/updatenote/${id}`;
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken,
        },
        body: JSON.stringify({ title, description, tag: tags }),
      });
      const json = await response.json();
      if (response.status !== 200) return toast.warning(json.error);
      toast.success("Note Updated Successfully ");
      getAllNotes();
    } catch (error) {
      toast.warning("error is", error.message);
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
        note,
        tags,
        setTags,isExecuted,setIsExecuted
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
