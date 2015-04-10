'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var DisciplineResultSchema = new Schema({
  disciplineId: {
    type: Schema.ObjectId,
    required: true,
    ref: 'Disziplin'
  },
  result: {
    type: String,
    required: false,
    trim: true
  },
  rank: {
  	type: Number,
    required: false,
  	trim: true
  },
  printRank: {
  	type: String,
    required: false,
  	trim: true
  },
  award: {
  	type: String,
    required: false,
  	trim: true
  }
});

/**
 * Competitor Schema
 */
var CompetitorSchema = new Schema({
  created: {
      type: Date,
      default: Date.now
  },
  gender: {
    type: String,
    required: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  firstname: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    type: String,
    required: true,
    trim: true
  },
  zip: {
    type: Number,
    required: true,
    trim: true
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  society: {
    type: String,
    required: false,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  birthdate: {
    type: Date,
    required: true,
    trim: true
  },
  startnr: {
    type: Number,
    required: false,
  },
  disciplines: {
  	type: [DisciplineResultSchema]
  }
});


/**
 * Statics
 */
CompetitorSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  }).exec(cb);
};


mongoose.model('Competitor', CompetitorSchema);
