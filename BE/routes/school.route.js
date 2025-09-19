const School = require("../models/school.model");

const getSchool = async (req, res, next) => {
    console.log(req.params);

    try {
        const { id } = req.params;
        console.log(id);

        const school = await School.findOne({ _id: id });
        if (!school) {
            console.log("School not found");
            return res.status(404).json({ message: "School not found" });
        }
        console.log("School:", school);
        return res.status(200).json(school); // send as response
    } catch (err) {
        next(err);
    }
};

module.exports = getSchool;
