import React from 'react'
import NoteItem from "./NoteItem";

function Note() {
  return (
    <div className="mt-32 w-4/6 mx-auto ">
      <h2 className="text-3xl font-semibold">Add a Note</h2>
      <form action="" className="my-5 flex flex-col gap-7">
        <div className="">
          <label htmlFor="title" className="text-2xl mb-3 inline-block">
            Title
          </label>
          <input
            className="w-full h-12 border-2 border-gray-500 rounded-md"
            type="text"
            name="title"
            id="title"
          />
        </div>
        <div className="">
          <label htmlFor="desc" className="text-2xl mb-3 inline-block">
            Description
          </label>
          <textarea
            className="w-full border-2 border-gray-500 rounded-md"
            name="desc"
            id="desc"
            cols="30"
            rows="10"
          ></textarea>
        </div>
        <div className="btn">
          <button className="bg-blue-700 py-3 px-7 rounded-md text-white text-xl">
            Submit
          </button>
        </div>
      </form>
      <div className="notes">
        <h2 className="text-3xl font-semibold flex justify-center">Your Notes</h2>
        <div className="notes-container flex gap-5 flex-wrap">
        <NoteItem/>
        <NoteItem/>
        <NoteItem/>
        <NoteItem/>
        <NoteItem/>
        <NoteItem/>
        </div>
      
      </div>
    </div>
  )
}

export default Note