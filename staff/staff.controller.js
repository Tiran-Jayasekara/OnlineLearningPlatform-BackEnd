const Joi = require("joi").extend(require("@joi/date"));
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Staff = require("./staff.modal");

module.exports.Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const checkAdimin = await Staff.findOne({ email });
        if (checkAdimin) {
            const match = await bcrypt.compare(password, checkAdimin.password);
            if (match) {
                const token = jwt.sign(
                    {
                        id: checkAdimin._id,
                        email: checkAdimin?.email,
                        role: "admin"
                    },
                    `${process.env.SecretKey}`,
                    { expiresIn: "1d" }
                );

                res.status(200).json({ message: "Login Success", checkAdimin, token });
            } else {
                res.status(200).json({ message: "Password Is Wrong" });
            }
        } else {
            res.status(200).json({ message: "Email Not Register" });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


module.exports.addStaff = async (req, res) => {
    const schema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required(),
    });

    try {
        const staffInfo = req.body;
        const { error } = schema.validate(staffInfo);
        const {

            email,
            password
        } = staffInfo;

        if (error) {
            res.status(200).json({ message: error.message });
        } else {
            const alreayExist = await Staff.findOne({ email: email });
            if (alreayExist) {
                res.status(200).send({ message: "Account Already Exist" });
            } else {
                const hash = await bcrypt.hash(password, 10);

                const newAdminData = await Staff.create({
                    email,
                    password: hash
                });
                res.status(200).send({ message: "Staff add success", newAdminData });
            }
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
        console.log(" Error in add Staff Section ->", error);
    }
};