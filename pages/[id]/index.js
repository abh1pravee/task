import { getSingleNote } from "../../models/Note"

export default function Note(props) {
  const { note } = props;

  return (
    <div className="note-container">
      <h1>{note.title}</h1>
      <p>{note.description}</p>
    </div>
  )
}
  
export async function getServerSideProps(context) {
  // get note id from the URL
  const { id } = context.query;
  // get note based on the ID
  let noteData = await getSingleNote(id);
  return {
    props: { note: noteData },
  };
}
