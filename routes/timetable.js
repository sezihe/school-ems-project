const express = require('express');

const { home, newCourse } = require('../controller/timetable');

const router = express.Router();

router.get('/', home);
router.post('/new', newCourse);

module.exports = router;