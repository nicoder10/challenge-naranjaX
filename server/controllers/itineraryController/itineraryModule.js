"use strict";
const { response, Router } = require("express")
const Itinerary = require("../../database/models/itineraryModel")

module.exports  = { Itinerary, response, Router };