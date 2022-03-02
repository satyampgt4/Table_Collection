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
            // console.log(result);
            header = result;
        });
         query = `SELECT *  FROM  ${tablename};`;
        db.query(query, (err, result) => {
            if (err) {
              console.log(err)
            }
            // console.log(header);
            console.log(result);
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
    showfilter: (req, res) => {
      let tablename = req.body.tablename;
      let user_name = req.user.name;
      console.log(req.body);
      let query = `DESCRIBE ${tablename};`;
        let header = {};
        db.query(query, (err, result) => {
            if (err) {
              console.log(err)
            }
            // console.log(result);
            header = result;       
  
        let i = 1;
        query = `SELECT * FROM ${tablename} WHERE`;
      let obj = req.body;
      // console.log(object["strop"]);
        result.forEach((header, index) => {
          let s =`${header.Field}op`;
          let r = `${header.Field}`;

          if(obj[`${s}`] != "")
          {
            if(obj[`${s}`]=="null")
            {
              query = query + ` ${header.Field} IS NULL AND `;
            }
            else if (obj[`${s}`]=="notnull")
            {
              query = query + ` ${header.Field} IS NOT NULL AND `;
            }
            else if (obj[`${s}`] == "true")
            {
              query = query + ` ${header.Field}  =  "1" AND `;
            } 
            else if (obj[`${s}`] == "false")
            {
              query = query + ` ${header.Field}  =  "0" AND `;
            }
            else if(obj[`${r}`] != "")
            {
                if(obj[`${s}`] == "iseq")
                {
                  query = query + ` ${header.Field} =  "${obj[`${r}`]}" AND `;
                }
                else if(obj[`${s}`] == "noteq")
                {
                  query = query + ` ${header.Field} !=  "${obj[`${r}`]}" AND `;
                }
                else if(obj[`${s}`] == "greater")
                {
                  query = query + ` ${header.Field} >  ${obj[`${r}`]} AND `;
                }
                else if(obj[`${s}`] == "lesser")
                {
                  query = query + ` ${header.Field} <  ${obj[`${r}`]} AND `;
                }
                else if(obj[`${s}`] == "startswith")
                {
                  query = query + ` ${header.Field} LIKE  "${obj[`${r}`]}%" AND `;
                }
                else if(obj[`${s}`] == "endwith")
                {
                  query = query + ` ${header.Field} LIKE  "%${obj[`${r}`]}" AND `;
                }
                else if(obj[`${s}`] == "contain")
                {
                  query = query + ` ${header.Field} LIKE  "%${obj[`${r}`]}%" AND `;
                }
                else if(obj[`${s}`] == "notcontain")
                {
                  query = query + ` ${header.Field}  NOT LIKE  "%${obj[`${r}`]}" AND `;
                } 
                 
            }
          }
      });
        let lastIndex = query.lastIndexOf("AND");
  
        query = query.substring(0, lastIndex);
        console.log(query);
        db.query(query, (err, result) => {
            if (err) {
              console.log(err)
            }
            // console.log(header);
            console.log(result);
            res.render("showtable.ejs", {
                title: "Welcome to Table collection",
                user : req.user.name,
                message : "",
                table : result,
                tableheader : header,
                tname: tablename,
                
              });
        });
      });
      
    },
};