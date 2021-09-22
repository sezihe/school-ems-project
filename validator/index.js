const yup = require('yup');

exports.courseValidator = async (req, res, next) => {
    // validate data
    const yupSchema = yup.object().shape({
        // courseCode validation.
        courseCode: yup.string().trim()
            .matches(/[\w\-]/i, "INVALID_COU_CDE_CHARS")
            .min(3, "INVALID_COU_CDE_MIN")
            .max(8, "INVALID_COU_CDE_MAX")
            .required("INVALID_COU_CDE_REQ"),

        // courseUnitLoad validation.
        courseUnitLoad: yup.number()
            .required("INVALID_COU_UNIT_LOAD_REQ"),

        // courseTitle validation.
        courseTitle: yup.string().trim()
            .matches(/[\w\-]/i, "INVALID_COU_TIT_CHARS")
            .min(3, "INVALID_COU_TIT_MIN")
            .max(50, "INVALID_COU_TIT_MAX")
            .required("INVALID_COU_TIT_REQ"),

        // dates validation.    
        dates: yup.array()
            .required("INVALID_DATES_REQ"),

        // durationHours validation. 
        durationHours: yup.number()
            .required("INVALID_DUR_HOURS_REQ"),
    });

    // check for errors and return the errors.
    const { courseCode, courseUnitLoad, courseTitle, dates, durationHours } = req.body;
    try {
        // use schema to validate request
        await yupSchema.validate({
            courseCode,
            courseUnitLoad,
            courseTitle,
            dates,
            durationHours,
        });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }

    next();
}