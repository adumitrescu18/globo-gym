let data = [];
let routeId = 0;
const Route = require("./Route");


/**
 * @class Routes
 *
 * Contains and updates data about routes
 */
class Routes{


  /**
   * @static createRoute - creates a new route
   *
   * @param  {string} creator - description
   * @param  {[Waypoint]} waypoints - description
   * @param  {string} description - description
   * @return {Route} - the newly created route
   */
  static createRoute(creator, waypoints, description){
    const route = new Route(creator, waypoints, description, routeId);
    routeId++;
    data.push(route);
    return route
  }


  /**
   * @static getAllRoutes - return all routes in the system
   *
   * @return {[Route]}
   */
  static getAllRoutes(){
    return data;
  }

}

module.exports = Routes
