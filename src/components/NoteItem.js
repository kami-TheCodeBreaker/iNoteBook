import React, { useContext } from "react";
import ReactTimeAgo from "react-time-ago";
import DisplayTags from "./DisplayTags";
import NoteContext from "../Context/Note/NoteContext";
const NoteItem = (props) => {
  const context = useContext(NoteContext);
  const { deleteNote } = context;
  return (
    <div
      className="card shadow-2xl rounded-md w-note-w px-2 py-2 my-9 font-ubuntu 	"
      style={{ position: "relative" }}
    >
      <div className="text px-2">
        <h1 className="text-2xl font-semibold my-3 w-image">{props.title}</h1>
        <p className="w-image my-3 ">{props.description}</p>
        <DisplayTags tags={props.tag.split(" ")} />
        <span>
          <span className=" text-md underline hover:text-blue-700 hover:cursor-pointer"></span>
          Added : <ReactTimeAgo date={new Date(props.date)} locale="en-US" />
        </span>
        <div className="icon flex gap-3 my-5">
          <i className="fa-solid fa-pen-to-square fa-lg hover:cursor-pointer"></i>
          <i
            className="fa-solid fa-trash-can fa-lg hover:cursor-pointer"
            onClick={() => {
              deleteNote(props.id);
            }}
          ></i>
        </div>
      </div>
    </div>
  );
};
export default NoteItem;
