const express = require('express');
const router = express.Router();
const { getFilteredJobs, createNewJob, getJobById } = require('../controllers/jobController.js');
const validateNewJob = require('../middleware/validateNewJob.js');

router.get('/', getFilteredJobs);

router.post('/add', validateNewJob, createNewJob);

router.get('/:id', getJobById)

module.exports = router;