'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'), Competitor = mongoose.model('Competitor'), _ = require('lodash'), async = require('async'), config = require('meanio').loadConfig(), nodemailer = require('nodemailer'), templates = require('../template');

/**
 * Send confirmation email
 */
function sendMail(mailOptions) {
    var transport = nodemailer.createTransport('SMTP', config.mailer);
    console.info('sendMail...: ' + JSON.stringify(mailOptions));
    transport.sendMail(mailOptions, function(err, response) {
        if (err) {
            console.info('error sending email...:' + err);
            return err;
        }
        return response;
    });
}

/**
 * Callback for forgot password link
 */
var sendConfirmationMail = function(req, competitor) {
    async.waterfall([

    function() {
        var mailOptions = {
            to : competitor.email,
            from : config.emailFrom
        };
        mailOptions = templates.confirmation_email(req, competitor, mailOptions);
        return sendMail(mailOptions);
    }], function(err) {
        console.log('error: ' + err);
        var response = {
            message : 'Mail successfully sent',
            status : 'success'
        };
        if (err) {
            response.message = 'Sending Mail failed';
            response.status = 'danger';
        }
        //            return response;
        //  res.json(response);
    });
};

/**
 * Find competitor by id
 */
exports.competitor = function(req, res, next, id) {
    Competitor.load(id, function(err, competitor) {
        if (err)
            return next(err);
        if (!competitor)
            return next(new Error('Failed to load competitor ' + id));
        req.competitor = competitor;
        next();
    });
};

/**
 * Create a competitor
 */
exports.create = function(req, res) {
    var competitor = new Competitor(req.body);

    competitor.save(function(err) {
        if (err) {
            return res.json(500, {
                error : 'Cannot save the competitor'
            });
        }
        console.log(JSON.stringify(sendConfirmationMail(req, competitor)));
        res.json(competitor);

    });
};



function saveCompetitor(res, competitor){
    return competitor.save(function(err) {
        if (err) {
            return res.json(500, {
                error: 'Cannot update the competitor'
            });
        }

    });
}


exports.updateWithStartNr = function(req, res) {

    console.info('updateWithStartNr');

    var competitor = req.competitor;

    competitor = _.extend(competitor, req.body);

    if(competitor.startnr){
        // startnr already exists, remove it
        competitor.startnr = undefined;
        saveCompetitor(res, competitor);

        res.json(competitor);

        return;
    }

    Competitor.findOne().sort('-startnr').exec(function(err, highestCompetitor) {
        if (err) {
            console.log('err: ' + err);
            return res.status(500).json({
                error: 'Cannot generate a new startnr'
            });
        }

        competitor.startnr = highestCompetitor.startnr ? highestCompetitor.startnr + 1 : 1;

        competitor = _.extend(competitor, req.body);

        saveCompetitor(res, competitor);

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
                error : 'Cannot update the competitor'
            });
        }
        res.json(competitor);

    });
};

/**
 * Delete a competitor
 */
exports.destroy = function(req, res) {

    console.info('deleting user');

  var competitor = req.competitor;

    competitor.remove(function(err) {
        if (err) {
            return res.json(500, {
                error : 'Cannot delete the competitor'
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
    Competitor.find().sort('-created').exec(function(err, competitors) {
        //  Competitor.find().sort('-created').populate('user', 'name username').exec(function(err, competitors) {
        if (err) {
            return res.json(500, {
                error : 'Cannot list the competitors'
            });
        }
        res.json(competitors);

    });

};
