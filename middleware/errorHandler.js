const errorHandler = (err, req, res, next) => {   
    console.error(err); // Log the error for debugging purposes

    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    res.status(statusCode).json({
        success: false,
        message: message,
    });
}

module.exports = errorHandler;