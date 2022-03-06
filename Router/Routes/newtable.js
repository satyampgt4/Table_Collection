function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
  }
  
function replaceAll(str, find, replace) {
    return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
  }
module.exports = {

    
    createtable: (req, res) => {
        // console.log(req);
        res.render("createtable.ejs", {
            title: "Welcome to Table Collection",
            user: req.user.name,
            userimg : req.user.picture,
            message: "",
        });
    },
    frametable: (req, res) => {

        let noc = req.body.nofcolumn;
        let name = req.body.nameoftable;
        // name = replaceAll(name," ", "_");
        res.render("frametable.ejs", {
            title: "Welcome to Table Collection",
            user: req.user.name,
            userimg : req.user.picture,
            message: "",
            noOfColumn: noc,
            name: name,

        });
    },
    generatetable: (req, res) => {


        let name = req.body.nameoftable;
        let noc = req.body.nofcolumn;

        let nameid = "t_" + replaceAll(name," ", "_") +`_${req.user.email}`;
        nameid = replaceAll(nameid,"@", "_");
        nameid = replaceAll(nameid,".", "_");
        

        let query = `CREATE TABLE ${nameid} (`;

        for (let i = 1; i <= noc; i++) {
            let s = `colname${i}`;
            let r = `coltype${i}`;
            let head = `${req.body[s]}`;
            head = replaceAll(head," ", "_")+"_";
            query = query + ` ${head}  ${req.body[r]} ,`;
            
        }
            head = `${req.body["colname1"]}`;
            head = replaceAll(head," ", "_")+"_";
        query = query + `PRIMARY KEY ( ${head}));`;

        db.query(query, (err, result) => {
            if (err) {
                return res.status(200).send(err);
            }
            // console.log(result);
            query = `INSERT INTO table___map___manager (email, tablename,tableid,noc,pkey) VALUES ("${req.user.email}", "${req.body.nameoftable}","${nameid}","${noc}","${head}" );`;
            db.query(query, (err, result) => {
                if (err) {
                    return res.status(200).send(err);
                }
                // console.log(result);
                res.redirect("/mytable");
            });
        });



    },
};