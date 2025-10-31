const jwt = require('jsonwebtoken');
const vars = require('../utils/variables.js')


const signToken = (payload) => {
return jwt.sign(payload, vars.JWT_SECRET, { expiresIn: vars.JWT_EXPIRES_IN || '1h' });
};


const verifyToken = (token) => {
return jwt.verify(token, vars.JWT_SECRET);
};


module.exports = { signToken, verifyToken };