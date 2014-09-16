'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'), Disziplin = mongoose.model('Disziplin'), _ = require('lodash');

/**
 * Find disziplin by id
 */
exports.disziplin = function(req, res, next, id) {
	Disziplin.load(id, function(err, disziplin) {
		if (err)
			return next(err);
		if (!disziplin)
			return next(new Error('Failed to load disziplin ' + id));
		req.disziplin = disziplin;
		next();
	});
};

/**
 * Create a disziplin
 */
exports.create = function(req, res) {
	var disziplin = new Disziplin(req.body);

	disziplin.save(function(err) {
		if (err) {
			return res.status(500).json({
				error : 'Cannot save the disziplin' + err
			});
		}
		res.json(disziplin);
	});
};

/**
 * Update a disziplin
 */
exports.update = function(req, res) {
	var disziplin = req.disziplin;

	disziplin = _.extend(disziplin, req.body);

	disziplin.save(function(err) {
		if (err) {
			return res.status(500).json({
				error : 'Cannot update the disziplin' + err
			});
		}
		res.json(disziplin);

	});
};

/**
 * Delete a disziplin
 */
exports.destroy = function(req, res) {
	console.log('destroy on server');
	var disziplin = req.disziplin;

	disziplin.remove(function(err) {
		if (err) {
			return res.status(500).json({
				error : 'Cannot delete the disziplin' + err
			});
		}
		res.json(disziplin);
	});
};

/**
 * List of Disziplins
 */
exports.all = function(req, res) {
	Disziplin.find().sort('+created').exec(function(err, disziplins) {
		if (err) {
			return res.status(500).json({
				error : 'Cannot list the disziplins' + err
			});
		}
		res.json(disziplins);

	});
}; 