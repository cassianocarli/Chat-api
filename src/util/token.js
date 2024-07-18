const jwt = require('jsonwebtoken');

const checkToken = async (token, id, key) => jwt.verify(token, key, (err, decoded) => {
var decoded = jwt.verify(token, 'shhhhh');
console.log(decoded.foo)

});

const setToken = async (id, key) => {
console.log(id);
if (id){
    return jwt.sign({id}, key, {expiresIn: 28800});
}
return false;
};

module.exports = {
    checkToken,
    setToken
};