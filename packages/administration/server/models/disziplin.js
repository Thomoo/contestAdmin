'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


/**
 * Disziplin Schema
 */
var DisziplinSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },	
  disziplin: {
    type: String,
    required: true,
    trim: true
  },
  bezeichnung: {
    type: String,
    required: true,
    trim: true
  },
  jahrgang_von: {
    type: Number,
    required: true
  },
  jahrgang_bis: {
    type: Number,
    required: true
  },
  geschlecht: {
    type: String,
    enum: ['m', 'f', 'both'],
    required: true,
    trim: true
  },
  format: {
    type: String,
    required: false,
    trim: true
  },
  sortierung: {
    type: String,
    enum: ['ASC', 'DESC'],
    required: false,
    trim: true,
    default: 'ASC'
  }
});

/**
 * Validations
 */
DisziplinSchema.path('jahrgang_bis').validate(function(jahrgang_bis) {
  return this.jahrgang_von < jahrgang_bis;
}, 'jahrgang_bis must be smaller than jahrgang_von');

mongoose.model('Disziplin', DisziplinSchema);
