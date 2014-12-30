'use strict';

module.exports = {
    db: 'mongodb://niedersimmentaler:tvspiez@ds057000.mongolab.com:57000/niedersimmentaler',
    app : {
        name : 'Dr Schnällscht Niedersimmentaler'
    },
    facebook : {
        clientID : 'APP_ID',
        clientSecret : 'APP_SECRET',
        callbackURL : 'http://localhost:3000/auth/facebook/callback'
    },
    twitter : {
        clientID : 'CONSUMER_KEY',
        clientSecret : 'CONSUMER_SECRET',
        callbackURL : 'http://localhost:3000/auth/twitter/callback'
    },
    github : {
        clientID : 'APP_ID',
        clientSecret : 'APP_SECRET',
        callbackURL : 'http://localhost:3000/auth/github/callback'
    },
    google : {
        clientID : 'APP_ID',
        clientSecret : 'APP_SECRET',
        callbackURL : 'http://localhost:3000/auth/google/callback'
    },
    linkedin : {
        clientID : 'API_KEY',
        clientSecret : 'SECRET_KEY',
        callbackURL : 'http://localhost:3000/auth/linkedin/callback'
    },
    emailFrom : 'niedersimmentaler@turnenspiez.ch', // sender address like ABC <abc@example.com>
    mailer : {
        host : 'mail.turnenspiez.ch',
        auth : {
            user : 'niedersimmentaler@turnenspiez.ch',
            pass : '<pass>'
        }

    }
};
