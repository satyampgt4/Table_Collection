module.exports = {
    
    createtable: (req, res) => {
        res.render("createtable.ejs", {
            title: "Welcome to Table Collection",
            user : "Guest",
            message : "",
          });
        },
    frametable: (req, res) => {
        const noc = req.body.noOfColumn;
        res.render("frametable.ejs", {
            title: "Welcome to Table Collection",
            user : "Guest",
            message : "",
            noOfColumn :noc,

          });
    },
};