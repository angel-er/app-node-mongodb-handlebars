const password = require('passport');

const User = require('../models/User');
const passport = require('passport');

exports.renderSignUpForm = (req, res) => {
  res.render('users/signup');
};

exports.signup = async (req, res) => {
  const {name, email, password, confirm_password} = req.body;
  let errors = [];

  if (password !== confirm_password) {
    errors.push({text: 'Password do not match'});
  }

  if (password.length < 4) {
    errors.push({text: 'Password must be at least 4 characters.'});
  }

  if (errors.length > 0) {
    res.render('users/signup', {errors, email, name});
  } else {
    const emailUser = await User.findOne({email});

    if (emailUser) {
      req.flash('error_msg', 'The email is already in use');
      res.redirect('/users/signup');
    } else {
      const user = new User({name, email, password});

      user.password = await user.encryptPassword(password);

      req.flash('success_msg', 'You are resgitered');

      await user.save();

      res.redirect('/users/signin');
    }
  }
};

exports.renderSigninForm = (req, res) => {
  res.render('users/signin');
};

exports.signin = passport.authenticate('local', {
  failureRedirect: '/users/signin',
  successRedirect: '/notes',
  failureFlash: true,
});

exports.logout = (req, res) => {
  // res.send({message: 'Logout'});
  req.logout();
  req.flash('success_msg', 'You are logged out now.');
  res.redirect('/users/signin');
};

// exports.postUser = (req, res) => {
//   res.send({message: 'User Saved!'});
// };

// exports.updateUser = (req, res) => {
//   res.send({message: 'User Updated!'});
// };
