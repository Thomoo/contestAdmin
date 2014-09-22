'use strict';

var competitor = require('../controllers/competitor');

// Competitor authorization helpers
var isCompetitorAdmin = function(req, res, next) {
  if (!req.user.isCompetitorAdmin()) {
    return res.send(401, 'User is not authorized');
  }
  next();
};
var isCompetitorAdminOrResultAdmin = function(req, res, next) {
  if (!req.user.isCompetitorAdmin() && !req.user.isResultAdmin()) {
    return res.send(401, 'User is not authorized');
  }
  next();
};

// The Package is past automatically as first parameter
module.exports = function(Competitor, app, auth, database) {

  app.route('/competitor')
    .get(competitor.all)
    .post(competitor.create);
//    .post(auth.requiresLogin, isCompetitorAdmin, competitor.create);

  app.route('/competitor/:competitorId')
    .get(competitor.show)
    .post(auth.requiresLogin, isCompetitorAdminOrResultAdmin, competitor.updateWithStartNr)
    .put(competitor.update)
//    .put(auth.requiresLogin, isCompetitorAdminOrResultAdmin, competitor.update)
    .delete(auth.requiresLogin, isCompetitorAdmin, competitor.destroy);

  // Finish with setting up the competitorId param
  app.param('competitorId', competitor.competitor);
};
