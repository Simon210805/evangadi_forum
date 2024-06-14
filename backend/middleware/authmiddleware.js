const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");


 async function authmiddleware(req, res, next) {
   const authHeader = req.headers.authorization;

   if (!authHeader || !authHeader.startsWith("Bearer ")) {
     return res.status(StatusCodes.UNAUTHORIZED).json({ msg: "authentication invalid" });
   }

  const token = authHeader.split(" ")[1]




   try {
     const { username, userid } = jwt.verify(token, process.env.JWT_SECRET);
     req.user = { username, userid };
     next();
   } catch (err) {
     return res
       .status(StatusCodes.UNAUTHORIZED)
       .json({ msg: "authentication invalid" });
   }
 }
    
module.exports = authmiddleware