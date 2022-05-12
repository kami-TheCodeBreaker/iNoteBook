import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props) => {
  const initialNotes = [
    {
      _id: "627d25a31de1d3d9066c7fdd",
      user: "627bfcd310f5114799817846",
      title: "updated12",
      description: "updated12",
      tag: "Tag",
      date: "2022-05-12T15:20:03.990Z",
      __v: 0,
    },
    {
      _id: "627d25a81de1d3d9066c7fe0",
      user: "627bfcd310f5114799817846",
      title: "updated11",
      description: "updated11",
      tag: "Tag",
      date: "2022-05-12T15:20:08.449Z",
      __v: 0,
    },
    {
      _id: "627d25ac1de1d3d9066c7fe3",
      user: "627bfcd310f5114799817846",
      title: "updated10",
      description: "updated10",
      tag: "Tag",
      date: "2022-05-12T15:20:12.714Z",
      __v: 0,
    },
  ];
  const [notes, setNotes] = useState(initialNotes);

  // Add a Note
  const addNote = (title, description, tags) => {
    // Todo Api call
    if (!tags) tags = "General"; // check if no tag then assign a tag
    const note = {
      _id: "627bfcd310f5114799817846sda",
      user: "627bfcd310f5114799817846",
      title: title,
      description: description,
      tag: tags,
      date: "2022-05-11T19:52:58.061Z",
      __v: 0,
    };
    setNotes(notes.concat(note));
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
    <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote,updateNote }}>
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
