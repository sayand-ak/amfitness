const errorHandler = (err, req, res, next) => {
    console.error(err); 

    // Handle Mongoose validation errors
    if (err.name === 'ValidationError') {
        return res.status(400).json({
            success: false,
            error: err.message
        });
    }

    // Handle duplicate key errors (MongoDB unique constraint)
    if (err.code === 11000) {
        return res.status(400).json({
            success: false,
            error: `Duplicate value: ${JSON.stringify(err.keyValue)}`
        });
    }

    // Handle other custom errors
    if (err.status) {
        return res.status(err.status).json({
            success: false,
            error: err.message
        });
    }

    // Default to 500 Server Error
    res.status(500).json({
        success: false,
        error: 'Something went wrong! Please try again later.'
    });
};

module.exports = errorHandler;
