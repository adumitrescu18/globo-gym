const express = require('express');

const controller = require("./users-controller");

const router = express.Router();


/**
 * Authenticate a user.
 *
 * @name POST /api/session
 * 
 * @param {string} username - the user's username
 * @param {string} password - the user's password
 * 
 * @throws {200} - if the user successfully signs in
 * @throws {400} - if the user's password is incorrect
 */
router.post('/authenticate', async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const user = await controller.findUser(username);
  if (user && user.user_password === password){
      // Authenticate
      res.status(200).json(user).end();
  }else{
    res.status(400).end();
  }


});

/**
 * Create a user
 *
 * @name POST /api/session
 * 
 * @param {string} username - the user's username
 * @param {string} password - the user's password
 * 
 * @throws {200} - if the user successfully creates an account
 * @throws {400} - if the user's username length is 0 or the username is not unique
 */
router.post('/create', async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const user = await controller.findUser(username);
  if (!user || user.length == 0){
    //no users with same username exist
    let newUser = await controller.addUser(username, password);
    res.status(200).json(newUser).end();
  }
  else{
    res.status(400).end();
  }


});

/**
 * Disassociate the username signed in with their session.
 *
 * @name DELETE /api/session
 */
router.delete('/', (req, res) => {

});

module.exports = router;
