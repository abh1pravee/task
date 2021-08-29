import { addNotes } from '../../../models/Note'

export default async (req, res) => {
  const { method } = req
  // check if request type is post
  if (method == 'POST') {
    try {
      // call add note to add note to json
      let allnNotes = await addNotes(req.body);
      // return success response
      return res.status(201).json({ success: true, data: allnNotes });
    } catch (err) {
      // catch error and return error
      return res.status(400).json({ success: false })
    }
  }
  // default return
  res.status(400).json({ success: false })
}