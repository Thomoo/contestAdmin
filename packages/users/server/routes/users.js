'use strict';

// User routes use users controller
var users = require('../controllers/users');

module.exports = function(MeanUser, app, auth, database, passport) {

  app.route('/logout')
    .get(users.signout);
  app.route('/users/me')
    .get(users.me);
  app.route('/users')
    .get(users.all);
  app.route('/reset/:token')
    .post(users.resetpassword);

  // Setting up the userId param
  app.param('userId', users.user);

  // AngularJS route to check for authentication
  app.route('/loggedin')
    .get(function(req, res) {
      res.send(req.isAuthenticated() ? req.user : '0');
    });
  app.route('/isAdmin')
    .get(function(req, res) {
      res.send(req.user && req.user.isAdmin() ? req.user : '0');
    });
  app.route('/isResultAdmin')
    .get(function(req, res) {
      res.send(req.user && req.user.isResultAdmin() ? req.user : '0');
    });
  app.route('/isCompetitorAdmin')
    .get(function(req, res) {
      res.send(req.user && req.user.isCompetitorAdmin() ? req.user : '0');
    });

  // Setting the local strategy route
  app.route('/login')
    .post(passport.authenticate('local', {
      failureFlash: true
    }), function(req, res) {
      res.send({
        user: req.user,
        redirect: (req.user.roles.indexOf('admin') !== -1) ? req.get('referer') : false
      });
    });

};
