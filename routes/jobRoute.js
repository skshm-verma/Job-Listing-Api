const express = require('express');
const router = express.Router();
const Job = require('../model/Job.js');
const validateNewJob = require('../middleware/validateNewJob.js')

router.get('/', async (req, res, next) => {

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
});


router.post('/add', validateNewJob, async (req, res, next) => {

    try {


        const { companyName, logoUrl, jobPosition, monthlySalary, jobType, remote, location, jobDescription, aboutCompany, skillsRequired, additionalInformation, author } = req.body

        const newJob = new Job({
            companyName,
            logoUrl,
            jobPosition,
            monthlySalary,
            jobType,
            remote,
            location,
            jobDescription,
            aboutCompany,
            skillsRequired,
            additionalInformation,
            author
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
});

router.get('/:id', async (req, res, next) => {
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
})

module.exports = router;