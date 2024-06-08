const errorHandler = (message, err, req, res, next) => {   
    console.log(err)
    res.status(500).json({
        message,
        error: err
    })
}

module.exports = errorHandler;