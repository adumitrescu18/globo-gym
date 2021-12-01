const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RouteSchema = new Schema(
    {
        // note that we don't have a route_id field, by default mongoDB creates this field, which is our Primary Key
        "route_name": {
            type: String,
            required: true,
        },
        // foreign key reference
        "route_creator_id": {
            type: String, 
            ref: "User",
            required: true,
        },
        "route_is_private": {
            type: Boolean, 
            required: true,
            default: true,
        },
        "route_start_coordinate": {
            type: Object,
            required: true,
        },
        "route_end_coordinate": {
            type: Object,
            required: true,
        },
        "route_description": {
            type: String,
            required: true,
        },
    }
);

// mongoose will automatically create the collection for our DB
module.exports = mongoose.model("Route", RouteSchema);