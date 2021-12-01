const reports_controller = require('./reports-controller');
const routes_controller = require('./routes-controller')

// Checks that the report name in the request body does not already exist
const reportNameDoesNotAlreadyExist = async (req, res, next) => {
  const type = req.body.type;
  const description = req.body.description;
  const reportName = type + " " + description;
  const report = await reports_controller.findReport(reportName);
  if (report) {
    res.status(400).json({
      error: `Report type and description already exists.`,
    }).end();
    return;
  }
  next();
};

// Checks that the report from the report name in the request body exists
const reportExists = async (req, res, next) => {
  const report1 = await reports_controller.findReport(req.body.reportName);
  const report2 = await reports_controller.findReport(req.query.reportName);
  if (!(report1 || report2)) {
    res.status(404).json({
      error: `Report does not exist.`,
    }).end();
    return;
  }
  next();
};

// Checks that the report name in the request body does not already exist
const noDuplicateConfirmations = async (req, res, next) => {
    const report = await reports_controller.findReport(req.body.reportName);
    if (report.report_confirmations.includes(req.body.confirmer)) {
      res.status(400).json({
        error: `User already confirmed report.`,
      }).end();
      return;
    }
    next();
  };

// Checks that the route name in the request body does not already exist
const routeNameDoesNotAlreadyExist = async (req, res, next) => {
    const creator = req.body.creator;
    const description = req.body.description;
    const routeName = creator + " " + description;
    const route = await routes_controller.findRoute(routeName);
    if (route) {
      res.status(400).json({
        error: `Route creator and description already exists.`,
      }).end();
      return;
    }
    next();
  };

// Checks that the route from the route name in the request body exists
const routeExists = async (req, res, next) => {
    const route = await routes_controller.findRoute(req.body.routeName);
    if (!route) {
      res.status(404).json({
        error: `Route does not exist.`,
      }).end();
      return;
    }
    next();
  };

module.exports = Object.freeze({
  reportNameDoesNotAlreadyExist,
  reportExists,
  noDuplicateConfirmations,
  routeNameDoesNotAlreadyExist,
  routeExists,
});