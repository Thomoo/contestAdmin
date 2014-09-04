'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


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
    type: String,
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
    type: String,
    required: false,
    trim: true
  },
  startnrfetched: {
    type: Boolean,
    required: true,
    default: false
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

/**
 * Validations
 */
// ArticleSchema.path('title').validate(function(title) {
  // return !!title;
// }, 'Title cannot be blank');
// 
// ArticleSchema.path('content').validate(function(content) {
  // return !!content;
// }, 'Content cannot be blank');

/**
 * Statics
 */
CompetitorSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  }).populate('user', 'name username').exec(cb);
};

mongoose.model('Competitor', CompetitorSchema);
