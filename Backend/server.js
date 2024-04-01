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

app.get('/admin', (req, res)=> {
    const sql = "SELECT * from admin";
    db.query(sql, (err, data)=>{
        if(err) return res.jsonp(err);
        return res.json(data);
    })
})



app.get('/isOrganizer', (req, res) => {
    const userId = req.query.userId; // assuming you're passing userId as a query parameter
    const sql = "SELECT User_isOrganizer FROM user WHERE User_id = ?";
    
    db.query(sql, [userId], (err, data) => {
        if(err) return res.jsonp(err);
        
        // Assuming User_isOrganizer is a boolean
        const isOrganizer = data[0].User_isOrganizer;
        return res.json({isOrganizer});
    })
})


//user register
app.post('/register', (req, res) => {
    const { User_username, User_firstname, User_lastname, User_password } = req.body;
    const sql = "INSERT INTO user (User_username, User_firstname, User_lastname, User_password) VALUES (?, ?, ?, ?)";

    db.query(sql, [User_username, User_firstname, User_lastname, User_password], (err, result) => {
        if(err) return res.jsonp(err);
        return res.json({message: "registered successfully (from backend message ni)"});
    })
})

//user login
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


//admin user login
app.post('/adminlogin', (req, res) => {
    const { admin_username, admin_password } = req.body;
    const sql = "select * from admin WHERE admin_username = ? and admin_password = ?";

    db.query(sql, [admin_username, admin_password], (err, result) => {
        if(err) return res.jsonp(err);

        if(result.length > 0 ){
            return res.json({message: "1", user: result[0]});
        }
        else {
            return res.json({message: "0"});
        }
    })
})


// Fetch all events in homepage
app.get('/events', (req, res) => {
    const sql = "SELECT * from events";
    db.query(sql, (err, data) => {
        if(err) return res.jsonp(err);
        return res.json(data);
    })
})

// admin -nag gamit ani
app.delete('/events/:eventId', (req, res) => {
    const { eventId } = req.params;
    const sql = "DELETE FROM events WHERE event_id = ?";
    db.query(sql, [eventId], (err, data) => {
        if(err) {
            console.error('Error deleting record:', err);
            return res.status(500).jsonp(err);
        }
        return res.status(204).end();
    })
})

// Fetch events a specific user is participating in homepage
app.get('/user_event_participated/:userId', (req, res) => {
    const { userId } = req.params;
    const sql = "SELECT * from user_event_participated WHERE uep_userID = ?";
    db.query(sql, [userId], (err, data) => {
        if(err) return res.jsonp(err);
        return res.json(data);
    })
})



//homepage join button
app.post('/user_event_participated', (req, res) => {
    const { uep_eventID, uep_userID } = req.body;
    const sql = "INSERT INTO user_event_participated (uep_eventID, uep_userID) VALUES (?, ?)";

    db.query(sql, [uep_eventID, uep_userID], (err, result) => {
        if(err) return res.jsonp(err);
        return res.json({message: "add sucess"});
    })
})

//my events delete button
app.delete('/user_event_participated/:eventId', (req, res) => {
    const { eventId } = req.params;
    const { userId } = req.body;
    const sql = "DELETE FROM user_event_participated WHERE uep_eventID = ? AND uep_userID = ?";
    db.query(sql, [eventId, userId], (err, data) => {
        if(err) {
            console.error('Error deleting record:', err);
            return res.status(500).jsonp(err);
        }
        return res.status(204).end();
    })
})

//organize become an organizer
app.post('/apply_organizer', (req, res) => {
    const { User_id, User_username} = req.body;

    // First, check if the user has already applied
    const checkSql = "SELECT * FROM organizer_app WHERE oa_userID = ? AND oa_username = ?";

    db.query(checkSql, [User_id, User_username], (err, result) => {
        if(err) return res.jsonp(err);

        // If the user has already applied, return a message
        if(result.length > 0) {
            return res.json({message: "application is in review"});
        }

        // If the user hasn't applied yet, insert their application
        const insertSql = "INSERT INTO organizer_app (oa_userID, oa_username) VALUES (?, ?)";

        db.query(insertSql, [User_id, User_username], (err, result) => {
            if(err) return res.jsonp(err);
            return res.json({message: "application sent"});
        });
    });
})



//admin side operations

//fetch list of requests
app.get('/get_requests', (req, res) => {
    const sql = "SELECT * FROM organizer_app WHERE oa_isApproved = 0";

    db.query(sql, (err, result) => {
        if(err) return res.jsonp(err);
        return res.json(result);
    })
})

//approve operation of request
// Approve an application
app.post('/approve', (req, res) => {
    const { User_id } = req.body;
    const updateUserSql = "UPDATE user SET User_isOrganizer = 1 WHERE User_id = ?";
    const updateAppSql = "UPDATE organizer_app SET oa_isApproved = 1 WHERE oa_userID = ?";

    // Start a transaction to ensure both updates happen together
    db.beginTransaction(err => {
        if (err) return res.jsonp(err);

        // Update the user table
        db.query(updateUserSql, [User_id], (err, result) => {
            if (err) {
                return db.rollback(() => {
                    res.jsonp(err);
                });
            }

            // Update the organizer_app table
            db.query(updateAppSql, [User_id], (err, result) => {
                if (err) {
                    return db.rollback(() => {
                        res.jsonp(err);
                    });
                }

                // If both updates were successful, commit the transaction
                db.commit(err => {
                    if (err) {
                        return db.rollback(() => {
                            res.jsonp(err);
                        });
                    }
                    return res.json({message: "User approved as organizer"});
                });
            });
        });
    });
});



// admin side  admin_organizers functions
app.get('/get_organizers', (req, res) => {
    const sql = "SELECT * FROM user WHERE User_isOrganizer = 1";

    db.query(sql, (err, result) => {
        if(err) return res.jsonp(err);
        return res.json(result);
    })
})

// admin side  admin_organizers functions
app.post('/revoke_organizer', (req, res) => {
    const { userId } = req.body;
    const sqlUpdate = "UPDATE user SET User_isOrganizer = 0 WHERE User_id = ?";
    const sqlDelete = "DELETE FROM organizer_app WHERE oa_userID = ?";

    db.query(sqlUpdate, [userId], (err, result) => {
        if(err) {
            console.error('Error updating record:', err);
            return res.status(500).jsonp(err);
        }

        db.query(sqlDelete, [userId], (err, result) => {
            if(err) {
                console.error('Error deleting record:', err);
                return res.status(500).jsonp(err);
            }
            return res.status(204).end();
        });
    })
})

//used in admin_homepage
app.get('/organizer_app', (req, res) => {
    const sql = "SELECT * FROM organizer_app WHERE oa_isApproved = 0";

    db.query(sql, (err, result) => {
        if(err) return res.jsonp(err);
        return res.json(result);
    })
})

app.listen(8000, ()=>{
    console.log("listening");
})

