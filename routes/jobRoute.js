const express = require('express');
const router = express.Router();
const { getFilteredJobs, createNewJob, getJobById, updateExistingJob, deleteJob } = require('../controllers/jobController.js');
const validateNewJob = require('../middleware/validateNewJob.js');
const verifyToken = require('../middleware/verifyToken.js');


router.get('/', getFilteredJobs);

router.get('/:id', getJobById);

router.post('/add', verifyToken, validateNewJob, createNewJob);

router.put('/update/:id', verifyToken, validateNewJob, updateExistingJob);

router.delete('/delete/:id', verifyToken, deleteJob);

module.exports = router;