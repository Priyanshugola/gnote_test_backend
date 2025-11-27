console.log("ss");
// const conn = require('./db.js');
const express = require('express');
var cors = require('cors')
// conn();
const app = express();
app.use(cors())
exports.app = app;
const port = 5000; 
// app.get('/',(req, res)=>{
//     res.send('hello world')
// })
app.use(express.json())
app.use("/", require('./router/Auth'));
app.use("/", require('./router/Note'));
app.use("/", (req, res, next) => {
  console.log("ss");
  next(); // Continue to the next middleware
});
// app.listen(port,()=>{
//     console.log(`Example port on http://localhost:${port}`)
// })d
export default app;
