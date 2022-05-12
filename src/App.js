import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import NoteState from "./Context/Notes/NoteState";
function App() {
  return (
    <>
      <NoteState>
        <Router>
          <Navbar title="iNoteBook" />
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route exact path="/about" element={<About />}></Route>
            <Route exact path="/contact" element={<Contact />}></Route>
          </Routes>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
