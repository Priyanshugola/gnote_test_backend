const mongoose = require('mongoose');
const {Schema} = mongoose
const Notes = new Schema({
  User_id : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'users'
  },
  Title :{
    type : String,
    require :true
  },
  Description :{
    type : String,
    require :true,
    uinque:true
  },
  Key :{
    type : String,
    default :'Genral'
   
  },
  Date :{
    type : Date,
    default :Date.now
  }
})
module.exports = mongoose.model('note',Notes)