const timetableModel = require('../models/timetabledb');

exports.home = (req, res) => {
    timetableModel.find({}, { _id:0, courseTitle:0, createdAt:0, __v:0 }, (err, docs) => {
        if(err) {
            return res.status(403).json({
                errId: "DB_FIND_ERR",
                errorMessage: "An error occured while getting data",
                err,
            });
        }
        
        return res.json(docs);
    });
}

exports.newCourse = async (req, res) => {
    const courseExists = await timetableModel.findOne({ courseCode: req.body.courseCode });
    if(courseExists) {
        return res.status(403).json({
            errId: "COURSE_EXISTS",
            error: "Course Already Exists!",
        });
    }

    const timeTableEntry = new timetableModel(req.body);

    timeTableEntry.save().then(result => {
        const { _id, courseCode, courseUnitLoad, courseTitle, dates, durationHours, createdAt } = timeTableEntry;
        return res.status(200).json({
            messageId: "INS_SUC",
            message: "Course inserted into the timetable successfully",
            courseDetails: {
                _id,
                courseCode,
                courseUnitLoad,
                courseTitle,
                dates,
                durationHours,
                createdAt,
            }
        });
    }).catch(error => {
        return res.status(403).json({
            errId: "DB_SAVE_ERR",
            errorMessage: "An error occured while saving data",
            error,
        });
    });
}

// exports.editCourse = (req, res) => {
//     const courseCode = req.body
//     timetableModel.updateOne({})
// }