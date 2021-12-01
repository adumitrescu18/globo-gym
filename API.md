Create a new report. 
POST /api/reports
Params: 
    {string} creator - creator of the route
    {Waypoint} location1 - location 1 of the report
    {Waypoint} location2 - location 2 of the report
    {string} type - one of [“traffic”, “crime”, “blockage”, “construction”]
    {string} description - description of the route
Throws:
    {200} - if the report is successfully created
    {400} - if the report name already exists


Get a list of all reports created so far.
GET /api/reports
Throws: 
    {200} - if we get back all the reports


A user other than the creator confirms a report.
PATCH /api/reports
Params:
    {string} reportName - the unique report identifier
    {string} confirmer - the user confirming the report
Throws:
    {200} - if the report is successfully confirmed
    {404} - if the report does not exist
    {400} - if the user already confirmed this report


Get a number of confirmations for a report.
GET /api/reports/confirmations
Params:
    {string} reportName - the unique report identifier
Throws:
    {200} - if we get back the number of confirmations
    {404} - if the report does not exist


Delete a report.
DELETE /api/reports
Params:
    {string} reportName - the unique report identifier
Throws:
    {200} - if the report is succeasfully deleted
    {404} - if the report does not exist


Create a new route.
POST /api/routes
Params:
    {string} creator - creator of the route
    {[Waypoint]} waypoints - waypoints along the route
    {string} description - description of the route
Throws:
    {200} - if the route is successfully created
    {400} - if the route name already exists


Get all routes created so far.
GET /api/routes
Throws:
    {200} - if we get back all the routes


A user makes their route public or private.
PATCH /api/routes
Params:
    {string} routeName - the unique route identifier
    {string} public - the new privacy setting for the route
Throws:
    {200} - if the route is successfully changed to public or private
    {404} - if the route does not exist


Delete a route.
DELETE /api/routes
Params:
    {string} routeName - the unique route identifier
Throw: 
    {200} - if the route is succeasfully deleted
    {404} - if the route does not exist


Authenticate a user.
POST /api/session
Params:
    {string} username - the user's username
    {string} password - the user's password
Throws:
    {200} - if the user successfully signs in
    {400} - if the user's password is incorrect
 */


Create a user.
POST /api/session
Params:
    {string} username - the user's username
    {string} password - the user's password
Throws:
    {200} - if the user successfully creates an account
    {400} - if the user's username length is 0 or the username is not unique








