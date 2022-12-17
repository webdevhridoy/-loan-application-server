const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config();
const cors = require('cors');

//middleware
const corsConfig = {
    origin: '*',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
};
app.use(cors(corsConfig));
app.options("*", cors(corsConfig));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Loan Application!');
});

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xetzjun.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const loansCollection = client.db('loan-application').collection('loans');

        // loan get method 
        app.get('/loans-info', async (req, res) => {
            const query = {};
            const result = await loansCollection.find(query).toArray();
            res.send(result);
        });

        // loan post method
        app.post('/loans-info', async (req, res) => {
            const query = req.body;
            const result = await loansCollection.insertOne(query);
            res.send(result);
        });
    }
    finally {

    }
}
run().catch(error => console.error(error));











app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});