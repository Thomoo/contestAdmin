'use strict';

var competitor = require('../controllers/competitor');

// Competitor authorization helpers
var hasAuthorization = function(req, res, next) {
  if (!req.user.isAdmin && req.competitor.user.id !== req.user.id) {
    return res.send(401, 'User is not authorized');
  }
  next();
};

// The Package is past automatically as first parameter
module.exports = function(Competitor, app, auth, database) {

  app.route('/competitor')
    .get(competitor.all)
    .post(auth.requiresLogin, competitor.create);

  app.route('/competitor/:competitorId')
    .get(competitor.show)
    .put(auth.requiresLogin, hasAuthorization, competitor.update)
    .delete(auth.requiresLogin, hasAuthorization, competitor.destroy);

  app.get('/competitor/example/anyone', function(req, res, next) {
    res.send('Anyone can access this');
  });

  app.get('/competitor/example/auth', auth.requiresLogin, function(req, res, next) {
    res.send('Only authenticated users can access this');
  });

  app.get('/competitor/example/admin', auth.requiresAdmin, function(req, res, next) {
    res.send('Only users with Admin role can access this');
  });

  app.get('/competitor/example/render', function(req, res, next) {
    Competitor.render('index', {
      package: 'competitor'
    }, function(err, html) {
      //Rendering a view from the Package server/views
      res.send(html);
    });
  });
};
