'use strict';

// The Package is past automatically as first parameter
module.exports = function(Result, app, auth, database) {

  app.get('/result/example/anyone', function(req, res, next) {
    res.send('Anyone can access this');
  });

  app.get('/result/example/auth', auth.requiresLogin, function(req, res, next) {
    res.send('Only authenticated users can access this');
  });

  app.get('/result/example/admin', auth.requiresAdmin, function(req, res, next) {
    res.send('Only users with Admin role can access this');
  });

  app.get('/result/example/render', function(req, res, next) {
    Result.render('index', {
      package: 'result'
    }, function(err, html) {
      //Rendering a view from the Package server/views
      res.send(html);
    });
  });
};
