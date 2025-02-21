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

const validateEditDetails=(req)=>{
    const editableFields=["firstName","lastName","age","about","skills"];
    const isEditAllowed=Object.keys(req.body).every(fields=>editableFields.includes(fields))
    if(isEditAllowed==false){
        throw new Error("Edit not allowed");
        
    }
    return isEditAllowed;

}

module.exports = { validateUser,validateEditDetails };
