//import the mysql2 library
var mysql = require("mysql2");

//create the connection and supply the details
var connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'adev',
    database: 'vending_machine'
});

//test the connection
connection.connect(err => {
    if (err) {
        throw err;
    }
    else {
        console.log("connected to db");
    }
});

//export the connection out for use in other javascript files
module.exports = connection;
