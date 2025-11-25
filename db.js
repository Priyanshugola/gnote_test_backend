const mongoose = require('mongoose');
const mongouri = "mongodb://localhost:27017/user_master?directConnection=true";

const conn = async () => {
  try {
    await mongoose.connect(mongouri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ MongoDB Atlas connected');
  } catch (err) {
    console.error('❌ Connection error:', err);
  }
};
module.exports = conn;
