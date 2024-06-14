require("dotenv").config();
const express = require("express");
const app = express();

const port = 5500;
const cors = require("cors");
//user middleware
app.use(cors());
//db connection
const dbConnection = require("./db/dbConfig");

// user routes middleware
const userRoutes = require("./routes/userRoutes");

// user routes middleware
const questionRoutes = require("./routes/questionRoutes");

// anser routes middleware
const answerRoutes = require("./routes/answerRoutes");

//authentication middleware
const authmiddleware = require("./middleware/authmiddleware");

// Middleware to handle JSON body
app.use(express.json());
// user routes middleware
app.use("/api/users", userRoutes);

app.use("/api/questions", questionRoutes);

app.use("/api/answers", answerRoutes);



//answer routes middleware??
async function start() {
  try {
    const results = await dbConnection.execute("select 'test'");
    await app.listen(port);
    console.log("database connection is established");
    console.log(`listening on port ${port}`);
  
  } catch (error) {
    console.log(error.message);
  }
}
start();


