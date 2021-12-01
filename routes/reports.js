const express = require('express');

const controller = require('./reports-controller.js')

const Reports = require('../models/Reports');

const router = express.Router();

const validateThat = require('./middleware');

/**
 * Create a new report. 
 *
 * @name POST /api/reports
 *
 * @param {string} creator - creator of the route
 * @param {Waypoint} location1 - location 1 of the report
 * @param {Waypoint} location2 - location 2 of the report
 * @param {string} type - one of [“traffic”, “crime”, “blockage”, “construction”]
 * @param {string} description - description of the route
 * 
 * @throws {200} - if the report is successfully created
 * @throws {400} - if the report name already exists
 */
router.post('/', [validateThat.reportNameDoesNotAlreadyExist], async (req, res) => {
    const creator = req.body.creator;
    const coordinates = req.body.coordinates;
    const type = req.body.type;
    const description = req.body.description;
    const reportName = type + " " + description;
    const report = await controller.addReport(reportName, creator,
      coordinates[0], coordinates[1],
      type, description);
    res.status(200).json(report).end();
});

/**
 * Get a list of all reports created so far.
 *
 * @name GET /api/reports
 * 
 * @throws {200} - if we get back all the reports
 */
router.get('/', async (req, res) => {

    const reports = await controller.getAllReports();
    console.log(reports);
    res.status(200).json(reports).end();
});

/**
 * A user other than the creator confirms a report.
 *
 * @name PATCH /api/reports
 * 
 * @param {string} reportName - the unique report identifier
 * @param {string} confirmer - the user confirming the report
 * 
 * @throws {200} - if the report is successfully confirmed
 * @throws {404} - if the report does not exist
 * @throws {400} - if the user already confirmed this report
 */
router.patch('/', [validateThat.reportExists, validateThat.noDuplicateConfirmations], async (req, res) => {
    const reportName = req.body.reportName;
    const confirmer = req.body.confirmer;
    const report = await controller.confirmReport(reportName, confirmer);
    res.status(200).json(report).end();
});

/**
 * Get a number of confirmations for a report.
 *
 * @name GET /api/reports/confirmations
 * 
 * @param {string} reportName - the unique report identifier
 * 
 * @throws {200} - if we get back the number of confirmations
 * @throws {404} - if the report does not exist
 */
router.get('/confirmations', [validateThat.reportExists], async (req, res) => {
    const reportName = req.query.reportName;
    const confirmations = await controller.numberOfConfirmations(reportName);
    res.status(200).json(confirmations).end();
});

/**
 * Delete a report.
 *
 * @name DELETE /api/reports
 * 
 * @param {string} reportName - the unique report identifier
 * 
 * @throws {200} - if the report is succeasfully deleted
 * @throws {404} - if the report does not exist
 */
router.delete('/', [validateThat.reportExists], async (req, res) => {
    const reportName = req.body.reportName;
    const report = await controller.deleteReport(reportName);
    res.status(200).json(report).end();
});

module.exports = router;
