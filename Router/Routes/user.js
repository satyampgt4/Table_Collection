module.exports = {
    
    dashboard: (req, res) => {
        // console.log(req.user);
        res.render("dashboard.ejs", {
            title: "Welcome to Panna Bank View Account",
            user : req.user.name,
            message : ""
          });
        
    },
    showalltable: (req, res) => {
        
        let email = req.user.email;
        let query = `SELECT tablename FROM manager WHERE email="${email}";`;
        db.query(query, (err, result) => {
            if (err) {
              console.log(err)
            }
            res.render("mytable.ejs", {
              title: "Welcome to Panna Bank View Account",
              tables: result,
              user: req.user.name,
              message: "",
  
            });
        });
       
    },
    showtable: (req, res) => {
        
        let tablename = req.body.tablename;
        // console.log(tablename);
        let query = `DESCRIBE ${tablename};`;
        let header = {};
        db.query(query, (err, result) => {
            if (err) {
              console.log(err)
            }
            console.log(result);
            header = result;
        });
         query = `SELECT *  FROM  ${tablename};`;
        db.query(query, (err, result) => {
            if (err) {
              console.log(err)
            }
            // console.log(header);
            // console.log(result);
            res.render("showtable.ejs", {
                title: "Welcome to Table collection",
                user : req.user.name,
                message : "",
                table : result,
                tableheader : header,
                tname: tablename,
                
              });
        });
    },
    filter : (req, res) => {
      let tablename = req.body.tablename;
      let query = `DESCRIBE ${tablename};`;
      // console.log(tablename);
      db.query(query, (err, result) => {
        if (err) {
          console.log(err)
        }
        res.render("filter.ejs", {
          title: "Welcome to Table collection",
          user: req.user.name,
          message: "",
          tableheader: result,
          tname: tablename,
        });

      });
    },
};