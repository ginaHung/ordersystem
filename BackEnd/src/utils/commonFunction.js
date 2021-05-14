const config = require('config');
const jwt = require('jsonwebtoken');

exports.azureSignCookie = async (user) => {
  const result = jwt.sign({
    mail: user.mail,
    emplid: user.mailNickname,
    username: user.surname,
    loginsuccess: true,
  }, config.JWT_SECRET);

  return result;
};
