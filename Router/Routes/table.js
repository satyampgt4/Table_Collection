module.exports = {

  addnewrow: (req, res) => {
    let tablename = req.body.tablename;
    let query = `DESCRIBE ${tablename};`;
    db.query(query, (err, result) => {
      if (err) {
        console.log(err)
      }
      res.render("addnewrow.ejs", {
        title: "Welcome to Table collection",
        user: req.user.name,
        message: "",
        tableheader: result,
        tname: tablename,
      });
    });
  },
  verifynewrow: (req, res) => {
    let tablename = req.body.tablename;
    let user_name = req.user.name;
    query = `DESCRIBE ${tablename};`;
    db.query(query, (err, result) => {
      if (err) {
        console.log(err)
        res.redirect('/mytable');
      }

      let i = 1;
      query = `INSERT INTO ${tablename} (`;
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
        res.redirect('/mytable');
      });

    });
  },


  editrow: (req, res) => {
    let tablename = req.body.tablename;
    let primarykey = req.body.primary_key;
    let primaryvalue = req.body.primary_value;
    let user_name = req.user.name;
    let query = `DESCRIBE ${tablename};`;
    db.query(query, (err, result) => {
      if (err) {
        console.log(err)
      }
      let header = result;
      query = `SELECT * FROM ${tablename} WHERE ${primarykey} = "${primaryvalue}"`
      db.query(query, (err, result) => {
        if (err) {
          console.log(err)
          res.redirect('/mytable');
        }
        
        res.render("editrow.ejs", {
          title: "Welcome to Table collection",
          user: user_name,
          message: "",
          tableheader: header,
          tname: tablename,
          row: result,
          prikey:primarykey,
          prival:primaryvalue,
        });
      });
    });
  },
  verifyedit: (req, res) => {
    let tablename = req.body.tablename;
    let user_name = req.user.name;
    let primarykey = req.body.primary_key;
    let primaryvalue = req.body.primary_value;

    query = `DESCRIBE ${tablename};`;
    db.query(query, (err, result) => {
      if (err) {
        console.log(err)
      }

      query = `UPDATE ${tablename}  SET `;
      
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
        res.redirect('/mytable');
      });

    });
  },

};