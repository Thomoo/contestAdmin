'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'), Wettkampf = mongoose.model('Wettkampf'), _ = require('lodash');

var removeOtherEntries = function(wettkampf) {
	Wettkampf.where('_id').ne(wettkampf._id).exec(function(err, wettkaempfe) {
		_.each(wettkaempfe, function(wettkampf) {
			wettkampf.remove(function(err) {
			});
		});
	});
};

/**
 * Create a wettkampf
 */
exports.create = function(req, res) {
	var wettkampf = new Wettkampf(req.body);

	wettkampf.save(function(err) {
		if (err) {
			return res.status(500).json({
				error : 'Cannot save the wettkampf' + err
			});
		}
		removeOtherEntries(wettkampf);
		res.json(wettkampf);

	});
};

/**
 * Get Wettkampf
 */
exports.get = function(req, res) {
	console.log('> get()');
	Wettkampf.findOne().sort('-created').exec(function(err, wettkampf) {
		if (err) {
	console.log('err: ' + err);
			return res.status(500).json({
				error : 'Cannot get the wettkampf'
			});
		}
		
		console.log('found: ' + wettkampf);
		res.json(wettkampf);

	});
};
