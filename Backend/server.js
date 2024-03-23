const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors())
app.use(bodyParser.json())

const db = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: '',
    database: 'metro_events'  
})

app.get('/', (re, res)=>{
    return res.json("Backend Side");
})

app.get('/user', (req, res)=> {
    const sql = "SELECT * from user";
    db.query(sql, (err, data)=>{
        if(err) return res.jsonp(err);
        return res.json(data);
    })
})

app.listen(8000, ()=>{
    console.log("listening");
})


//real shit here
app.post('/register', (req, res) => {
    const { User_username, User_firstname, User_lastname, User_password } = req.body;
    const sql = "INSERT INTO user (User_username, User_firstname, User_lastname, User_password) VALUES (?, ?, ?, ?)";

    db.query(sql, [User_username, User_firstname, User_lastname, User_password], (err, result) => {
        if(err) return res.jsonp(err);
        return res.json({message: "registered successfully (from backend message ni)"});
    })
})

app.post('/', (req, res) => {
    const { User_username, User_password } = req.body;
    const sql = "select * from user WHERE User_username = ? and User_password = ?";

    db.query(sql, [User_username, User_password], (err, result) => {
        if(err) return res.jsonp(err);

        if(result.length > 0 ){
            return res.json({message: "1", user: result[0]});
        }
        else {
            return res.json({message: "0"});
        }
    })
})