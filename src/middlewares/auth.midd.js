const { verifyToken } = require('../utils/jwt.js');


const authMiddleware = (req, res, next) => {

   try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({ message: 'No autorizado: falta token' });
    }

    const payload = verifyToken(token);

    if (!payload || !payload.id) {
      return res.status(401).json({ message: 'Token inválido' });
    }

    req.userId = payload.id;
    next();

} catch (err) {
return res.status(401).json({ message: 'Token inválido o expirado' });
}
};


module.exports = authMiddleware;