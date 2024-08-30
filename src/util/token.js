const jwt = require('jsonwebtoken');

const checkToken = async (token, id, key) => {
    try {
      const decoded = jwt.verify(token, key);
      console.log(decoded);
      return decoded;
    } catch (err) {
      console.error(err);
      return false;
    }
  };
  
  const setToken = async (id, key) => {
    if (id) {
      const token = jwt.sign({ id }, key, { expiresIn: 28800 });
      console.log(token);
      return token;
    }
    return false;
  };
module.exports = {
    checkToken,
    setToken
};

