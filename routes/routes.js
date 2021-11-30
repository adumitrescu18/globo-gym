const express = require('express');

const Routes = require('../models/Routes');

const router = express.Router();


/**
 * Post a route
 *
 * @name POST /api/routes
 *
 * @param {string} creator - creator of the route
 * @param {[Waypoint]} waypoints - waypoints along the route
 * @param {string} description - description of the route
 */
router.post('/', (req, res) => {
    creator = req.body.creator;
    waypoints = req.body.waypoints;
    description = req.body.description;
    route = Routes.createRoute(creator, waypoints, description)
    res.status(200).json(route).end();
});

/**
 * Get all routes
 *
 * @name GET /api/routes
 */
router.get('/', (req, res) => {
    const routes = Routes.getAllRoutes()
    res.status(200).json(routes).end();
});

module.exports = router;
