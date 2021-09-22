const express = require('express');

const { home, newCourse } = require('../controller/timetable');
const { courseValidator } = require('../validator');

const router = express.Router();

router.get('/', home);
router.post('/new', courseValidator, newCourse);

module.exports = router;