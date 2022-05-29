const path = require("path");
const router = require("express").Router();
const fs = require('fs');
const notes = require('../../db/db');

router.get('/notes', (req,res) => res.json(notes));

// Post Route to add a new note to the database
router.post('/notes', (req,res) => {
  // get new note and push to note array
  let newNote = req.body;
  notes.push(newNote);

  // write to database file
  fs.writeFile(path.join(__dirname,'../../db/db.json'), JSON.stringify(notes), err => {
    if(err) throw err;
    console.log('Note saved');
  })
  res.send("Note saved");
})

module.exports = router;