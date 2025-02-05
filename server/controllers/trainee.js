const { addTraineeService, listTraineesService } = require('../services/trainee');

const addTrainee = async (req, res, next) => {
    try {
        console.log(req.body, req.file)
        const trainee = await addTraineeService(req.body, req.file);
        res.status(201).json({ message: 'Trainee added successfully', data: trainee });
    } catch (error) {
        next(error)
    }
};

const listTrainees = async (req, res, next) => {
    try {
        const result = await listTraineesService(req.query);
        res.status(200).json(result);
    } catch (error) {
        next(error)
    }
};

module.exports = { addTrainee, listTrainees };
