require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const router = require('./routes/ContactRouter');
const authRoutes = require('./routes/auth');

main().then(console.log('Connected to MongoDb')).catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.DB_CONNECTION, {
    dbName: 'contactdb',
    user: 'root',
    pass: 'root',
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}
const cors = require("cors");
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/auth', authRoutes);
app.use(router);

app.listen(process.env.port, '0.0.0.0',() => {
    console.log(`App listen on ${process.env.port}`);
});