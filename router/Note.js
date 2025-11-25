const express = require('express');
const Note =require('../modules/Note');
const router = express.Router();
const authuser = require('../middleware/login_token');
const { body, validationResult } = require('express-validator');
const user = require('../modules/User');
// route 1 fetch note
router.get('/fetchnote',authuser, async(req, res)=>{
    try {
    const note = await Note.find({ User_id: req.user.id });
    res.json(note)
    } catch (error) {
        console.log('Database error:', err);
        res.status(500).send({ message: 'Error saving user' });
    }
})

//route 2 insert note
router.post('/newnote', authuser,[
    body('Title', 'Title must be at least 3 characters long').isLength({ min: 3 }),
    body('Description', 'Description must be at least 5 characters long').isLength({ min: 5 })
  ], async(req, res)=>{
    const { Title , Description , Tag } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
    const newnote = new Note({
        Title,Description,Tag,User_id : req.user.id
    })
    const savenote = await newnote.save();
    res.json(savenote); 
    }
    catch(err)  {
        console.log('Database error:', err);
        res.status(500).send({ message: 'Error saving note' });
      };
})

// route 3 update note
router.put('/updnote/:id', authuser, async(req, res)=>{
    const { Title , Description , Tag } = req.body;
    const  newnote = {};
    if(Title){newnote.Title = Title}
    if(Description){newnote.Description = Description}
    if(Tag){newnote.Tag = Tag}
    // console.log("Received ID:", req.params.id);

    let note = await Note.findById(req.params.id);
    if(!note){
      return res.status(404).send("not found")
    }
    if (note.User_id.toString() !== req.user.id) {
      return res.status(401).send("Not allowed");
    }
    note = await Note.findByIdAndUpdate(req.params.id,{$set:newnote})
    res.json({newnote})
})

// route 4 delete note
router.delete('/delnote/:id', authuser, async(req, res)=>{
    let note = await Note.findById(req.params.id);
    if(!note){
      return res.status(404).send("not found")
    }
    if (note.User_id.toString() !== req.user.id) {
      return res.status(401).send("Not allowed");
    }
    note = await Note.findByIdAndDelete(req.params.id)
    res.json({"massage":"note is delete"})
})

module.exports = router;
