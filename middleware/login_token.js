const jwt = require('jsonwebtoken');
const JWT_SECRET = "thisidgnotetoken";  
const authuser = (req,res,next)=>{
    const token = req.header('token_no');
    if (!token) {
        res.status(401).send({error :"please use valid cread"})        
    }
    try {
        const data = jwt.verify(token,JWT_SECRET);
        req.user = data.user;
    } catch (error) {
        res.status(401).send({error :"please use valid cread"})        
    }
    next();
}
module.exports = authuser;