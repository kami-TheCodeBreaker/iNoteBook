const express = require("express");
const fetchuserdata = require("../middleware/fetchuserdata");
const Note = require("../models/Note");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const mongoose = require("mongoose");

// Route 1: Get all Notes of logedin user with Get"/api/notes/fetchallnotes" -  login required
router.get("/fetchallnotes", fetchuserdata, async (req, res) => {
  try {
    const notes = await Note.find({
      user: req.user.id,
    });
    res.send(notes);
  } catch (error) {
    // if something went wrong so seting status code and sending error messages as json resoponse
    res.status(500);
    res.json({
      msg: error.message, // contain error message
    });
  }
});

// Route 2: Add Note to database with Post"/api/notes/addnote" -  login required
router.post(
  "/addnote",
  [
    body("title")
      .isLength({ min: 5 })
      .withMessage("Title should be atleast 5 character long"),
    body("description")
      .isLength({ min: 5 })
      .withMessage("Description should be atleast 5 character long"),
  ],
  fetchuserdata,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { title, description, tag } = req.body;
      const checkSameNote = async (title, description) => {
        const note = await Note.findOne({ title, description ,user:req.user.id});
        return note ? true : false;
      };
      const noteExist = await checkSameNote(title, description);
      if (noteExist)
        return res.status(400).json({
          error: "Note with same title and description already exist ",
        });
      const note = new Note({ title, description, tag, user: req.user.id });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      // if something went wrong so seting status code and sending error messages as json resoponse
      res.status(500);
      res.json({
        msg: error.message, // contain error message
      });
    }
  }
);

// Route 3: Update Note in database with Put"/api/notes/updatenote/:id" -  login required
router.put(
  "/updatenote/:id",
  fetchuserdata,
  [
    body("title").trim()
      .isLength({ min: 5 })
      .withMessage("Title should be atleast 5 characters long"),
    body("description").trim()
      .isLength({ min: 5 })
      .withMessage("Description should be atleast 5 characters long"),
    body("tag").trim().isLength({ min: 3 }).withMessage("Tag should be atleast 3 characters long"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // get title,description,tag from request
    const { title, description, tag } = req.body;
    // create an empty note then check if any data exist so add in that object
    let updatedNote = {};
    if (title) updatedNote.title = title;
    if (description) updatedNote.description = description;
    if (tag) updatedNote.tag = tag;
    try {
      // Get id from request params
      const id = req.params.id;

      // Now check if id is valid ObjectId or not otherwise it will throw error
      if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).json({ error: "Note Not found " }); // If id is not valid ObjectId then send error as json response

      // If id is valid ObjectId then Find note and update it
      const note = await Note.findById(id);
      if(!note) return res.status(404).json({ error: "Note Not found " }); // If id is not valid ObjectId then send error as json response

      //Now check whether user is updating his own notes
      if (req.user.id != note.user.toString())
        // if user try to update notes of others then send an error as json response
        return res.status(401).json({ error: "Not valid" });

      // If user is updating his own notes then update it
      await Note.findByIdAndUpdate(req.params.id, { $set: updatedNote });

      res.json({
        msg: "Note updated Successfully",
        note: updatedNote,
      });
    } catch (error) {
      // if something went wrong so seting status code and sending error messages as json resoponse
      res.status(500);
      res.json({
        msg: error.message, // contain error message
      });
    }
  }
);

// Route 4: Delete Note from database with Delete"/api/notes/deletenote/:id" -  login required
router.delete(
  "/deletenote/:id",
  fetchuserdata,
  async (req, res) => {
    try {
      // Get id from request params
      const id = req.params.id;
      // Now check if id is valid ObjectId or not otherwise it will throw error
      if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).json({ error: "Note Not found" }); // If id is not valid ObjectId then send error as json response

      // If id is valid ObjectId then Find note and update it
      let note = await Note.findById(id);
      
      if(!note) return res.status(404).json({ error: "Note Not found" }); // If note is not found send error as json response

      //Now check whether user is updating his own notes
      if (req.user.id != note.user.toString())
        // if user try to update notes of others then send an error as json response
        return res.status(401).json({ error: "Not valid" });

      // If user is updating his own notes then update it
      note=await Note.findByIdAndDelete(req.params.id);

      res.json({
        msg: "Note deleted Successfully",
        note: note,
      });
    } catch (error) {
      // if something went wrong so seting status code and sending error messages as json resoponse
      res.status(500);
      res.json({
        msg: error.message, // contain error message
      });
    }
  }
);

module.exports = router;
