const express = require("express");
const session = require('express-session');
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json()); // parse form data client
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

const { dashboard } = require("./Routes/user");
const  {login} = require("./Routes/auth")
// routes for the app
//GET
app.get("/dashboard ", dashboard);
app.get("/login", login);
app.get("/", dashboard);


module.exports = app;