const express = require('express');
const User =require('../modules/User');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const authuser = require('../middleware/login_token');
// var token = jwt.sign({ token: 'thisidgnotetoken' } );
const JWT_SECRET = "thisidgnotetoken";  
// route 1 for create user
router.post('/api/auth',[
    body('Name', 'Name must be at least 3 characters long').isLength({ min: 3 }),
    body('Mail', 'Enter a valid email').isEmail(),
    body('Password', 'Password must be at least 5 characters long').isLength({ min: 5 })
  ], async(req, res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
    const { Name, Mail, Password } = req.body;
    const existingUser  = await User.findOne({Mail : req.body.Mail});
    
    if(existingUser ){
      return res.status(400).json({error :"user mail already exist"})
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(Password,salt)
    const newuser = new User({
        Name,
        Mail,
        Password:hashedPassword});
    await newuser.save();
    const key_token = {
      user:{
        id : newuser._id
      }
    }
    const success = true;
     const token = jwt.sign(key_token, JWT_SECRET);
    res.status(201).send({
      message: 'User saved successfully',
      success,
      // data: newuser
      token
    });
    }
    catch(err)  {
        console.log('Database error:', err);
        res.status(500).send({ message: 'Error saving user' });
      };
})

// route 2 for login user
router.post('/api/login',[
    body('Mail', 'Enter a valid email').isEmail(),
    body('Password', 'Password must be fill').exists()
  ], async(req, res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
    const {Mail, Password } = req.body;
    const existingUser  = await User.findOne({Mail : req.body.Mail});
    if(!existingUser ){
      return res.status(400).json({error :"User not found!"})
    }
    const pass_com = await bcrypt.compare(Password,existingUser.Password);
    const success = true;
    if(!pass_com){
      success = false;
      return res.status(400).json({error :"Password dose not match!"})
    }
    const key_token = {
      user:{
        id : existingUser._id
      }
    }
     const token = jwt.sign(key_token, JWT_SECRET);
    res.status(201).send({
      message: 'Verify',
      success,
      // data: newuser
      token
    });
    }
    catch(err)  {
        console.log('Database error:', err);
        res.status(500).send({ message: 'Error saving user' });
      };
})

//route 3 for get details
router.post('/api/getuser',authuser, async(req, res)=>{
      try {
      const userid = req.user.id;
      const user = await User.findById(userid).select("-Password");
        res.send(user);
      }
      catch(err)  {
          console.log('Database error:', err);
          res.status(500).send({ message: 'Error saving user' });
        };
})



module.exports = router;