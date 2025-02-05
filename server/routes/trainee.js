const express = require('express');
const { addTrainee, listTrainees } = require('../controllers/trainee');
const upload = require('../middleware/upload');
const validateRequest = require('../middleware/validateRequest');
const traineeValidationRules = require('../validator/trainee');

const router = express.Router();

router.post('/add', upload.single('image'), validateRequest(traineeValidationRules), addTrainee);

router.get('/list', listTrainees);

module.exports = router;
