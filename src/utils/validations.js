const validator = require("validator");

const validateUser = (req) => {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || firstName.length === 0 || lastName.length === 0 || firstName.length > 50 || lastName.length > 50) {
        throw new Error("Please enter first name and last name correctly");
    }

    if (!email || !validator.isEmail(email)) {
        throw new Error("Please enter a valid Email ID");
    }

    if (!password || !validator.isStrongPassword(password)) {
        throw new Error("Enter a strong password");
    }

    return { firstName, lastName, email, password }; // Return the extracted data
};

module.exports = { validateUser };
