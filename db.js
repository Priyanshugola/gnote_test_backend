// const mongoose = require('mongoose');
// const mongouri = "mongodb://localhost:27017/user_master?directConnection=true";

// const conn = async () => {
//   try {
//     await mongoose.connect(mongouri, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true
//     });
//     console.log('✅ MongoDB Atlas connected');
//   } catch (err) {
//     console.error('❌ Connection error:', err);
//   }
// };
// module.exports = conn;
const mongoose = require('mongoose');

// Use environment variable for security (recommended)
const MONGO_URI ="mongodb+srv://priyanshu306study_db_user:DLvk6HjuzYzrZuTq@gnote.gtdtupn.mongodb.net/user_master";

// Async function to connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB Atlas Connected Successfully');
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error);
    process.exit(1); // Exit process on failure
  }
};

module.exports = connectDB;
