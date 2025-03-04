export const validatePassword = (password) => {
  const minLength = 10;
  const hasLetter = /[a-zA-Z]/;
  const hasNumber = /\d/;

  if (password.length < minLength) {
    return "Password must be at least 10 characters long.";
  }
  if (!hasLetter.test(password)) {
    return "Password must contain at least one letter.";
  }
  if (!hasNumber.test(password)) {
    return "Password must contain at least one digit.";
  }

  return null; // No error
};

export const today = () => {
  const date = new Date();
  return date.toISOString().split("T")[0]; // This converts date to 'YYYY-MM-DD' format
};
export const maxDob = () => {
  const date = new Date();
  date.setFullYear(date.getFullYear() - 120);
  return date.toISOString().split("T")[0];
};
