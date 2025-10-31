const bcrypt = require('bcrypt');
const User = require('../models/user');


const getMe = async (req, res, next) => {
try {
const user = await User.findByPk(req.userId, { attributes: ['id', 'name', 'email', 'createdAt'] });
if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
res.json({user, message: "Usuario encontrado"});
} catch (err) { next(err); }
};


const updateMe = async (req, res, next) => {
try {
const { name, email, password } = req.body;
const user = await User.findByPk(req.userId);
if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });


if (email && email !== user.email) {
const exists = await User.findOne({ where: { email } });
if (exists) return res.status(409).json({ message: 'Email en uso' });
}


if (name) user.name = name;
if (email) user.email = email;
if (password) {
const saltRounds = 10;
user.password = await bcrypt.hash(password, saltRounds);
}


await user.save();
res.json({ id: user.id, name: user.name, email: user.email , message: "Usuario actualizado correctamente"});
} catch (err) { next(err); }
};


const deleteMe = async (req, res, next) => {
try {
const user = await User.findByPk(req.userId);
if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });


await user.destroy();
res.json({ message: 'Cuenta eliminada correctamente' });
} catch (err) { next(err); }
};


module.exports = { getMe, updateMe, deleteMe };