const User = require("../models/UserSchema");

async function findUser(name){
  try{
    const user = await User.find({user_name: name});
    if (user.length > 0){
      return user[0];
    }
    return false;

  } catch(err){
    return false;
  }
}

async function addUser(name, password){
  const user = new User({user_name: name, user_password: password});
  try {
      await user.save();
      return user;
  } catch(err) {
      return false;
  }
}

//add deleteOne
async function deleteUser(name){
    try{
      const user = await User.deleteOne({report_name: name});
      return user;
    } catch(err) {
      return false;
    }
  }

module.exports = Object.freeze({
  findUser,
  addUser,
  deleteUser
});
