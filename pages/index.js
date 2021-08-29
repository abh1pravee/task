import Link from 'next/link'
import { Button, Card } from 'semantic-ui-react'

import { getNotes } from "../models/Note"

export default function Index (props) {
  const { notes } = props;
  return (
    <div className='notes-Container'>
      <h1>Notes</h1>
      <div className='grid wrapper'>
        {notes.map( note => {
          return (
            <div key={note._id}>
              <Card>
                <Card.Content>
                  <Card.Header>
                    <Link href={`/${note._id}`}>
                      <a>{note.title}</a>
                    </Link>
                  </Card.Header>
                </Card.Content>
                <Card.Content extra>
                  <Link href={`/${note._id}`}>
                    <Button primary>View</Button>
                  </Link>
                </Card.Content>
              </Card>
            </div>
          )
        })}
      </div>
    </div> 
  )
}

export async function getServerSideProps() {
  // get all note details from the JSON file
  let allNotes = await getNotes();
  return {
    props: { notes: allNotes },
  };
}
