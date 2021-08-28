import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Confirm, Button, Loader } from 'semantic-ui-react'

import { getSingleNote } from "../../models/Note"

export default function Note(props) {
    const { note } = props;
    const [confirm, setConfirm] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const router = useRouter()

    useEffect(() => {
        if (isDeleting) {
            deleteNote()
        }
    }, [isDeleting])

    const open = () => setConfirm(true)

    const close = () => setConfirm(false)

    const deleteNote = async () => {
        const noteId = router.query.id
        try {
        } catch (error) {
            console.log(error)
        }
    }

    const handleDelete = async () => {
        setIsDeleting(true)
        close()
    }

    return (
        <div className="note-container">
            {isDeleting
                ? <Loader active />
                :
                <>
                    <h1>{note.title}</h1>
                    <p>{note.description}</p>
                    <Button color='red' onClick={open}>Delete</Button>
                </>
            }
            <Confirm
                open={confirm}
                onCancel={close}
                onConfirm={handleDelete}
            />
        </div>
    )
}
  
export async function getServerSideProps(context) {
  const { id } = context.query;
  let noteData = await getSingleNote(id);
  return {
    props: { note: noteData },
  };
}
