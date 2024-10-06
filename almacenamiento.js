const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get('/users', (req, res) => {
    fs.readFile('users.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading users file.');
        }
        res.send(JSON.parse(data));
    });
});

app.post('/register', (req, res) => {
    const newUser = req.body;
    fs.readFile('users.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading users file.');
        }
        const users = JSON.parse(data);
        if (users.find(u => u.username === newUser.username)) {
            return res.status(400).send('El usuario ya existe.');
        }
        users.push(newUser);
        fs.writeFile('users.json', JSON.stringify(users), (err) => {
            if (err) {
                return res.status(500).send('Error saving user.');
            }
            res.send('Usuario registrado con éxito.');
        });
    });
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
