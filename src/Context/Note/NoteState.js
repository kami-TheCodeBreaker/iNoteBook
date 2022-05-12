import NoteContext from "./NoteContext";
import { useState } from "react";
const NoteState = (props) => {
  const initialNotes = [
    {
      _id: "627c141afa773ea4a0c5df21",
      user: "627bfcd310f5114799817846",
      title: "Title",
      description: "Description",
      tag: "Tag",
      date: "2022-05-11T19:52:58.061Z",
      __v: 0,
    },
    {
      _id: "627d259b1de1d3d9066c7fd7",
      user: "627bfcd310f5114799817846",
      title: "updated2",
      description: "updated2",
      tag: "Tag",
      date: "2022-05-12T15:19:55.357Z",
      __v: 0,
    },
    {
      _id: "627d259e1de1d3d9066c7fda",
      user: "627bfcd310f5114799817846",
      title: "updated1",
      description: "updated1",
      tag: "Tag",
      date: "2022-05-12T15:19:58.891Z",
      __v: 0,
    },
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

  <NoteContext.Provider value={{ notes, setNotes }}>
    {props.children}
  </NoteContext.Provider>;
};

export default NoteState;
