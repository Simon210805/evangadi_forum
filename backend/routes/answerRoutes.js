const express = require("express");
const router = express.Router();
//answer controllers
const { postanswer, getallanswer } = require("../controller/answerController");
//authentication middleware
//const { postanswer, getallanswers} = require("../controller/answerController");
router.post("/postanswer/:questionid", postanswer)
router.get("/getallanswer/:questionid", getallanswer);
  

module.exports = router