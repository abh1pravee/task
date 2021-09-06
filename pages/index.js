import Link from 'next/link'
import { Button, Card } from 'semantic-ui-react'
import { Popup } from 'semantic-ui-react'
import { getNotes } from "../models/Note"
export default function Index (props) {
  const { notes } = props;
  function myFunction() {
    document.getElementById("note._id").style.color = "#ff0000";
  
  }
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
                  <Popup
                    content={<div class="ui vertical pointing menu">
                    <a class="item">
                    <button class="ui red basic button" onclick="myFunction()">Red</button>
                    </a>
                    <a class="item">
                    <button class="ui blue basic button">Blue</button>
                    </a>
                    <a class="item">
                    <button class="ui green basic button">Green</button>
                    </a>
                    <a class="item">
                    <button 
                      
                      pinned
                      class="negative ui button">Cancel
                    </button>
                    </a>
                  </div>}
                    on ='click'
                    pinned
                    trigger={<Button content='Button'/>, <button class="ui grey basic button"> Choose Color</button>}   
                  />
                    <Link href={`/${note._id}`}>
                      <Button secondary>Edit</Button> 
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
