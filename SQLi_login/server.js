
const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

const db = require('./db');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'create_page.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'login_page.html'));
});

app.post('/api', (req, res) => {
    const { user, password } = req.body;

    if (!user || !password) {
        return res.send('<h1>Error: Username and password are required</h1><a href="/">Back</a>');
    }

    db.query(
        'INSERT INTO user_info (`user`, `password`) VALUES (?, ?)',
        [user, password],
        (err, result) => {
            if (err) {
                console.error('Error inserting data into database:', err);
                return res.send('<h1>Error: Could not create account</h1><a href="/">Back</a>');
            }
            res.send('<h1>Account created successfully!</h1><a href="/login">Login</a>');
        }
    );
});


app.post('/login', (req, res) => {
    const { user11, password11 } = req.body;

    if (!user11 || !password11) {
        return res.send('<h1>Error: Username and password are required</h1><a href="/login">Back</a>');
    }

    db.query(
        "SELECT * FROM user_info WHERE user = '"+user11+"' AND password = '"+password11+"' ",
        [user11, password11],
        (err, results) => {
            if (err) {
                console.error('Login query error:', err);
                return res.send('<h1>Error: Database issue</h1><a href="/login">Back</a>');
            }

            if (results.length > 0) {
                res.send('<h1>Login successful!</h1><a href="/">Home</a>');
            } else {
                res.send('<h1>Invalid username or password</h1><a href="/login">Try again</a>');
            }
        }
    );
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    db.connect((err) => {
        if (err) throw err;
        console.log('Connected to the database');
    });
});
