let database = require("../database");

let authController = {
  login: (req, res) => {
    res.locals.page = "login";
    res.render("auth/login");
  },

  register: (req, res) => {
    res.locals.page = "register";
    let userData = {
      user: req.body.username,
    };
    res.render("auth/register", { username: userData });
  },

  loginSubmit: (req, res) => {
    let username = req.body.username.split("@")[0];
    if (database[username] && database[username].password === req.body.password) {
      req.session["user"] = username;
      res.redirect("/numbers");
    } else {
      res.send("incorrect username or password");
    }
  },

  registerSubmit: (req, res) => {
    let username = req.body.username.split("@")[0];
    if (req.body.username && req.body.password) {
      database[username] = { username: username, password: req.body.password, reminders: [] };
      req.session["user"] = username;
      res.redirect("/numbers");
    } else {
      res.send("incorrect username or password");
    }
  },
};

module.exports = authController;
