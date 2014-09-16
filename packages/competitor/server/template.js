'use strict';

module.exports = {
  confirmation_email: function(req, competitor, mailOptions) {
    mailOptions.html = [
      'Hallo ' + competitor.firstname + ' ' + competitor.name + ',',
      'Vielen Dank für Deine Anmeldung.',
      'Du kannst Deine Angaben jederzeit unter folgendem Link einsehen und allenfalls korrigieren:',
      'http://' + req.headers.host + '/#!/competitor/' + competitor._id,
      'Nach dem Wettkampf kannst Du unter diesem Link auch Deine Resultate einsehen.',
    ].join('\n\n');
    mailOptions.subject = 'Anmeldebestätigung';
    return mailOptions;
  }
};
