const Job = require('../model/Job.js');

function getJobById() {
    return async (req, res) => {
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
    }
}

function createNewJob() {
    return async (req, res) => {
        try {
            const { companyName, title, description, logoUrl, duration, jobPosition, monthlySalary, jobType, remote, location, jobDescription, skills, additionalInformation, refUserId } = req.body
            const newJob = new Job({
                companyName,
                title,
                description,
                logoUrl,
                duration,
                jobPosition,
                monthlySalary,
                jobType,
                remote,
                location,
                jobDescription,
                skills,
                additionalInformation,
                refUserId
            })
            await newJob.save();
            res.status(201).json({
                message: 'Job added successfully',
                jobId: newJob.id
            })
        } catch (error) {
            next({
                message: 'Error while adding Job',
                error
            })
        }
    }
}

function getFilteredJobs() {
    return async (req, res) => {
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
                    remote: remote == 'true' || { $exists: true },
                    skillsRequired: { $all: skillsArray }
                }
            );
            res.status(200).json({
                message: 'Job route is working fine',
                status: 'Working',
                jobs
            })
        } catch (error) {
            next({
                message: 'Error Finding Job',
                error
            })
        }
    }
}


module.exports = {
    getJobById,
    createNewJob,
    getFilteredJobs
}