import React from "react";
const NoteItem = () => {
  return (
    <div
      className="card shadow-2xl rounded-md w-note-w px-2 py-2 my-9 font-ubuntu 	"
      style={{ position: "relative" }}
    >
      <div className="text px-2">
        <h1 className="text-2xl font-semibold my-3 w-image">
          Lorem, ipsum dolor.
        </h1>
        <p className="w-image my-3 ">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minima vitae
          magnam alias magni ipsa quo harum. Corporis modi eos fugiat, atque
          blanditiis voluptatum amet nemo consequuntur a natus reprehenderit
          consequatur.
        </p>
        <span>
          <span className=" text-md underline hover:text-blue-700 hover:cursor-pointer"></span>
          3 hours ago
        </span>
        <div className="icon flex gap-3 my-5">
          <i className="fa-solid fa-pen-to-square fa-lg hover:cursor-pointer"></i>
          <i className="fa-solid fa-delete-left fa-lg hover:cursor-pointer"></i>
        </div>
      </div>
    </div>
  );
};
export default NoteItem;
