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
    const { city, ZIPCODE, STREET, minPrice, maxPrice, minSQFT, maxSQFT, minBuildingSQFT, maxBuildingSQFT, propertyTypes, page = 1, ratingWeights, ratingWeightsValue } = req.body;
    const limit = 50;
    const offset = (page - 1) * limit;

    const selectedWeights = Object.keys(ratingWeights).filter((key) => ratingWeights[key]);
    let sqlQuery = "SELECT *";

    if (selectedWeights.length > 0) {
        sqlQuery += ", (";

        selectedWeights.forEach((weight, index) => {
            const ratingKey = weight[0] + "_rating"; // e.g., p_rating, i_rating, etc.
            sqlQuery += `${index === 0 ? '' : ' + '}${ratingWeightsValue[weight]} * IFNULL(${ratingKey}, 0)`;
        });

        sqlQuery += ") AS overall_rating";
    }

    sqlQuery += " FROM parcel_ratings WHERE 1";
    if (city != '') {
        sqlQuery += ` AND city = '${city}'`;
    }

    if (ZIPCODE != '') {
        sqlQuery += ` AND zipcode = '${ZIPCODE}'`;
    }

    if (STREET != '') {
        sqlQuery += ` AND STREET = '${STREET}'`;
    }

    if (minPrice !== '' && maxPrice !== '') {
        sqlQuery += ` AND GCERT3 BETWEEN ${minPrice} AND ${maxPrice}`;
    }
    if (minPrice !== '' && maxPrice == '') {
        sqlQuery += ` AND GCERT3 >= ${minPrice}`;
    }
    if (minPrice == '' && maxPrice !== '') {
        sqlQuery += ` AND GCERT3 <= ${maxPrice}`;
    }

    if (minSQFT !== '' && maxSQFT !== '') {
        sqlQuery += ` AND TOTAL_SQUA BETWEEN ${minSQFT} AND ${maxSQFT}`;
    }
    if (minSQFT !== '' && maxSQFT == '') {
        sqlQuery += ` AND TOTAL_SQUA >= ${minSQFT}`;
    }
    if (minSQFT == '' && maxSQFT !== '') {
        sqlQuery += ` AND TOTAL_SQUA <= ${maxSQFT}`;
    }

    if (minBuildingSQFT !== '' && maxBuildingSQFT !== '') {
        sqlQuery += ` AND TOTAL_RES_AREA BETWEEN ${minBuildingSQFT} AND ${maxBuildingSQFT}`;
    }
    if (minBuildingSQFT !== '' && maxBuildingSQFT == '') {
        sqlQuery += ` AND TOTAL_RES_AREA >= ${minBuildingSQFT}`;
    }
    if (minBuildingSQFT == '' && maxBuildingSQFT !== '') {
        sqlQuery += ` AND TOTAL_RES_AREA <= ${maxBuildingSQFT}`;
    }

    const propertyTypeKeys = Object.keys(propertyTypes);
    const selectedPropertyTypes = propertyTypeKeys.filter((key) => propertyTypes[key]);

    if (selectedPropertyTypes.length > 0) {
        sqlQuery += ` AND SiteCat1 IN (${selectedPropertyTypes.map((type) => `'${type}'`).join(", ")})`;
    }

    if (selectedWeights.length > 0) {
        sqlQuery += ` ORDER BY overall_rating DESC`;
    }

    sqlQuery += ` LIMIT ${limit} OFFSET ${offset}`;
    console.log(sqlQuery);
    conn.query(sqlQuery, (error, results, fields) => {
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