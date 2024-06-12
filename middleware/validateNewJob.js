const validateNewJob = (req, res, next) => {

    const { companyName, title, description, logoUrl, duration, jobPosition, monthlySalary, jobType, location, jobDescription, skills, refUserId } = req.body

    if (!companyName || !title || !description || !logoUrl || !duration || !jobPosition || !monthlySalary || !jobType || !location || !jobDescription || !skills || !refUserId) {
        return res.status(400).json({
            message: 'Please provide all required fields',
        });
    }

    const validateJobTypes = ["Full-Time", "Part-Time", "Internship"];
    const validSkills = Array.isArray(skills) && skills.every(skill => typeof skill === 'string');
    const validMonthlySalary = typeof monthlySalary === 'number' && monthlySalary > 0;
    const validJobType = validateJobTypes.includes(jobType);
    const validLogoUrl = logoUrl.match(/^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg|webp))$/i);
    //regular expression for validating logoUrl

    if (!validSkills) {
        res.status(400).json({
            message: 'Invalid Skills',
        });
    }
    if (!validMonthlySalary) {
        res.status(400).json({
            message: 'Invalid MonthlySalary',
        });
    }
    if (!validJobType) {
        res.status(400).json({
            message: 'Invalid JobType',
        });
    }
    if (!validLogoUrl) {
        res.status(400).json({
            message: 'Invalid LogoUrl',
        });
    }
    next();
}

module.exports = validateNewJob