const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    logoUrl: {
        type: String,
        required: true,
    },
    salary: {
        type: Number,
        required: true,
    },
    location: {
        type: String,
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

// const jobSchema = new mongoose.Schema({
//     companyName: {
//         type: String,
//         required: true
//     },
//     title: {
//         type: String,
//         required: true
//     },
//     description: {
//         type: String,
//         required: true
//     },
//     logoUrl: {
//         type: String,
//     },
//     duration: {
//        type: String,
//        required: true
//     },
//     jobPosition: {
//         type: String,
//         required: true
//     },
//     monthlySalary: {
//         type: Number,
//         required: true
//     },
//     jobType: {
//         type: String,
//         required: true
//     },
//     remote: {
//         type: Boolean,
//     },
//     location: {
//         type: String,
//         required: true
//     },
//     jobDescription: {
//         type: String,
//         required: true
//     },
//     skills: [
//         {
//             type: String,
//             required: true,
//         }
//     ],
//     additionalInformation: {
//         type: String,
//     },
//     refUserId: {
//         type: mongoose.ObjectId,
//     }
// },
//     {
//         timeStamps: {
//             createdAt: "createdAt",
//             updatedAt: "updatedAt"
//         }
//     }
// );

module.exports = mongoose.model('Job', jobSchema);

