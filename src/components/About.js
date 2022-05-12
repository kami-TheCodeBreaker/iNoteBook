import React, { useContext, useEffect } from "react";
import noteContext from "../Context/Notes/noteContext";

function About() {
  const data = useContext(noteContext);
  useEffect(() => {
    data.updateState("new name","new age")
  }, [])
  
  return <div className="my-52">About component name : {data.state.name} and age : {data.state.age}</div>;
}
export default About;
