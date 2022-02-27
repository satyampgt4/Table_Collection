module.exports = {
    
    dashboard: (req, res) => {
        res.render("dashboard.ejs", {
            title: "Welcome to Panna Bank View Account",
            user : "Guest",
            message : ""
          });
        
    },
};