import React from 'react'
import { EditText, EditTextarea } from 'react-edit-text'
import 'react-edit-text/dist/index.css'
import { noteData } from "../models/Note"
const App = () => {
    return (
        <React.Fragment>
            <EditText
            name="textbox1"
            defaultValue="Click me to edit my text"
            />
           
        </React.Fragment>
    );
}