const express = require("express");
const session = require("express-session");
require("dotenv").config();
const morgan = require("morgan");
const ejs = require("ejs");
const passport = require("passport");
require("./auth.js");

const app = express();

app.use(session({ secret: "Joshua" }));
app.use(passport.initialize());
app.use(passport.session());

function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.render("index");
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

app.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/protected",
    failureRedirect: "/auth/failure",
  })
);

app.get("/auth/failure", (req, res) => {
  res.send("Failure");
});

app.get("/protected", isLoggedIn, (req, res) => {
  res.render("protected", { displayName: req.user.displayName });
});

app.get("/logout", (req, res) => {
  req.logout();
  req.session.destroy();
  res.send('Logged out');
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server up and running on ${PORT}`);
});
