const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();

var config =
{
    host: 'intellestate-mysql.mysql.database.azure.com',
    user: 'intellestate_admin',
    password: 'Password1',
    database: 'intellestate-mysql',
    port: 3306,
    ssl: { ca: fs.readFileSync("DigiCertGlobalRootCA.crt.pem") }
};

const corsOptions = {
    origin: ['http:localhost:3000', 'http:localhost:3001']
};

app.use(cors({ origin: '*' }))
app.use(bodyParser.json());

const conn = new mysql.createConnection(config);


app.get('/', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.send('Hello, World!');
});

app.get('/income_rating', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    const sql = 'SELECT * FROM parcel_price_rating LIMIT 2000';
    conn.query(sql, (error, results, fields) => {
        if (error) throw error;
        res.send(results);
    });
});


app.post("/search", (req, res) => {
    const { city } = req.body;

    const sql = `SELECT * FROM parcel_ratings WHERE CITY = '${city}'`;
    conn.query(sql, (error, results, fields) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).json({ error: 'An error occurred while executing the query.' });
            return;
        }
        res.send(results);
    });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});