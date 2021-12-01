const express = require('express');

const controller = require('./routes-controller.js')

const Routes = require('../models/Routes');

const router = express.Router();

const validateThat = require('./middleware');


/**
 * Create a new route.
 *
 * @name POST /api/routes
 *
 * @param {string} creator - creator of the route
 * @param {[coordinates]} coordinates - waypoints along the route
 * @param {string} description - description of the route
 * 
 * @throws {200} - if the route is successfully created
 * @throws {400} - if the route name already exists
 */
router.post('/', [validateThat.routeNameDoesNotAlreadyExist], async (req, res) => {
    const creator = req.body.creator;
    const coordinates = req.body.coordinates;
    const description = req.body.description;
    const routeName = req.body.title;
    // const privacy = req.body.private;
    const route = await controller.addRoute(routeName, creator, coordinates[0], coordinates[1], description)
    res.status(200).json(route).end();
});

/**
 * Get all routes created so far.
 *
 * @name GET /api/routes
 * 
 * @throws {200} - if we get back all the routes
 */
router.get('/', async (req, res) => {
    const routes = await controller.getAllRoutes()
    res.status(200).json(routes).end();
});


/**
 * A user makes their route public or private.
 *
 * @name PATCH /api/routes
 * 
 * @param {string} routeName - the unique route identifier
 * @param {string} public - the new privacy setting for the route
 * 
 * @throws {200} - if the route is successfully changed to public or private
 * @throws {404} - if the route does not exist
 */
router.patch('/', [validateThat.routeExists], async (req, res) => {
    const routeName = req.body.routeName;
    const publicize = req.body.public;
    const routes = await controller.publicizeRoute(routeName, publicize);
    res.status(200).json(routes).end();
});

/**
 * Delete a route.
 *
 * @name DELETE /api/routes
 * 
 * @param {string} routeName - the unique route identifier
 * 
 * @throws {200} - if the route is succeasfully deleted
 * @throws {404} - if the route does not exist
 */
router.delete('/', [validateThat.routeExists], async (req, res) => {
    const routeName = req.body.routeName;
    const routes = await controller.deleteRoute(routeName);
    res.status(200).json(routes).end();
});

module.exports = router;
