module.exports = function validPassword(password) {
  let valid = false;

  if ("string" == typeof password && '' != password) {
    valid = true;
  }

  return valid;
};