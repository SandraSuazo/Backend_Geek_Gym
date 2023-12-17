export const validateEmail = (email, next) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error(next("INVALID_EMAIL_FORMAT"));
  }
};

export const validatePassword = (password, next) => {
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
  if (!passwordRegex.test(password)) {
    throw new Error(next("INVALID_PASSWORD_FORMAT"));
  }
};

export const validateTime = (timeString, next) => {
  const timeRegex = /^(0[9]|1\d|2[0-1]):[0-5]\d$/;
  if (!timeRegex.test(timeString)) {
    throw new Error(next("INVALID_TIME_FORMAT"));
  }
  const hour = parseInt(timeString.split(":")[0], 10);
  if (hour < 6 || hour > 22) {
    throw new Error(next("ESTABLISHMENT_CLOSED"));
  }
  const formattedTime = `${timeString}h`;
  return formattedTime;
};
