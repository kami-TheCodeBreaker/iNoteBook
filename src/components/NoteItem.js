import React, { useContext } from "react";
import ReactTimeAgo from "react-time-ago";
import DisplayTags from "./DisplayTags";
import NoteContext from "../Context/Note/NoteContext";
const NoteItem = (props) => {
  const context = useContext(NoteContext);
  const { deleteNote } = context;
  return (
    <>
      {/* <!-- Default Modal --> */}

      <div
        id="medium-modal"
        tabIndex="-1"
        className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full"
      >
        <div className="relative p-4 w-full max-w-lg h-full md:h-auto">
          {/* <!-- Modal content --> */}
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            {/* <!-- Modal header --> */}

            {/* <!-- Modal body --> */}
            <div className="p-6 space-y-6">
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                With less than a month to go before the European Union enacts
                new consumer privacy laws for its citizens, companies around the
                world are updating their terms of service agreements to comply.
              </p>
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                The European Union’s General Data Protection Regulation
                (G.D.P.R.) goes into effect on May 25 and is meant to ensure a
                common set of data rights in the European Union. It requires
                organizations to notify users as soon as possible of high-risk
                data breaches that could personally affect them.
              </p>
            </div>
            {/* <!-- Modal footer --> */}
            <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
              <button
                data-modal-toggle="medium-modal"
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                I accept
              </button>
              <button
                data-modal-toggle="medium-modal"
                type="button"
                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              >
                Decline
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="card shadow-2xl rounded-md w-note-w px-2 py-2 my-9 font-ubuntu 	"
        style={{ position: "relative" }}
      >
        <div className="text px-2">
          <h1 className="text-2xl font-semibold my-3 w-image">
            {props.note.title}
          </h1>
          <p className="w-image my-3 ">{props.note.description}</p>
          <DisplayTags tags={props.note.tag.split(",")} />
          <span className="mt-3 inline-block">
            <span className="space-x-3">
              Added :{" "}
              <ReactTimeAgo date={new Date(props.note.date)} locale="en-US" />
            </span>
          </span>
          <div className="icon flex gap-3 my-5">
            <i
              className="fa-solid fa-pen-to-square fa-lg hover:cursor-pointer"
              onClick={() => {
                props.noteUpdate(props.note);
              }}
            ></i>
            <i
              className="fa-solid fa-trash-can fa-lg hover:cursor-pointer"
              onClick={() => {
                deleteNote(props.note._id);
              }}
            ></i>
          </div>
        </div>
      </div>
      <button
        className="block w-full md:w-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
        data-modal-toggle="medium-modal"
      >
        Default modal
      </button>
    </>
  );
};
export default NoteItem;
