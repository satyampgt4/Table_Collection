module.exports = {

    createtable: (req, res) => {
        // console.log(req);
        res.render("createtable.ejs", {
            title: "Welcome to Table Collection",
            user: req.user.name,
            message: "",
        });
    },
    frametable: (req, res) => {

        const noc = req.body.nofcolumn;
        const name = req.body.nameoftable;
        res.render("frametable.ejs", {
            title: "Welcome to Table Collection",
            user: req.user.name,
            message: "",
            noOfColumn: noc,
            name: name,

        });
    },
    generatetable: (req, res) => {

        let query = "CREATE TABLE " + req.body.nameoftable + " (";

        for (let i = 1; i <= req.body.nofcolumn; i++) {
            let s = `colname${i}`;
            let r = `coltype${i}`;

            query = query + req.body[s] + " " + req.body[r] + ",";
        }
        query = query + `PRIMARY KEY ( ${req.body["colname1"]} ));`;

        db.query(query, (err, result) => {
            if (err) {
                return res.status(200).send(err);
            }
            // console.log(result);
            query = `INSERT INTO manager (email, tablename) VALUES ("${req.user.email}", "${req.body.nameoftable}" );`;
            db.query(query, (err, result) => {
                if (err) {
                    return res.status(200).send(err);
                }
                // console.log(result);
                res.redirect("/mytable");
            });
        });



    },
    addnewrow: (req, res) => {
        let tablename = req.body.tablename;
        // console.log(tablename);
        let query = `DESCRIBE ${tablename};`;
        let header = {};
        db.query(query, (err, result) => {
            if (err) {
                console.log(err)
            }
            // console.log(result);
            header = result;
        });
    },

};