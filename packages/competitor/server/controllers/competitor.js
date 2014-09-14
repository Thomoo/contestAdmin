'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Competitor = mongoose.model('Competitor'),
//  Disziplin = mongoose.model('Disziplin'),
  _ = require('lodash');


/**
 * Find competitor by id
 */
exports.competitor = function(req, res, next, id) {
  Competitor.load(id, function(err, competitor) {
    if (err) return next(err);
    if (!competitor) return next(new Error('Failed to load competitor ' + id));
    req.competitor = competitor;
    next();
  });
};

/**
 * Create a competitor
 */
exports.create = function(req, res) {
  var competitor = new Competitor(req.body);
  competitor.user = req.user;

  competitor.save(function(err) {
    if (err) {
      return res.json(500, {
        error: 'Cannot save the competitor'
      });
    }
    res.json(competitor);

  });
};

/**
 * Update a competitor
 */
exports.update = function(req, res) {
  var competitor = req.competitor;

  competitor = _.extend(competitor, req.body);

  competitor.save(function(err) {
    if (err) {
      return res.json(500, {
        error: 'Cannot update the competitor'
      });
    }
    res.json(competitor);

  });
};

/**
 * Delete a competitor
 */
exports.destroy = function(req, res) {
  var competitor = req.competitor;

  competitor.remove(function(err) {
    if (err) {
      return res.json(500, {
        error: 'Cannot delete the competitor'
      });
    }
    res.json(competitor);

  });
};

/**
 * Show a competitor
 */
exports.show = function(req, res) {
  res.json(req.competitor);
};

/**
 * List of Competitors
 */
exports.all = function(req, res) {
  Competitor.find().sort('-created').populate('user', 'name username').exec(function(err, competitors) {
    if (err) {
      return res.json(500, {
        error: 'Cannot list the competitors'
      });
    }
    res.json(competitors);

  });
};
