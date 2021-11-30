const express = require('express');

const Reports = require('../models/Reports');

const router = express.Router();


/**
 * Post a new report
 *
 * @name POST /api/reports
 *
 * @param {string} creator - creator of the route
 * @param {Waypoint} location - location of the route
 * @param {string} type - one of [“traffic”, “crime”, “blockage”, “construction”]
 * @param {string} description - description of the route
 */
router.post('/', (req, res) => {
    creator = req.body.creator
    location = req.body.location
    type = req.body.type
    description = req.body.description
    const report = Reports.createReport(creator, location, type, description)
    res.status(200).json(report).end();
});

/**
 * Get all reports
 *
 * @name GET /api/reports
 */
router.get('/', (req, res) => {
    const reports = Reports.getAllReports()
    res.status(200).json(reports).end();
});

module.exports = router;
