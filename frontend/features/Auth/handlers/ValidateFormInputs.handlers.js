import validator from "validator";

export const validateFormInputs = ({
  username,
  email,
  password,
  passRepeat,
  setErrorMessage,
  isNewAccount,
}) => {
  if (!validator.isEmail(email)) {
    setErrorMessage("Please enter a valid email");
    return false;
  }

  const passwordOptions = {
    minLength: 6,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 0,
  };

  if (!validator.isStrongPassword(password, passwordOptions)) {
    setErrorMessage(
      "Please ensures that the password contains at least one uppercase letter, one number, and 6 characters long."
    );
    return false;
  }

  if (!isNewAccount) {
    setErrorMessage(null);
    return true;
  }

  if (!validator.matches(username, /^[a-zA-Z0-9_.]{6,}$/)) {
    setErrorMessage(
      "Usernames can only use letters, numbers, underscores, periods, and 6 characters long."
    );
    return false;
  }

  if (password !== passRepeat) {
    setErrorMessage("Passwords do not match");
    return false;
  }

  setErrorMessage(null);
  return true;
};
