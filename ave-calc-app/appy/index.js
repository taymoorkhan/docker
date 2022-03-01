const express = require("express");
const app = express();
const path = require("path");
const ejsLayouts = require("express-ejs-layouts");
const numbersController = require("./controller/numbers_controller");
const authController = require("./controller/auth_controller");
const authCheck = require("./auth_functions/authcheck");
const cookieSession = require("cookie-session");

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: false }));

app.use(ejsLayouts);

app.use(
  cookieSession({
    name: "session",
    keys: ["aaa", "bbb", "ccc"],
    maxAge: 10 * 24 * 3600 * 1000,
  })
);

app.set("view engine", "ejs");
// Routes start here

app.get("/numbers", authCheck, numbersController.list);
app.get("/numbers/delete", authCheck, numbersController.delete);
app.get("/numbers/analytics", authCheck, numbersController.listAnalytics);

// Create a Reminder
app.get("/number/new", authCheck, numbersController.new);
app.post("/number/", authCheck, numbersController.create);

// Authentication
app.get("/register", authController.register);
app.post("/register", authController.registerSubmit);

app.get("/login", authController.login);
app.post("/login", authController.loginSubmit);

app.listen(3001, function () {
  console.log("Server running. Visit: localhost:3001/ in your browser 🚀");
});
