const { verifyToken } = require('../utils/jwt.js');


const authMiddleware = (req, res, next) => {
try {
const token = req.body.token;
// if (!token) return res.status(401).json({ message: 'No autorizado: falta token' });


// const parts = token.split(' ');
// if (parts.length !== 2 || parts[0] !== 'Bearer') return res.status(401).json({ message: 'Token inválido' });


const payload = verifyToken(token);
req.userId = payload.id;
next();
} catch (err) {
return res.status(401).json({ message: 'Token inválido o expirado' });
}
};


module.exports = authMiddleware;