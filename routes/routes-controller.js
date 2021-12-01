const Route = require('../models/RouteSchema');
const User = require('../models/UserSchema');

async function getAllRoutes(){
  try{
    const routes = await Route.aggregate([
      {$lookup:
        {
          from: 'users',
          localField: 'route_creator_id',
          foreignField: '_id',
          as: 'routeswithusers'
        }
      }
    ]);
    return routes;
  } catch(err) {
    return false;
  }
}

async function findRoute(name){
  try{
    const route = await Route.findOne({route_name: name}); //We make sure that names are unique
    
    return route;
  } catch(err) {
    return false;
  }
}

async function addRoute(name, creator, start, end, description, private) {
  try {
    const route = new Route({
      route_name: name,
      route_creator_id: creator,
      route_start_coordinate: start,
      route_end_coordinate: end,
      route_description: description,
    });
    console.log("yuh");
    await route.save();
    return route;
  } catch(err) {
    console.log(err);
    return false;
  }     
} 

async function publicizeRoute(name, public){
    try{
      const route = await Route.findOne({route_name: name});
      route.route_public = public;
      return route;
    } catch(err) {
      return false;
    }
  }

//add deleteOne
async function deleteRoute(name){
  try{
    const route = await Route.deleteOne({route_name: name});
    return route;
  } catch(err) {
    return false;
  }
}

module.exports = Object.freeze({
  getAllRoutes,
  findRoute,
  addRoute,
  publicizeRoute,
  deleteRoute
});