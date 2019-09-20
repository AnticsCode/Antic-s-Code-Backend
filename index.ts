import Server from "./src/classes/server";
import express from 'express';
import cors from 'cors';
import ROUTES from "./src/routes/routes.index";
// import morgan from 'morgan';

// Envinronment
// const env = require('dotenv');
// env.config();

// Database
const { moongose } = require('./src/db/database');

// Server
const server = new Server();

// Middlewares
// server.app.use(morgan('dev'));
server.app.use(express.json());
server.app.use(cors());
server.app.use(express.urlencoded({ extended: false }));  // Body Parse

// Routes
server.app.use(ROUTES);

server.listen(() => {
  console.log('\nNode/Express: \x1b[96m%s\x1b[0m', 'ONLINE');
  console.log('Port: \x1b[93m%s\x1b[0m', + server.app.get('port'));
});