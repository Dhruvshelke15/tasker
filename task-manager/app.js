const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();
const port = 3000;
const cors = require('cors');

app.use(cors());
// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'taskdb',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

// Middleware
app.use(bodyParser.json());

// Routes
app.get('/tasks', (req, res) => {
  db.query('SELECT * FROM tasks', (err, results) => {
    if (err) {
      res.status(500).send('Error retrieving tasks from the database');
    } else {
      res.json(results);
    }
  });
});

app.post('/tasks', (req, res) => {
  const { title, description, completed } = req.body;
  const sql = 'INSERT INTO tasks (title, description, completed) VALUES (?, ?, ?)';
  db.query(sql, [title, description, completed], (err, result) => {
    if (err) {
      res.status(500).send('Error creating a new task');
    } else {
      res.json({ id: result.insertId, title, description, completed });
    }
  });
});

app.put('/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  const { title, description, completed } = req.body;
  const sql = 'UPDATE tasks SET title=?, description=?, completed=? WHERE id=?';
  db.query(sql, [title, description, completed, taskId], (err) => {
    if (err) {
      res.status(500).send('Error updating the task');
    } else {
      res.json({ id: taskId, title, description, completed });
    }
  });
});

app.delete('/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  const sql = 'DELETE FROM tasks WHERE id=?';
  db.query(sql, [taskId], (err) => {
    if (err) {
      res.status(500).send('Error deleting the task');
    } else {
      res.json({ id: taskId, message: 'Task deleted successfully' });
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});