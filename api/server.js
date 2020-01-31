const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const session = require('express-session')
const KnexSessionStore = require('connect-session-knex')(session)
const authenticate = require('../auth/authenticate-middleware.js');
const authRouter = require('../auth/auth-router.js');
const jokesRouter = require('../jokes/jokes-router.js');

const server = express();

server.use(express.static('client/public'))
server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(session({
    name: 'session_cookie',
    secret: 'secretForHash',
    cookie: {
        maxAge: 1000 * 60 * 60,
        secure: false,
        httpOnly: false,
    },
    resave: false,
    saveUninitialized: false,
    store: new KnexSessionStore({
        knex: require('../database/dbConfig'),
        tablename: 'sessions',           
        sidfieldname: 'sid',           
        createtable: true,
        clearInterval: 1000 * 60 * 60
    })
}))

server.use('/api/auth', authRouter);
server.use('/api/jokes', authenticate, jokesRouter);

module.exports = server;
