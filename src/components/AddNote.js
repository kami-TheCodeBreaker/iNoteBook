import React, { useContext, useState } from "react";
import NoteContext from "../Context/Note/NoteContext";
import { TagsInput } from "react-tag-input-component";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DisplayTags from "./DisplayTags";

function AddNote() {
  const [tags, setTags] = useState([]); //initially tags are set to empty []

  //Using the NoteContext to add notes using addNote method available in NoteState
  const context = useContext(NoteContext);
  
  // By default it will be the initial note defined in the notestatte
  const { addNote,note,setNote} = context;

  //handling Add Note click
  const onClicHandler = (e) => {
    e.preventDefault();
    const tagsData = tags.join(", "); // create a string from tags array and joined with (comma ,)
    addNote(note.title, note.description, tagsData);
  };

  //handling change when occur in title or in description
  const onChangeHandler = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  // display a toast when a tag already exist
  const tagExist = (tag) => {
    toast.warning(`${tag} Tag already exist`);
  };

  // display a toast when a tag removed
  const tagRemoved = (tag) => {
    toast.warning(`${tag} Tag removed`);
  };
  return (
    <>
      {/* Rendering a form to add note  */}
      <h2 className="text-3xl font-semibold mt-14 inline-block">Add a Note</h2>
      <form action="" className="my-5 flex flex-col gap-5">
        <div className="">
          <label htmlFor="title" className="text-2xl mb-2 inline-block">
            Title
          </label>
          <input
            className="w-full h-12 border-2 border-gray-500 rounded-md px-3 py-3"
            type="text"
            name="title"
            id="title"
            onChange={onChangeHandler}
          />
        </div>
        <div className="">
          <label htmlFor="desc" className="text-2xl mb-2 inline-block">
            Description
          </label>
          <textarea
            className="w-full border-2 border-gray-500 rounded-md px-3 py-3"
            name="description"
            id="desc"
            cols="30"
            rows="5"
            onChange={onChangeHandler}
          ></textarea>
        </div>
        <h1 className="text-2xl font-semibold">

          {/* Render All the tags user entered */}
          {tags.length > 0 ? "Entered Tags Are : " : ""}
        </h1>
        <DisplayTags tags={tags} />

        {/* use npm package for user input tags */}
        <div className="tag-input border-2 border-gray-500 rounded-md px-3 py-3">
          <TagsInput
            onChange={setTags}
            name="tags"
            onExisting={tagExist}
            onRemoved={tagRemoved}
            placeHolder="Enter Tags"
          />
        </div>
        <h1 className="text-1xl font-semibold">Press Enter to save Tag</h1>

        <div className="btn flex justify-center md:justify-start">
          <button
            className="bg-blue-700 py-3 px-7 rounded-md text-white text-xl outline-0 hover:bg-blue-900"
            onClick={onClicHandler}
            type="button"
          >
            Add Note
          </button>
        </div>
      </form>
    </>
  );
}

export default AddNote;
