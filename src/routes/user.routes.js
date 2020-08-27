const {Router} = require('express');
const router = Router();

const {UsersController} = require('../controllers');

module.exports = (() => {
  router.get('/signup', UsersController.renderSignUpForm);
  router.post('/signup', UsersController.signup);
  router.get('/signin', UsersController.renderSigninForm);
  router.post('/signin', UsersController.signin);
  router.get('/logout', UsersController.logout);

  return router;
})();
