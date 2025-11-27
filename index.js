// console.log("ss");
// // const conn = require('./db.js');
// const express = require('express');
// var cors = require('cors')
// // conn();
// const app = express();
// app.use(cors())
// exports.app = app;
// const port = 5000; 
// // app.get('/',(req, res)=>{
// //     res.send('hello world')
// // })
// app.use(express.json())
// app.use("/", require('./router/Auth'));
// app.use("/", require('./router/Note'));
// app.use("/", (req, res, next) => {
//   console.log("ss");
//   next(); // Continue to the next middleware
// });
// // app.listen(port,()=>{
// //     console.log(`Example port on http://localhost:${port}`)
// // })d
// // export default app;
// exports.app = app;
console.log("server loaded");  // runs when server initializes

console.log("server loaded");

const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// INDEX log
app.get("/", (req, res) => {
  console.log("Index route hit");
  res.send("Backend working!");
});

app.use("/", require("/router/Auth"));
app.use("/", require("/router/Note"));

module.exports = app;

