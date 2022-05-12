import NoteContext from "./noteContext";
import { useState } from "react";
const NoteState = (props) => {
  const s1 = {
    name: "iNoteBook1",
    age: "xyz",
  };
  const [state, setState] = useState(s1)
  const updateState=(name,age)=>{
    setState({name,age})
  }
  return (
    <NoteContext.Provider value={{state,updateState}}>{props.children}</NoteContext.Provider>
  );
};

export default NoteState;