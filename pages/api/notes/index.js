import { addNotes } from '../../../models/Note'

export default async (req, res) => {
  const { method } = req
  if (method == 'POST') {
    try {
      let allnNotes = await addNotes(req.body);
      return res.status(201).json({ success: true, data: allnNotes });
    } catch (err) {
      return res.status(400).json({ success: false })
    }
  }
  res.status(400).json({ success: false })
}