module.exports = {

  addnewrow: (req, res) => {
    let tablename = req.body.tablename;
    let tableid = req.body.tableid;
    let noc = req.body.noc;
    let pkey = req.body.pkey;
    let query = `DESCRIBE ${tableid};`;
    let user_name = req.user.name;
    db.query(query, (err, result) => {
      if (err) {
        console.log(err)
      }
      res.render("addnewrow.ejs", {
        title: "Welcome to Table collection",
        user: req.user.name,
        userimg : req.user.picture,
        message: "",
        tableheader: result,
        tname: tablename,
        tid : tableid,
        tnoc : noc,
        tpkey : pkey,
      });
    });
  },
  verifynewrow: (req, res,next) => {
    let tablename = req.body.tablename;
    let tableid = req.body.tableid;
    let noc = req.body.noc;
    let pkey = req.body.pkey;
    let user_name = req.user.name;
    query = `DESCRIBE ${tableid};`;
    db.query(query, (err, result) => {
      if (err) {
        console.log(err)
        res.redirect('/mytable');
      }

      let i = 1;
      query = `INSERT INTO ${tableid} (`;
      result.forEach((header, index) => {
        query = query + ` ${header.Field} ,`
      });
      let lastIndex = query.lastIndexOf(",");

      query = query.substring(0, lastIndex);

      i = 0;
      query = query + `) VALUES (`;
      result.forEach((header, index) => {
        query = query + `"${req.body[header.Field]}",`
      });
      lastIndex = query.lastIndexOf(",");

      query = query.substring(0, lastIndex);

      query = query + `);`;

      db.query(query, (err, result) => {
        if (err) {
          console.log(err)
          res.redirect('/mytable');
        }
        next();
      });

    });
  },


  editrow: (req, res) => {
    let tablename = req.body.tablename;
    let tableid = req.body.tableid;
    let noc = req.body.noc;
    let pkey = req.body.pkey;
    let primarykey = req.body.primary_key;
    let primaryvalue = req.body.primary_value;
    let user_name = req.user.name;
    query = `DESCRIBE ${tableid};`;
    db.query(query, (err, result) => {
      if (err) {
        console.log(err)
      }
      let header = result;
      query = `SELECT * FROM ${tableid} WHERE ${primarykey} = "${primaryvalue}"`
      db.query(query, (err, result) => {
        if (err) {
          console.log(err)
          res.redirect('/mytable');
        }
        
        res.render("editrow.ejs", {
          title: "Welcome to Table collection",
          user: user_name,
          userimg : req.user.picture,
          message: "",
          tableheader: header,
          tname: tablename,
          tid : tableid,
          tnoc : noc,
          tpkey : pkey,
          row: result,
          prikey:primarykey,
          prival:primaryvalue,
        });
      });
    });
  },
  verifyedit: (req, res,next) => {
    let tablename = req.body.tablename;
    let tableid = req.body.tableid;
    let noc = req.body.noc;
    let pkey = req.body.pkey;
    let user_name = req.user.name;
    let primarykey = req.body.primary_key;
    let primaryvalue = req.body.primary_value;

    query = `DESCRIBE ${tableid};`;
    db.query(query, (err, result) => {
      if (err) {
        console.log(err)
      }

      query = `UPDATE ${tableid}  SET `;
      
      result.forEach((header, index) => {
        query = query + `${header.Field} = "${req.body[header.Field]}",`
      });
      lastIndex = query.lastIndexOf(",");
      query = query.substring(0, lastIndex);

      query = query + `WHERE ${primarykey} = "${primaryvalue}" ;`;

      db.query(query, (err, result) => {
        if (err) {
          console.log(err)
          res.redirect('/mytable');
        }
        next()
        
      });

    });
  },
  delererow: (req, res,next) => {
    let tablename = req.body.tablename;
    let tableid = req.body.tableid;
    let noc = req.body.noc;
    let pkey = req.body.pkey;
    let user_name = req.user.name;
    let primarykey = req.body.primary_key;
    let primaryvalue = req.body.primary_value;

    query = `DELETE FROM ${tableid} WHERE ${primarykey} = "${primaryvalue}" ;`;
      db.query(query, (err, result) => {
        if (err) {
          console.log(err);
        }
        next();
      });
  
  },
};