require('dotenv').config();
const cors = require('cors');
const fileupload = require('express-fileupload');
const mongoose = require('mongoose');
const express = require('express');
const path = require('path');

const apiRoutes = require('./src/routes');

mongoose.connect(process.env.DATABASE);

mongoose.Promise = global.Promise;
mongoose.connection.on('on', (error) => {
    console.log("Error", error.message);
});

const server = express();
server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(fileupload());

server.use(express.static(path.join(__dirname, '/public')));

server.use('/', apiRoutes);

server.listen(process.env.PORT, () => {
    console.log(`Porta rodando na porta ${process.env.BASE}`)
});