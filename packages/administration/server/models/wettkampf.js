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
  infoText: {
    type: String,
    required: true,
    trim: true
  },
  anmeldungActive: {
    type: Boolean,
    required: true
  }
});

/**
 * Validations
 */
WettkampfSchema.path('title').validate(function(title) {
  return !!title;
}, 'Title cannot be blank');

WettkampfSchema.path('infoText').validate(function(infoText) {
  return !!infoText;
}, 'Info Text cannot be blank');

/**
 * Statics
 */
// WettkampfSchema.statics.load = function(id, cb) {
  // this.findOne({
    // _id: id
  // }).populate('user', 'name username').exec(cb);
// };

mongoose.model('Wettkampf', WettkampfSchema);
