const passport = require('passport');
const {Passport} = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/User');

// passport.use(
//   // 'login',
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      // Match is exists Email
      const user = await User.findOne({email});
      if (!user) {
        return done(null, false, {message: 'Not user found'});
      } else {
        // Match password's User
        const match = await user.matchPassword(password);
        if (match) {
          return done(null, user);
        } else {
          return done(null, false, {message: 'Incorrect Password'});
        }
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});
