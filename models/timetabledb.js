const mongoose = require('mongoose');

const timetableSchema = mongoose.Schema({
    courseCode: {
        type: String,
        trim: true,
        required: true,
    },
    courseTitle: {
        type: String,
        trim: true,
        required: true,
    },
    courseUnitLoad: {
        type: Number,
        required: true,
    },
    dates: {
        type: Array,
        required: true,
    },
    durationHours: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    lastUpdated: {
        type: Date,
    }
});

const collectionName = 'timetable';
module.exports = mongoose.model("timetable", timetableSchema, collectionName);