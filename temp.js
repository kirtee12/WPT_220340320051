
const express = require('express');
const app = express();
const mysql = require('mysql2');
app.listen(8081,function () {
	console.log("listening");
});


// const bodyParser = require('body-parser');






app.use(express.static('abc'));
let dbparams = {
	host : 'localhost',
	user : 'root',
	password: 'cdac',
	database : 'kirtee',
	port: 3306
}
 const conn = mysql.createConnection(dbparams);
 app.get("/getdetails", (req, resp) => {
    console.log("inside get details");
    let bookid = req.query.bookid;
    console.log(bookid);

    console.log("connection Successful");

    let output = {status: false, bookdetails: {bookid: 0, bookname: "", price: 0}}
    conn.query('select * from employee where empno = ?', [bookid], 
            (error, rows) => {
                if(error){
                    console.log("Some Error"+error);
                }
                else{
                    if(rows.length > 0){
                        output.status = true;
                        output.bookdetails = rows[0];
                    }
                    else{
                        console.log(" not found");
                    }
                }
                resp.send(output);
            });
});
app.get("/updateemp", (req, resp) => {
    console.log("Inside Updateemp function");

    let bookid =req.query.bookid;
	let price =req.query.price;
	    let output = {status: false}

    conn.query('update book set price= ? where bookid = ?',[ bookname , bookid], 
            // [bookdetails.bookid, bookdetails.bookname,bookdetails.price],
            (error, res) => {
                if(error){
                    console.log(error);
                }
                else{
                    if(res.affectedRows > 0){
                        console.log("Update Successful");
                        output.status = true;
                    }
                    else{
                        console.log("Update failed");
                    }
                }
                resp.send(output);
            });
});


