const mysql2 = require("mysql2");

const dbconnection = mysql2.createPool({
  host: process.env.RHOST,
  user: process.env.RUSER,
  password: process.env.RPASSWORD,
  database: process.env.RDATABASE,
  connectionLimit: 10,
});

// dbconnection.execute("select 'test1'", (err, result) => {
//   if (err) {
//     console.log(err.message);
//   } else {
//     console.log(result);
//   }
// });

module.exports = dbconnection.promise();
