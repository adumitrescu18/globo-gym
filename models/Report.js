

/**
 * @class Report
 *
 * Contains data about a report
 */
class Report{

  constructor(creator, location, type, description, id){
    this.creator = creator;
    this.location = location;
    this.type = type;
    this.description = description;
    this.id = id;
  }
  /**
   * getCreator - creator of the report
   *
   * @return {string} - username that posted the report
   */
  getCreator(){
    this.creator
  }

  /**
   * getLocation - gets the location of the hazard
   *
   * @return {Location} - location of the hazard
   */
  getLocation(){
    this.location
  }

  /**
   * getType - gets the type of hazard
   *
   * @return {string} - type of hazard
   */
  getType(){
    this.type
  }


  /**
   * getDescription - gets the description of the report
   *
   * @return {string} - description about the report
   */
  getDescription(){
    this.description
  }


  /**
   * getId - gets the id of a report
   *
   * @return {int} - id of the report
   */
  getId(){
    this.id
  }
}

module.exports = Report;
