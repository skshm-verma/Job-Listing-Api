const validateNewJob = (req, res, next) => {

    const { companyName, title, description, logoUrl, salary, location, duration, locationType, information, jobType, skills } = req.body;
    const refUserId = req.refUserId;
    const parsedSalary = parseInt(salary);

    if (!companyName || !title || !description || !logoUrl || !parsedSalary || !location || !duration || !locationType || !information || !jobType || !skills || !refUserId) {
        const error = new Error(`Missing required fields ${!companyName ? 'companyName' : ''}${!title ? 'title' : ''}${!description ? 'description' : ''}${!logoUrl ? 'logoUrl' : ''}${!parsedSalary ? 'salary' : ''}${!location ? 'location' : ''}${!duration ? 'duration' : ''}${!locationType ? 'locationType' : ''}${!information ? 'information' : ''}${!jobType ? 'jobType' : ''}${!skills ? 'skills' : ''}${!refUserId ? 'refUserId' : ''}`);
        error.statusCode = 400;
        console.log(error);
        throw error;
    }

    const validJobTypes = ["Full-Time", "Part-Time", "Internship"];
    const validLocationTypes = ["On-Site", "Remote", "Hybrid"];
    const validSkills = Array.isArray(skills) && skills.every(skill => typeof skill === 'string');
    const validSalary = typeof parsedSalary === 'number' && parsedSalary > 0;
    const validJobType = validJobTypes.includes(jobType);
    const validLogoUrl = logoUrl.match(/^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg|webp))$/i);
    const validLocationType = validLocationTypes.includes(locationType);

    if (!validJobType) {
        return res.status(400).json({
            message: 'Invalid job type',
        });
    }
    if (!validSkills) {
        return res.status(400).json({
            message: 'Invalid skills',
        });
    }
    if (!validSalary) {
        return res.status(400).json({
            message: 'Invalid salary',
        });
    }
    if (!validLogoUrl) {
        return res.status(400).json({
            message: 'Invalid logo URL',
        });
    }
    if (!validLocationType) {
        return res.status(400).json({
            message: 'Invalid location type',
        });
    }
    next();
};

module.exports = validateNewJob;
