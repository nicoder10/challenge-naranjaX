'use strict';
const { Router, response } = require('express');
const itineraryRepository = require('../../repositories/itineraryRepository');

module.exports = {
    Router,
    response,
    itineraryRepository
}