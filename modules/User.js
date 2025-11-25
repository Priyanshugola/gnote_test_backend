const mongoose = require('mongoose');
const {Schema} = mongoose
const User = new Schema({
 Name :{
    type : String,
    required  :true
  },
  Mail :{
    type : String,
    required :true,
    uinque:true
  },
  Password :{
    type : String,
    require :true
  },
  Date :{
    type : Date,
    default :Date.now
  }
})
const user = mongoose.model('user',User);
module.exports = user;