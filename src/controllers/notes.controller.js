const Note = require('../models/Note');

exports.renderNotes = async (req, res) => {
  const notes = await Note.find({userId: req.user.id})
    .sort({createdAt: 'desc'})
    .lean();

  res.render('notes/all-notes', {notes});
};

exports.renderNoteForm = (req, res) => {
  res.render('notes/new-note');
};

exports.createNewNote = async (req, res, next) => {
  const {title, description} = req.body;
  const newNote = new Note({title, description});
  newNote.userId = req.user.id;

  await newNote.save();

  req.flash('success_msg', 'Note Added Succesfuly');

  res.redirect('/notes');
};

exports.renderEditForm = async (req, res) => {
  const {id} = req.params;
  const note = await Note.findById(id).lean();

  if (note.userId !== req.user.id) {
    req.flash('error_msg', 'Not Authorized.');

    res.redirect('/notes');
  }

  res.render('notes/edit-note', {note});
};

exports.updateNote = async (req, res) => {
  const {id} = req.params;
  const {title, description} = req.body;

  await Note.findByIdAndUpdate(id, {title, description});

  req.flash('success_msg', 'Note Updated Succesfuly');
  res.redirect('/notes');
};

exports.deleteNote = async (req, res) => {
  console.log(req.params);
  const {id} = req.params;
  await Note.findByIdAndDelete(id);

  req.flash('success_msg', 'Note Deleted Succesfuly');
  res.redirect('/notes');
};
