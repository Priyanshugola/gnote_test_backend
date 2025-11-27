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

// ✅ MongoDB Atlas ka connection URI yaha paste karo
// const mongouri = "mongodb+srv://priyanshu306study_db_user:DLvk6HjuzYzrZuTq@gnote.gtdtupn.mongodb.net/user_master?retryWrites=true&w=majority";
// const mongouri = "mongodb+srv://priyanshu306study_db_user:DLvk6HjuzYzrZuTq@gnote.gtdtupn.mongodb.net/user_master?retryWrites=true&w=majority";
const mongouri = "mongodb+srv://priyanshu306study_db_user:DLvk6HjuzYzrZuTq@gnote.gtdtupn.mongodb.net/user_master?retryWrites=true&w=majority";

const conn = async () => {
  try {
    await mongoose.connect(mongouri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ MongoDB Atlas Connected Successfully');
  } catch (err) {
    console.error('❌ MongoDB Connection Error:', err);
  }
};

module.exports = conn;

