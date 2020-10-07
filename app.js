const express = require('express');
const mySQl = require('mysql');

const app = express();

const db = mySQl.createConnection({
    host: '',
    user: '',
    password: '',
    database: ''  //   DB_MYSQL_NODEjs_CRUD 
});

db.connect(err => {
    if (err) throw err;
    console.log('MySQl connected...')
});

//creating of database
app.get('/createDB', (req, res) => {
    let sql = 'CREATE DATABASE DB_MYSQL_NODEjs_CRUD';
        db.query(sql, (err, data) => {
            if (err) throw err;
            console.log(data);
            res.send('Database created...')
    })
});

//creating of table
app.get('/create/posts-table', (req, res) => {
    var sql = "CREATE TABLE posts (id INT AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY (id))";  
    db.query(sql, (err, data) => {
        if (err) throw err;
        console.log(data);
        res.send('Post table created...')
    })
});

//Inert post 1
app.get('/add/post', (req, res) => {
    let post = {
        title: 'Post One',
        body: 'This is post number one'
    };
    let sql = 'INSERT INTO posts SET ?';
    let query = db.query(sql, post, (err, data) => {
        if (err) throw err;
        console.log(data);
        res.send('Post 1 added...')
    })
});

//Select all posts
app.get('/selectAll/posts', (req, res) => {
    let sql='SELECT * FROM posts';
    let query = db.query(sql, (err, data) => {
        if (err) throw err;
        console.log(data);
        res.send('Posts fetched...')
    })
});

//Select single posts
app.get('/selectOne/post/:id', (req, res) => {
    let sql = `SELECT * FROM posts WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, data) => {
        if (err) throw err;
        console.log(data)
    });
    res.send(`Post ID of ${req.params.id} fetched...`);
});

//Update post
app.get('/update/post/:id', (req, res) => {
    let newTitle = 'Updated Title';
    let sql = `UPDATE posts SET title = '${newTitle}' WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, data) => {
        if (err) throw err;
        console.log(data)
    });
    res.send(`Post ID of ${req.params.id} updated...`);
});

//Deleted post
app.get('/delete/post/:id', (req, res) => {
    let newTitle = 'Updated Title';
    let sql = `DELETE FROM posts WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, data) => {
        if (err) throw err;
        console.log(data)
    });
    res.send(`Post ID of ${req.params.id} deleted...`);
});

const POST = process.env.POST || 5000;

app.listen(POST, () => console.log(`Server running on PORT ${POST}`));
