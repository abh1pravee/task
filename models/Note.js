const editJsonFile = require("edit-json-file");
let file = editJsonFile(`./models/data.json`,{
  autosave: true
});

/**
 * Get notes from the json file
 * @returns 
 */
export const getNotes = async () => {
  let noteObj = file.get();
  let notes = Object.values(noteObj);
  return notes
}

/**
 * Get all the notes fron the JSON and return the note 
 * based on the ID
 * @param {*} id 
 * @returns 
 */
export const getSingleNote = async (id) => {
  let allNotes = await getNotes();
  let noteData = allNotes.filter( x=> {return x._id === parseInt(id)})||{};
  return noteData && noteData.length > 0 ? noteData[0] : {}
}

/**
 * Function to add new note
 * @param {*} data 
 * @returns 
 */
export const addNotes = async (data) => {
  let allNotes = await getNotes();
  let lastNoteId = allNotes.length||0;
  data['_id'] = lastNoteId;
  file.set(lastNoteId.toString(), data);
  return await getNotes();
}