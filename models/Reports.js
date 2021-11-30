let data = [];
let reportId = 0;

const Report = require("./Report");

class Reports{

  /**
   * @static createReport - creates a report
   *
   * @param  {string} creator - username of the report's creator
   * @param  {Waypoint} location - coordinates/address of the hazard [TBU]
   * @param  {string} type - hazard category: one of [traffic, crime, blockage, construction] [TBU]
   * @param  {string} description - 140 character max description of the hazard
   * @return {Report} - the newly created report
   */
  static createReport(creator, location, type, description){
    const report = new Report(creator, location, type, description, reportId);
    data.push(report)
    reportId++;
    return report
  }


  /**
   * @static deleteReport - Delete the report specified by the given id
   *
   * @param  {int} id unique id of the report
   * @return {boolean} True if successfully deleted, False otherwise
   */
  static deleteReport(id){

  }


  /**
   * @static getNearbyReports - Get all reports in the system
   *
   * @return {[Report]} - list of reports
   */
  static getAllReports(location){
    return data;
  }

}

module.exports = Reports
