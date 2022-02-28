module.exports = {
    
    login: (req, res) => {
        res.render("login.ejs", {
            title: "Welcome to Table Collection ",
            user : "Guest",
            message : ""
          });
        
    },
};