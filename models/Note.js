const editJsonFile = require("edit-json-file");
let file = editJsonFile(`./models/data.json`,{
  autosave: true
});

export const getNotes = async () => {
  let noteObj = file.get();
  let notes = Object.values(noteObj);
  return notes
}

export const getSingleNote = async (id) => {
  let allNotes = await getNotes();
  let noteData = allNotes.filter( x=> {return x._id === parseInt(id)})||{};
  return noteData && noteData.length > 0 ? noteData[0] : {}
}

export const addNotes = async (data) => {
  let allNotes = await getNotes();
  let lastNoteId = allNotes.length||0;
  data['_id'] = lastNoteId;
  file.set(lastNoteId.toString(), data);
  return await getNotes();
}