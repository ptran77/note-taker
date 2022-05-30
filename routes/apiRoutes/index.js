const path = require("path");
const router = require("express").Router();
const fs = require('fs');
const uuid = require('uuid');

// function to get notes
const getNotes = () => {
  const notes = fs.readFileSync(path.join(__dirname,'../../db/db.json'), {'encoding': 'utf8'});
  return JSON.parse(notes);
}

// function to write to file
const writeToFile = (fileName, data) => {
  fs.writeFile(fileName, data, (err) => {
    if(err) throw err;
  })
}

// Get route to get the notes
router.get('/notes', (req,res) => res.json(getNotes()));

// Post route to add a new note to the database
router.post('/notes', (req,res) => {

  // get new note and push to note array
  let newNote = req.body;
  // add unique id
  newNote.id = uuid.v4();

  // get notes database and add new note to it
  const notes = getNotes();
  notes.push(newNote);

  // write to database file
  writeToFile(path.join(__dirname,'../../db/db.json'), JSON.stringify(notes));
  res.send("Note saved");
})

// Delete route to delete a specifc note
router.delete(`/notes/:id`, (req,res) =>  {
  // get notes from database
  const notes = getNotes();
  // filter the notes to remove note with the specify id
  newNotes = notes.filter(note => note.id != req.params.id);
  // write to database file
  writeToFile(path.join(__dirname,'../../db/db.json'), JSON.stringify(newNotes));
  res.send("Note deleted");
})

module.exports = router;