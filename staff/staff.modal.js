const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
}, { timestamps: true },
);

const Staff = mongoose.model.Staff || mongoose.model("Staff", staffSchema);
module.exports = Staff;


