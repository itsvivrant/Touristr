const express = require('express')
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Photo, User} = require('../../db/models');

router.get('/', (req, res) => {
    res.send('Hello from comments')
})



module.exports = router;
