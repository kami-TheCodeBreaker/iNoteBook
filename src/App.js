import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import NoteState from "./Context/Note/NoteState";
import { ToastContainer } from 'react-toastify';
import Footer from "./components/Footer";
import Login from "./components/Login";
import Signup from "./components/Signup";
function App() {
  return (
    <>
      <NoteState>
        <Router>
          <Navbar title="iNoteBook" />
          <ToastContainer autoClose={2000}/>
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route exact path="/about" element={<About />}></Route>
            <Route exact path="/contact" element={<Contact />}></Route>
            <Route exact path="/login" element={<Login/>}></Route>
            <Route exact path="/signup" element={<Signup/>}></Route>
          </Routes>
        </Router>
        <Footer/>
      </NoteState>
    </>
  );
}

export default App;
