module.exports = {

  login: (req, res) => {
    res.render("login.ejs", {
      title: "Welcome to Table Collection ",
      user: "Guest",
      message: ""
    });

  },
  logout: (req, res) => {
    
    new Promise(resolve => setTimeout(resolve, 1500));
    res.clearCookie('session-token');
    res.redirect('/login');
  },
  
};