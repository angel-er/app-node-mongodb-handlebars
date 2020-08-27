const {Router} = require('express');
const router = Router();

const {isAuthenticated} = require('../helpers/auth');
const {NotesController} = require('../controllers');

module.exports = (() => {
  // GET All Notes
  router.get('/', isAuthenticated, NotesController.renderNotes);

  // New Note
  router.get('/add', isAuthenticated, NotesController.renderNoteForm);
  router.post('/new-note', isAuthenticated, NotesController.createNewNote);

  // Edit Notes
  router.get('/edit/:id', isAuthenticated, NotesController.renderEditForm);
  router.put('/edit/:id', isAuthenticated, NotesController.updateNote);

  // Delete Notes
  router.delete('/delete/:id', isAuthenticated, NotesController.deleteNote);

  return router;
})();
