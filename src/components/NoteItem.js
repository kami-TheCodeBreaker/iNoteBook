import React, { useContext, useRef, useState } from "react";
import ReactTimeAgo from "react-time-ago";
import DisplayTags from "./DisplayTags";
import NoteContext from "../Context/Note/NoteContext";
import { TagsInput } from "react-tag-input-component";
const NoteItem = (props) => {
  const [tags, setTags] = useState([]); //initially tags are set to empty []
  const ref = useRef(null); // use ref to click on the modal show button
  const closeRef = useRef(null); // use ref to click on the modal show button
  const context = useContext(NoteContext);
  const { deleteNote, setNote, note, updateExistingNote } = context;

  const updateNote = (currentNote) => {
    // craete a newNote from the Existing note
    let newNote = {
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    };
    setNote(newNote); // update the state of the note 
    ref.current.click(); // to click on the modal show button
  };

  const handleClick = (e) => {
    const tagsData = tags.join(", "); // join the tags array with a comma
    updateExistingNote(note.id, note.etitle, note.edescription, tagsData);
    ref.current.click(); // to click on the modal close button
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value }); // to change input of modal because we set a value property on those inputs
  };
  return (
    <>
      <div
        className="card shadow-2xl rounded-md w-note-w px-2 py-2 my-9 font-ubuntu 	"
        style={{ position: "relative" }}
      >
        <div className="text px-2">
          <h1 className="text-2xl font-semibold my-3 w-image">
            {props.note.title}
          </h1>
          <p className="w-image my-3 ">{props.note.description}</p>
          {/* displying Already entered tags of the user */}
          <DisplayTags tags={props.note.tag.split(",")} /> 
          <span className="mt-3 inline-block">
            <span className="space-x-3">
              {/* to show time in the formate of (2 hour ago) */}
              Added :
              <ReactTimeAgo date={new Date(props.note.date)} locale="en-US" /> 
            </span>
          </span>
          <div className="icon flex gap-3 my-5">
            <i
              className="fa-solid fa-pen-to-square fa-lg hover:cursor-pointer" // attached onclick function and call updateNote function with the note to be updated
              onClick={() => {
                updateNote(props.note);
              }}
            ></i>
            <i
              className="fa-solid fa-trash-can fa-lg hover:cursor-pointer"
              // attached onclick function and call deleteNote function with the note to be deleted
              onClick={() => {
                deleteNote(props.note._id);
              }}
            ></i>
          </div>
        </div>
      </div>

      {/* // modal for editing note 
      <!-- Button trigger modal --> */}
      <button
        className="hidden"
        ref={ref}
        type="button"
        data-bs-toggle="modal"
        data-bs-target="#exampleModalCenter"
      >
        Edit Modal
      </button>

      {/* <!-- Edit Modal --> */}
      <div
        className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
        id="exampleModalCenter"
        tabIndex="-1"
        aria-labelledby="exampleModalCenterTitle"
        aria-modal="true"
        role="dialog"
      >
        <div className="modal-dialog modal-dialog-centered relative w-auto pointer-events-none">
          <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
            <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
              <h5
                className="text-xl font-medium leading-normal text-gray-800"
                id="exampleModalScrollableLabel"
              >
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body relative p-4">
              <form action="" className="my-5 flex flex-col gap-5">
                <div className="">
                  <label htmlFor="title" className="text-2xl mb-2 inline-block">
                    Title
                  </label>
                  <input
                    className="w-full h-12 border-2 border-gray-500 rounded-md px-3 py-3"
                    type="text"
                    name="etitle"
                    id="etitle"
                    value={note.etitle} // to show the existing title of the user
                    onChange={onChange}
                  />
                </div>
                <div className="">
                  <label htmlFor="desc" className="text-2xl mb-2 inline-block">
                    Description
                  </label>
                  <textarea
                    className="w-full border-2 border-gray-500 rounded-md px-3 py-3"
                    name="edescription"
                    id="edescription"
                    cols="30"
                    rows="5"
                    value={note.edescription}// to show the existing description of the user
                    onChange={onChange}
                  ></textarea>
                </div>
                {/* check for tags  */}
                <h1 className="text-2xl font-semibold">
                  {note.etag.split(",").length > 0
                    ? "Previous Tags Are : "
                    : ""}
                </h1>
                    {/* Render All the tags user entered */}
                <DisplayTags tags={note.etag.split(",")} />
                <TagsInput
                  onChange={setTags} 
                  name="tags"
                  placeHolder="Enter Tags"
                />
                <h1 className="text-1xl font-semibold">
                  Press Enter to save Tag
                </h1>
              </form>
            </div>
            <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
              {/* button to close the modal */}
              <button
                type="button"
                className="inline-block px-6 py-2.5 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
                data-bs-dismiss="modal"
                ref={closeRef} 
              >
                Close
              </button>
              {/* button to update note but will be clicked with the ref.current.click() from the handClick function*/}
              <button
                type="button"
                className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1"
                onClick={handleClick}
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default NoteItem;
