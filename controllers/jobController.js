const express = require('express');
const Job = require('../model/Job.js');


const getJobById = async (req, res, next) => {
    const jobId = req.params.id
    try {
        const job = await Job.findById(jobId);
        if (job) {
            res.status(200).json({
                message: 'Job found',
                job
            });
        }
    } catch (error) {
        next({
            message: 'Job not found',
            error
        })
    }
};

const createNewJob = async (req, res, next) => {
    try {
        const { companyName, title, description, logoUrl, jobPosition, salary, location, duration, locationType, information, jobType, skills, additionalInformation } = req.body;
        const refUserId = req.refUserId;
        const newJob = new Job({
            companyName,
            title,
            description,
            logoUrl,
            jobPosition,
            salary,
            location,
            duration,
            locationType,
            information,
            jobType,
            skills,
            additionalInformation,
            refUserId
        });
        await newJob.save();
        res.status(201).json({
            message: 'Job added successfully',
            jobID: newJob._id
        });
    } catch (error) {
        next({
            message: 'Error while adding Job',
            error
        })
    }
};

const getFilteredJobs = async (req, res, next) => {
    try {
        const { minSalary, maxSalary, jobType, location, remote, skills } = req.query;
        const skillsArray = skills ? skills.split(",") : []
        const jobs = await Job.find(
            {
                monthlySalary: {
                    $gte: minSalary || 0,
                    $lte: maxSalary || 999999999
                },
                jobType: jobType || { $exists: true },
                location: location || { $exists: true },
                remote: remote == 'true' || { $exists: true }
            }
        );
        const finalJobs = jobs.filter(job => {
            let isSkillMatched = true;
            if (skillsArray.length > 0) {
                isSkillMatched = skillsArray.every(skill => job.skills.includes(skill));
            }
            return isSkillMatched;
        });

        res.status(200).json({
            message: 'Job route is working fine',
            status: 'Working',
            jobs: finalJobs
        })
    } catch (error) {
        next({
            message: 'Error Finding Job',
            error
        })
    }
};
// const getFilteredJobs = async (req, res) => {
//     try {
//         const { minSalary, maxSalary, jobType, location, remote, skills } = req.query;
//         console.log("Query Parameters:", req.query);

//         const skillsArray = skills ? skills.split(",") : [];
//         console.log("Skills Array:", skillsArray);

//         const query = {
//             monthlySalary: {
//                 $gte: minSalary ? Number(minSalary) : 0, // Convert to number
//                 $lte: maxSalary ? Number(maxSalary) : 999999999 // Convert to number
//             },
//             jobType: jobType || { $exists: true },
//             location: location || { $exists: true },
//             remote: remote === 'true' || { $exists: true },
//             skills: { $all: skillsArray } // Ensure this matches your model field
//         };

//         console.log("Query Object:", query);

//         const jobs = await Job.find(query);
//         console.log("Jobs Found:", jobs);

//         res.status(200).json({
//             message: 'Job route is working fine',
//             status: 'Working',
//             jobs
//         });
//     } catch (error) {
//         console.error("Error Finding Job:", error);
//         next({
//             message: 'Error Finding Job',
//             error
//         });
//     }




// try {
//     const { minSalary, maxSalary, jobType, location, remote, skills } = req.query;
//     const skillsArray = skills ? skills.split(",") : []
//     const jobs = await Job.find(
//         {
//             monthlySalary: {
//                 $gte: minSalary || 0,
//                 $lte: maxSalary || 999999999
//             },
//             jobType: jobType || { $exists: true },
//             location: location || { $exists: true },
//             remote: remote == 'true' || { $exists: true }
//         }
//     );
//     const finalJobs = jobs.filter(job => {
//         let isSkillMatched = true;
//         if (skillsArray.length > 0) {
//             isSkillMatched = skillsArray.every(skill => job.skills.includes(skill));
//         }
//         return isSkillMatched;
//     });

//     res.status(200).json({
//         message: 'Job route is working fine',
//         status: 'Working',
//         jobs: finalJobs
//     })
// };

const updateExistingJob = async (req, res, next) => {
    try {
        const jobID = req.params.id;
        const { companyName, title, description, logoUrl, jobPosition, salary, location, duration, locationType, information, jobType, skills, additionalInformation } = req.body;
        const refUserId = req.refUserId;
        const updatedJob = await Job.findByIdAndUpdate(jobID, {
            companyName,
            title,
            description,
            logoUrl,
            jobPosition,
            salary,
            location,
            duration,
            locationType,
            information,
            jobType,
            skills,
            additionalInformation,
            refUserId
        });

        res.status(200).json({
            message: 'Job updated successfully',
            job: updatedJob
        });
    } catch (error) {
        next({
            message: "Error While Updating The Job",
            error
        });
    }
};

const deleteJob = async (req, res, next) => {
    try {
        const jobID = req.params.id;
        await Job.findByIdAndDelete(jobID);
        res.status(200).json({
            message: 'Job deleted successfully',
        });
    } catch (error) {
        next({
            message: "Error While Deleting The Job",
            error
        });
    }
};


module.exports = {
    getJobById,
    createNewJob,
    getFilteredJobs,
    updateExistingJob,
    deleteJob
}