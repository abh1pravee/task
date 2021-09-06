import fetch from 'isomorphic-unfetch'
import { useState, useEffect } from 'react'
import { Button, Form, Loader } from 'semantic-ui-react'
import { useRouter } from 'next/router'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";

export default function NewNote() {
  const [form, setForm] = useState({ title: '', description: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState({})
  const router = useRouter();

  useEffect(() => {
    if (isSubmitting) {
      if (Object.keys(errors).length === 0) {
        createNote()
      }
      else {
        setIsSubmitting(false)
      }
    }
  }, [errors])

  const createNote = async () => {
    try {
      // call api to add note to JSON
      const res = await fetch('/api/notes', {
          method: 'POST',
          headers: {
              "Accept": "application/json",
              "Content-Type": "application/json"
          },
          body: JSON.stringify(form)
      })
      // return back to home on success
      router.push("/")
    } catch (error) {
      console.log(error)
    }
  }

  /**
   * Function invoked on submit
   * @param {*} e 
   */
  const handleSubmit = (e) => {
    e.preventDefault()
    let errs = validate()
    setErrors(errs)
    setIsSubmitting(true)
  }

  /**
   * Handle input field changes and store data
   * @param {*} e 
   */
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  /**
   * Validate form data
   * @returns 
   */
  const validate = () => {
    let err = {}
    if (!form.title) {
      err.title = 'Title is required';
    }
    if (!form.description) {
      err.description = 'Description is required';
    }
    return err
  }

  return (
    <div className="form-container">
      <h1>Create Note</h1>
      <div>
        {
          isSubmitting
            ? <Loader active inline='centered' />
            : <Form onSubmit={handleSubmit}>
              <Form.Input
                error={errors.title ? { content: 'Please enter a title', pointing: 'below' } : null}
                label='Title'
                placeholder='Title'
                name='title'
                onChange={handleChange}
              />
              <Form.TextArea
                label='Descriprtion'
                placeholder='Description'
                name='description'
                error={errors.description ? { content: 'Please enter a description', pointing: 'below' } : null}
                onChange={handleChange}
              />
              <Button type='submit'>Create</Button>
            </Form>
        }
      </div>
    </div>
  )
}
