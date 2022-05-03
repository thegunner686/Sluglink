// The Cloud Functions for Firebase SDK to create Cloud Functions and set up triggers.
const functions = require('firebase-functions');

exports.orgsignup = require('./orgsignup');

exports.auth = require('./auth');

exports.post = require('./post');

exports.users = require('./users');