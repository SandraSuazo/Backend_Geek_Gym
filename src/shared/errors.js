const errorMessages = {
  MISSING_REQUIRED_FIELDS: { code: 400, message: "Some fields are missing" },
  NO_FIELD_MODIFIED: { code: 400, message: "No field modified" },
  INVALID_ROLE: { code: 400, message: "Invalid role" },
  INVALID_DATE: { code: 400, message: "Invalid date" },
  INCORRECT_PASSWORD: { code: 401, message: "Incorrect Password" },
  INVALID_PASSWORD_FORMAT: {
    code: 401,
    message:
      "The password must have at least 8 characters, a capital letter, a number and a special character",
  },
  INVALID_EMAIL_FORMAT: {
    code: 401,
    message: "The email format is not correct",
  },
  INVALID_TIME_FORMAT: { code: 401, message: "The time format is 00:00" },
  INCOMPLETE_CREDENTIALS: { code: 401, message: "Incomplete Credentials" },
  TOKEN_NOT_PROVIDED: { code: 401, message: "Token Not Provided" },
  ACCESS_DENIED: { code: 403, message: "Access Denied" },
  DISABLED_USER: { code: 403, message: "Disabled user" },
  ESTABLISHMENT_CLOSED: {
    code: 403,
    message: "The establishment is open from 6:00 to 23:00",
  },
  USER_NOT_FOUND: { code: 404, message: "User not found" },
  ACTIVITY_NOT_FOUND: { code: 404, message: "Activity not found" },
  USER_ALREADY_EXISTS: { code: 422, message: "User already exists" },
  INTERNAL_SERVER_ERROR: { code: 500, message: "Internal Server Error" },
};

export const errorHandler = (err, req, res, next) => {
  const error = errorMessages[err];
  if (error) {
    res.status(error.code).json(error.message);
  } else {
    res.status(500).json("Unknown Error");
  }
  next(err);
};
