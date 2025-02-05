const { validationResult } = require('express-validator');

const validateRequest = (validationRules) => {
    return async (req, res, next) => {
        // Execute validation rules
        await Promise.all(validationRules.map((rule) => rule.run(req)));

        // Check for validation errors
        const errors = validationResult(req);
        console.log("error",errors)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    };
};

module.exports = validateRequest;
