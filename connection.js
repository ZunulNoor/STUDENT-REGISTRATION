const mysql = require('mysql2')
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    database : "student",
    password: "EtechSolution@123789",
    port: 3306
})

con.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err.message);
    } else {
        console.log('Connected to MySQL');
    }
});


module.exports.con = con