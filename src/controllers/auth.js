const bcrypt = require('bcrypt');
const User = require('../models/user');
const { signToken } = require('../utils/jwt');


const register = async (req, res, next) => {
try {
const { name, email, password } = req.body;
if (!name || !email || !password) return res.status(400).json({ message: 'Faltan datos requeridos' });


const existing = await User.findOne({ where: { email } });
if (existing) return res.status(409).json({ message: 'Email ya registrado' });


const saltRounds = 10;
const hashed = await bcrypt.hash(password, saltRounds);


const user = await User.create({ name, email, password: hashed });


return res.status(201).json({ id: user.id, name: user.name, email: user.email, message: "Te has registrado correctamente" });
} catch (err) {
next(err);
}
};


const login = async (req, res, next) => {
try {
const { email, password } = req.body;
if (!email || !password) return res.status(400).json({ message: 'Faltan credenciales' });


const user = await User.findOne({ where: { email } });
if (!user) return res.status(401).json({ message: 'Datos inválidos' });


const valid = await bcrypt.compare(password, user.password);
if (!valid) return res.status(401).json({ message: 'Datos inválidos' });


const token = signToken({ id: user.id });

 res.cookie('token', token, {
     httpOnly: true,
       sameSite: 'strict',
    });


return res.json({user: { id: user.id, name: user.name, email: user.email, message: "Has iniciado sesión correctamente" } });
} catch (err) {
next(err);
}
};


module.exports = { register, login };