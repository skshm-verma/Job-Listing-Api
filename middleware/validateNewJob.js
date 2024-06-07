const validateNewJob = (req, res, next) => {

    const { companyName, logoUrl, jobPosition, monthlySalary, jobType, location, jobDescription, aboutCompany, skillsRequired } = req.body

    if (!companyName || !logoUrl || !jobPosition || !monthlySalary || !jobType || !location || !jobDescription || !aboutCompany || !skillsRequired) {
        return res.status(400).json({
            message: 'Please provide all required fields',
        });
    }

    const validJobPositions = ["Full-Time", "Part-Time", "Internship"];
    const validSkills = Array.isArray(skillsRequired) && skillsRequired.every(skill => typeof skill === 'string');
    const validMonthlySalary = typeof monthlySalary === 'number' && monthlySalary > 0;
    const validJobPosition = validJobPositions.includes(jobType);
    const validLogoUrl = logoUrl.match(/^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg|webp))$/i); 
    //regular expression for validating logoUrl

    if (!validSkills || !validMonthlySalary || !validJobPosition || !validLogoUrl) {
        res.status(400).json({
            message: 'Some fields are invalid, please check and try again',
        });
    } else {
        next();
    };

}

module.exports = validateNewJob