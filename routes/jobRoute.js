const express = require('express');
const router = express.Router();
const Job = require('../model/Job.js');

router.get('/', async (req, res) => {

    const jobs = await Job.find();

    res.status(200).json({
        message: 'Job route is working fine',
        status: 'Working',
        jobs
    })
});


router.post('/add', async (req, res) => {
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
});

router.get('/:id', async (req, res) => {
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
        res.status(400).json({
            message: 'Job not found',
        });
    }
})

module.exports = router;