const express = require("express");
const session = require('express-session');
const cookieParser = require('cookie-parser')
// google Auth
const {OAuth2Client} = require('google-auth-library');
const CLIENT_ID = process.env.CLIENT_ID
const client = new OAuth2Client(CLIENT_ID);

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json()); // parse form data client
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(cookieParser());

const { dashboard,showalltable,showtable } = require("./Routes/user");
const  {login,logout} = require("./Routes/auth")
const { frametable,createtable,generatetable } = require("./Routes/newtable");
const  {addnewrow,verifynewrow,editrow,verifyedit} = require("./Routes/table");
// routes for the app
//GET
app.get("/login", login);
app.get("/", login);
app.get("/dashboard",checkAuthenticated, dashboard);
app.get("/createtable",checkAuthenticated, createtable);
app.get("/mytable",checkAuthenticated, showalltable);
app.get('/logout',signOut,logout)




app.post('/addnewrow',checkAuthenticated,addnewrow);
app.post('/verifynewrow',checkAuthenticated,verifynewrow);
app.post("/createtable",checkAuthenticated,frametable);
app.post("/mytable",checkAuthenticated,showtable);
app.post("/frametable",checkAuthenticated,generatetable);
app.post("/edit",checkAuthenticated,editrow);
app.post("/verifyedit",checkAuthenticated,verifyedit);

    
  
  
  function checkAuthenticated(req, res, next){
  
    let token = req.cookies['session-token'];
  
    let user = {};
    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        });
        const payload = ticket.getPayload();
        user.name = payload.name;
        user.email = payload.email;
        user.picture = payload.picture;
      }
      verify()
      .then(()=>{
          req.user = user;
          next();
      })
      .catch(err=>{
        // console.log(err);
          res.redirect('/login')
      })
  
  }
  function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
    });
  }
  
module.exports = app;