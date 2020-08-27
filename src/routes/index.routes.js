const {Router} = require('express');
const router = Router();
const {IndexController} = require('../controllers');

module.exports = (() => {
  router.get('/', IndexController.getIndex);

  router.get('/about', IndexController.getAbout);

  return router;
})();
