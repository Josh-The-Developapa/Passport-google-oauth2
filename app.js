const express = require("express");
const session = require("express-session");
require("dotenv").config();
const morgan = require("morgan");
require("ejs");
const passport = require("passport");
const mongoose = require('mongoose');
const router = require('./routes/router.js');
require("./auth.js");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.set('view engine', 'ejs');
app.use(session({ secret: 'Joshua', }));
app.use(passport.initialize());
app.use(passport.session());
app.use(router);

const dbURL = process.env.dbURL;
mongoose
  .connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to DB'))
  .catch((err) => console.log(err));

app.listen(5000, () => {
  console.log("Server up and running")
})
