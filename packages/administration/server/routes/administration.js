'use strict';

var wettkampf = require('../controllers/wettkampf');
var disziplins = require('../controllers/disziplins');

// Administration authorization helpers
var hasAuthorization = function(req, res, next) {
	if (!req.user.isAdmin) {
		return res.send(401, 'User is not authorized');
	}
	next();
};

module.exports = function(Administration, app, auth) {
	app.route('/wettkampf')
		.post(hasAuthorization, wettkampf.create)
		.get(wettkampf.get);
	
	app.route('/disziplins')
		.post(hasAuthorization, disziplins.create)
		.get(disziplins.all);
	app.route('/disziplins/:disziplinId')
		.put(auth.requiresLogin, hasAuthorization, disziplins.update)
		.delete (auth.requiresLogin, hasAuthorization, disziplins.destroy);
		
  // Finish with setting up the disziplinId param
  app.param('disziplinId', disziplins.disziplin);			
};