const router = require('express').Router();
const { readFromFile, readAndAppend, deleteNote } = require('../helpers/readWrite');
const uuid = require('../helpers/uuid');


// GET "/api/notes" responds with all notes from the database
router.get('/notes', (req, res) => {
  console.info(`${req.method} request received for notes`);

  readFromFile('./db/db.json').then((notes) => res.json(JSON.parse(notes)));
});

// post adds notes to the db.json file 
router.post('/notes', (req, res) => {
  // Log that a POST request was received
  console.info(`${req.method} request received to submit a new note`);

  // Destructuring assignment for the items in req.body
  const { title, text } = req.body;

  // If all the required properties are present
  if (title && text) {
      // Variable for the object we will save
      const newNote = {
          title,
          text,
          id: uuid(),
      };

      readAndAppend(newNote, './db/db.json');

      const response = {
          status: 'success',
          body: newNote,
      };

      res.json(response);
  } else {
      res.json('Error in saving note');
  }
});

// delete path
router.delete('/notes/:id', (req, res) =>{

  console.info(`${req.method} request recieved to delete note`);
  
  deleteNote(req.params.id, './db/db.json');

  res.json({ok: true })

})


module.exports = router;
