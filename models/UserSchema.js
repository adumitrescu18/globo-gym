const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        // note that we don't have a short_id field, by default mongoDB creates this field, which is our Primary Key
        "user_name": {
          type: String,
          required: true
        },
        "user_password": {
            type: String,
            required: true
        }
    }
);
// mongoose will automatically create the collection for our DB
module.exports = mongoose.model("User", UserSchema);
