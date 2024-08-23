const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs')
const mysql = require('mysql2');
const jwt = require("jsonwebtoken");

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());

//mysql - database connection
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD
})

const port = process.env.PORT || 4300;

db.getConnection((err, connection) => {
    if (err) { console.log(err);
    }
connection;
    console.log("Connection with Database established");
        app.listen(port, () => {
            console.log("server listening on port " + port);
            
        })
     })

     // Secret key for JWT
const JWT_SECRET = process.env.JWT_SECRET;

// Middleware to authenticate JWT token
function authenticateToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) return res.sendStatus(401);
//   console.log(token);
  
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        // console.log(user);
        
        next();
    });
}

//API endpoints
//Get "/" route API endpoint
app.get("/", (req, res) => {
    res.send("Welcome to Padhle-Videos")
})

//POST API for registration route
app.post('/api/auth/register', (req, res) => {
   const { username, email, password } = req.body;
//    console.log(username, email, password);
   
   const hashedPassword = bcrypt.hashSync(password, 10);

   const sql = 'INSERT INTO Users (username, email, password) VALUES (?, ?, ?)';
   db.query(sql, [username, email, hashedPassword], (err, result) => {
       if (err) return res.status(500).send('Error registering user');
       res.status(200).send('User registered successfully');
   });
});

//Login route POST API request
app.post('/api/auth/login', (req, res) => {
    const { username, password } = req.body;
    // console.log(username, password);

    const sql = 'SELECT * FROM Users WHERE username = ?';
    db.query(sql, [username], (err, results) => {
        if (err) return res.status(500).send('Error on the server');
        if (results.length === 0) return res.status(404).send('No user found');

        const user = results[0];
        const passwordIsValid = bcrypt.compareSync(password, user.password);
        if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

        const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });
        res.status(200).send({ auth: true, token });
    });
});

     //Get Videos API endpoints
    //  
     app.get("/api/videos",authenticateToken,  (req, res) => {
        getSql = "SELECT * FROM Videos";
        db.query(getSql, (err,results) => {
            if (err) { console.log(err);
            }
            res.send(results)
        })
     })

     //GET API endpoint for progress reporting
     app.get('/api/progress', authenticateToken, (req, res) => {
        const userId = req.user.id;
        // console.log(userId);
        
        const sql = `
            SELECT p.*, v.title, v.sequence_order
            FROM Progress p
            JOIN Videos v ON p.video_id = v.id
            WHERE p.user_id = ?
            ORDER BY v.sequence_order ASC
        `;
        db.query(sql, [userId], (err, results) => {
            if (err) return res.status(500).send('Error fetching progress');
            res.status(200).json(results);
        });
    });
    
// POST endpoint request for updating progress;
app.post('/api/progress', authenticateToken, (req, res) => {
    const userId = req.user.id;
    const { videoId, lastWatchedTime, completed } = req.body;

    const sql = `
        INSERT INTO Progress (user_id, video_id, last_watched_time, completed)
        VALUES (?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE last_watched_time = ?, completed = ?
    `;
    db.query(sql, [userId, videoId, lastWatchedTime, completed, lastWatchedTime, completed], (err, result) => {
        if (err) return res.status(500).send('Error updating progress');
        res.status(200).send('Progress updated successfully');
    });
});
