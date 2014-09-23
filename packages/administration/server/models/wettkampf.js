'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


/**
 * Wettkampf Schema
 */
var WettkampfSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },	
  title: {
    type: String,
    required: true,
    trim: true
  },
  infoTextActive: {
    type: String,
    required: true,
    trim: true
  },
  infoTextInactive: {
    type: String,
    required: true,
    trim: true
  },
  anmeldungActive: {
    type: Boolean,
    required: false
  }
});

/**
 * Validations
 */
WettkampfSchema.path('title').validate(function(title) {
  return !!title;
}, 'Title cannot be blank');

WettkampfSchema.path('infoTextActive').validate(function(infoTextActive) {
  return !!infoTextActive;
}, 'Info Text cannot be blank');

WettkampfSchema.path('infoTextInactive').validate(function(infoTextInactive) {
  return !!infoTextInactive;
}, 'Info Text cannot be blank');


mongoose.model('Wettkampf', WettkampfSchema);
