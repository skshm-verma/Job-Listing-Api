const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({

    companyName: {
        type: String,
        required: true
    },
    logoUrl: {
        type: String,
    },
    jobPosition: {
        type: String,
        required: true
    },
    monthlySalary: {
        type: Number,
        required: true
    },
    jobType: {
        type: String,
        required: true
    },
    remote: {
        type: Boolean,
    },
    location: {
        type: String,
        required: true
    },
    jobDescription: {
        type: String,
        required: true
    },
    aboutCompany: {
        type: String,
        required: true
    },
    skillsRequired: [
        {
            type: String,
            required: true,
        }
    ],
    additionalInformation: {
        type: String,
    }
});

module.exports = mongoose.model('Job', jobSchema);

