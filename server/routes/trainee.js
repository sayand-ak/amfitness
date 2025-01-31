const express = require('express');
const { addTrainee, listTrainees } = require('../controllers/trainee');
const upload = require('../middleware/upload');

const router = express.Router();

router.post('/add', upload.single('image'), addTrainee);

router.get('/list', listTrainees);

module.exports = router;
