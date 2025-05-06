const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName) {
    throw new Error("Please enter a firstname");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Email ID is not valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter a strong password");
  }
};

const validateProfileEditData = (req) => {
  const allowedUpdates = [
    "firstName",
    "lastName",
    "age",
    "gender",
    "photoUrl",
    "about",
    "skills",
  ];

  const isAllowed = Object.keys(req.body).every((field) =>
    allowedUpdates.includes(field)
  );

  return isAllowed;
};

module.exports = {
  validateSignUpData,
  validateProfileEditData,
};
