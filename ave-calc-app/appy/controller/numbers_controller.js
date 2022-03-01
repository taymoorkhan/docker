let database = require("../database");
const mysql = require("mysql");
const { MongoClient } = require("mongodb");

let numbersController = {
  list: async (req, res) => {
    const con = mysql.createConnection({
      host: "localhost",
      user: "username",
      password: "password",
      database: "numbers",
      port: 3306,
      socketPath: '/var/run/mysqld/mysqld.sock'
    });
    con.connect(function (err) {
      if (err) throw err;
      con.query(`select * from nums;`, function (err, result, fields) {
        if (err) throw err;
        res.render("number/index", { numbers: JSON.parse(JSON.stringify(result)) });
      });
    });
  },

  new: (req, res) => {
    res.locals.page = "create";
    res.render("number/create");
  },

  // Create a reminder
  create: (req, res) => {
    let description = req?.body?.description?.split(" ");
    let desc = [];
    description.forEach((num) => {
      desc.push(`(${num})`);
    });
    const con = mysql.createConnection({
      host: "localhost",
      user: "username",
      password: "password",
      database: "numbers",
      port: 3306,
      socketPath: '/var/run/mysqld/mysqld.sock'
    });

    con.connect(function (err) {
      if (err) throw err;
      con.query(`insert into nums (numbers) values ${desc.join(",")}`, function (err, result) {
        if (err) throw err;
        console.log("Done: " + result);
      });
    });

    res.redirect("/numbers");
  },

  delete: (req, res) => {
    console.log("called");
    const con = mysql.createConnection({
      host: "localhost",
      user: "username",
      password: "password",
      database: "numbers",
      port: 3306
    });

    con.connect(function (err) {
      if (err) throw err;
      con.query(`delete from nums`, function (err, result) {
        if (err) throw err;
        console.log("Done: " + result);
      });
    });

    res.redirect("/numbers");
  },
  listAnalytics: async (req, res) => {
    const url = "mongodb://localhost:27017";
    MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
      if (err) throw err;

      const db = client.db("analytics");

      db.collection("analytics")
        .find({})
        .toArray()
        .then((docs) => {
          console.log(docs[0].avg);
          res.locals.page = "analytics";
          res.render("number/analytics", { avg: docs[0].avg });
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          client.close();
        });
    });
  },
};

module.exports = numbersController;
