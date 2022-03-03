const express = require("express");
const path = require("path");
//const cookieParser = require('cookie-parser')
const app = require("./Router/router");
const db = require("./Database/database");
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser')

// google Auth
const {OAuth2Client} = require('google-auth-library');
const CLIENT_ID = process.env.CLIENT_ID
const client = new OAuth2Client(CLIENT_ID);


dotenv.config();

const port = process.env.PORT || 5000;
global.db = db;

// configure middleware
app.set("port", process.env.port || port); // set express to use this port
app.set("views", __dirname + "/view"); // set express to look in this folder to render our view
app.set("view engine", "ejs"); // configure template engine

app.use(express.urlencoded({ extended: false }));
app.use(express.json()); // parse form data client
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, "public"))); // configure express to use public folder
app.use(express.static('public'));

app.post('/login', (req, res)=>{
  let token = req.body.token;
  //console.log(token);
  
  async function verify() {
    const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
            // Or, if multiple clients access the backend:
            //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();
    const userid = payload['sub'];
    // If request specified a G Suite domain:
    // const domain = payload['hd'];
    //console.log(payload)
    }
    verify()
    .then(()=>{
      res.cookie('session-token',token);
      res.send('success');
    }).catch(console.error);

})

app.get('/dashboard', checkAuthenticated, (req, res)=>{
  let user = req.user;
  res.render('dashboard', {user});
})


app.get('/protectedRoute',checkAuthenticated,  (req,res)=>{
  res.render('protectedroute.ejs'); 
})

app.get('/logout',(req,res)=>{
  res.clearCookie('session-token');
  res.redirect('/login') 
})
  


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
        res.redirect('/login')
    })

}

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});