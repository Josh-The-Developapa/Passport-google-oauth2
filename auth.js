const User = require('./models/user.js');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:5000/google/callback",
  passReqToCallback: true
},
  function (request, accessToken, refreshToken, profile, done) {
    let name = profile.displayName;
    let googleId = profile.id;
    let email = profile.emails[0].value;

    User.findOrCreate({ name, googleId, email }, function (err, user) {
      return done(err, user);
    });
  }
));

passport.serializeUser(function (user, done) {
  done(null, user)
});

passport.deserializeUser(function (user, done) {
  done(null, user)
});