const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    companyName: {
        type: String,
        trim: true,
        required: true,
    },
    title: {
        type: String,
        trim: true,
        required: true,
    },
    description: {
        type: String,
        trim: true,
        required: true,
    },
    logoUrl: {
        type: String,
        trim: true,
        required: true,
    },
    salary: {
        type: Number,
        trim: true,
        required: true,
    },
    location: {
        type: String,
        trim: true,
        required: true,
    },
    duration: {
        type: String,
        required: true,
    },
    locationType: {
        type: String,
        required: true,
    },
    information: {
        type: String,
        trim: true,
        required: true,
    },
    jobType: {
        type: String,
        required: true,
    },
    skills: {
        type: Array,
        required: true,
    },
    additionalInformation: {
        type: String,
        trim: true,
    },
    refUserId: {
        type: mongoose.ObjectId,
    },
},
    {
        timestamps: {
            createdAt: "createdAt",
            updatedAt: "updatedAt"
        }
    }
);


module.exports = mongoose.model('Job', jobSchema);

