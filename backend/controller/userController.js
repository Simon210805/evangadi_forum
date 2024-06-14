//contraller is used for communication with database

const dbConnection = require("../db/dbConfig");
const bcrypt = require("bcrypt");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

async function register(req, res) {
  const { username, email, password, firstname, lastname } = req.body;
  if (!email || !password || !username || !firstname || !lastname) {
    //   console.log("Validation failed");
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "please provide all fields" });
  }

  try {
    const [user] = await dbConnection.query(
      "select username,userid from users where username = ? or email = ?",
      [username, email]
    );
    if (user.length > 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "user already registered" });
    }
    if (password.length <= 8) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "password must be at least 8 characters" });
    }
    //encrypt  the
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await dbConnection.query(
      "INSERT INTO users (username,  email, password, firstname, lastname) VALUES (?, ?, ?, ?, ? )",
      [username, email, hashedPassword, firstname, lastname]
    );
    return res.status(StatusCodes.CREATED).json({ msg: "user registered" });
  } catch (err) {
    console.log(err.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "something went wrong, try again later!" });
  }
}

async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "please provide all fields" });
  }
  try {
    const [user] = await dbConnection.query(
      "select username, userid, password from users where  email = ? ",
      [email]
    );
    if (user.length == 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "invalid credentials" });
    }
    // compare the password
    const ismatch = await bcrypt.compare(password, user[0].password);

    if (!ismatch) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "invalid credentials" });
    }
    const username = user[0].username;
    const userid = user[0].userid;
    const token = jwt.sign({ username, userid }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res
      .status(StatusCodes.OK)
      .json({ msg: "user login successful", token, username});
  } catch (err) {
    console.log(err.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "something went wrong, try again later!" });
  }
}
async function checkUser(req, res) {
   const username = req.user.username;
  const userid = req.user.userid;
  res.status(StatusCodes.OK).json({ msg: "valid user", username, userid });
}
async function getuser(req, res) {
  try{
const [user] = await dbConnection.query(
  "SELECT * FROM users");
  return res.status(200).json(user);
}catch (error) {
  console.log(error.message);
  return res
    .status(500)
    .json({ msg: "Something went wrong, try again later!" });
}
}




  // const [questions] = await dbConnection.query("SELECT * FROM question");

  //   return res.status(200).json(questions);
  // } catch (error) {
  //   console.log(error.message);
  //   return res
  //     .status(500)
  //     .json({ msg: "Something went wrong, try again later!" });
  // }


module.exports = {
  register,
  login,
  checkUser,
  getuser,
};
