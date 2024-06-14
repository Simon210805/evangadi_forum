const express = require("express");
const router = express.Router();
//authentication middleware
const { postquestion, getallquestions} = require("../controller/questionController");

router.post("/postquestion", postquestion);
router.get("/getallquestions", getallquestions);




module.exports = router