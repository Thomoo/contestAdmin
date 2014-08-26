'use strict';

var wettkampf = require('../controllers/wettkampf');

// Administration authorization helpers
var hasAuthorization = function(req, res, next) {
  if (!req.user.isAdmin) {
    return res.send(401, 'User is not authorized');
  }
  next();
};

module.exports = function(Wettkampf, app, auth) {
  app.route('/wettkampf')
    .post(hasAuthorization, wettkampf.create)
    .get(wettkampf.get);
};