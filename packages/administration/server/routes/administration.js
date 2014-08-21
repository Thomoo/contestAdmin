'use strict';

// The Package is past automatically as first parameter
module.exports = function(Administration, app, auth, database) {

  app.get('/administration/example/anyone', function(req, res, next) {
    res.send('Anyone can access this');
  });

  app.get('/administration/example/auth', auth.requiresLogin, function(req, res, next) {
    res.send('Only authenticated users can access this');
  });

  app.get('/administration/example/admin', auth.requiresAdmin, function(req, res, next) {
    res.send('Only users with Admin role can access this');
  });

  app.get('/administration/example/render', function(req, res, next) {
    Administration.render('index', {
      package: 'administration'
    }, function(err, html) {
      //Rendering a view from the Package server/views
      res.send(html);
    });
  });
};
