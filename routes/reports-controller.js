const Report = require('../models/ReportSchema');
const User = require('../models/UserSchema');

async function getAllReports(){
  try{
    const reports = await Report.aggregate([
      {$lookup:
        {
          from: 'users',
          localField: 'report_creator_id',
          foreignField: '_id',
          as: 'reportwithusers'
        }
      }
    ]);
    return reports;
  } catch(err) {
    return false;
  }
}

async function findReport(name){
  try{
    const report = await Report.findOne({report_name: name}); //We make sure that names are unique
    return report;
  } catch(err) {
    return false;
  }
}

async function addReport(name, creator, startCoordinate, endCoordinate, type, description) {
  try {
    const report = new Report({
      report_name: name,
      report_creator_id: creator,
      report_start_coordinate: startCoordinate,
      report_end_coordinate: endCoordinate,
      report_type: type,
      report_description: description,
    //   report_location: location,
    });
    // if (author !== undefined){
    //   const user = await User.findOne({user_name: author});
    //   if (user){
    //     const user_id = user._id;
    //     short.short_creator_id = user_id;
    //   }
    // }
    await report.save();
    return report;
  } catch(err) {
    return false;
  }
}

async function confirmReport(name, confirmer){
  try{
    const report = await Report.findOne({report_name: name});
    if (report.report_confirmations.length != 0) {
        report.report_confirmations.push(confirmer);
    } else {
        report.report_confirmations = [confirmer];
    }
    await report.save();
    return report;
  } catch(err) {
    return false;
  }
}

async function numberOfConfirmations(name){
    try{
      const report = await Report.findOne({report_name: name});
      return report.report_confirmations.length;
    } catch(err) {
      return false;
    }
  }

//add deleteOne
async function deleteReport(name){
  try{
    const report = await Report.deleteOne({report_name: name});
    return report;
  } catch(err) {
    return false;
  }
}

module.exports = Object.freeze({
  getAllReports,
  findReport,
  addReport,
  confirmReport,
  numberOfConfirmations,
  deleteReport
});
