


/**
 * @class Route
 *
 * contains data about a route
 */
class Route{

  constructor(creator, waypoints, description){
    this.creator = creator;
    this.waypoints = waypoints;
    this.description = description;
  }


  /**
   * getCreator - Gets the creator of a route
   *
   * @return {string} - creator of the route
   */
  getCreator(){

  }


  /**
   * getWaypoints - Gets the waypoints for a route
   *
   * @return {[Location]} - list of locations mapping to points along the route
   */
  getWaypoints(){

  }


  /**
   * getDescription - Gets the description for a route
   *
   * @return {string} - description of the route
   */
  getDescription(){

  }


  /**
   * getId - gets the unique id for a route
   *
   * @return {int}  unique id
   */
  getId(){

  }

}

module.exports = Route;
