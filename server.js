const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const axios = require('axios');
const app = express();
const port = 3000;

// Configura la base de datos
let db = new sqlite3.Database('./nasa.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Conectado a la base de datos local de NASA.');
});

// Rutas
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/datos', (req, res) => {
    db.all('SELECT * FROM nasa_data', [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
});

// Crea la tabla para almacenar datos de NASA
db.run('CREATE TABLE IF NOT EXISTS nasa_data (id INTEGER PRIMARY KEY, data TEXT)', (err) => {
    if (err) {
        console.error(err.message);
    }
});

// Obtén datos de la NASA y guárdalos en la base de datos
app.get('/api/actualizar', async (req, res) => {
    try {
        const response = await axios.get('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY');
        const data = JSON.stringify(response.data);
        db.run(`INSERT INTO nasa_data (data) VALUES (?)`, [data], function(err) {
            if (err) {
                return console.log(err.message);
            }
            res.send("Datos de NASA actualizados y guardados en la base de datos.");
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al obtener datos de NASA.");
    }
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
