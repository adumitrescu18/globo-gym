const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReportSchema = new Schema(
    {
        // note that we don't have a report_id field, by default mongoDB creates this field, which is our Primary Key
        "report_name": {
            type: String,
            required: true,
        },
        // foreign key reference
        "report_creator_id": {
            type: String,
            ref: "User",
            required: true,
        },
        "report_confirmations": {
            type: [String],
            ref: "Confirmers",
            required: false,
        },
        // we set a default value here to be 0
        "report_confirmation_count": {
            type: Number,
            required: false,
            default: 0,
        },
        "report_start_coordinate": {
            type: Object,
            required: true,
        },
        "report_end_coordinate": {
            type: Object,
            required: true,
        },
        "report_type": {
            type: String,
            required: true,
        },
        "report_description": {
            type: String,
            required: true,
        },
    }
);

// mongoose will automatically create the collection for our DB
module.exports = mongoose.model("Report", ReportSchema);
