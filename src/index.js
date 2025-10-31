const express = require('express');

const variables = require('./utils/variables.js')

const sequelize = require('./config/db.js');
const authRoutes = require('./routes/auth.js');
const userRoutes = require('./routes/user.js');
const errorHandler = require('./middlewares/errorHandler.js');

const cookieParser = require('cookie-parser');
const app = express();



app.use(cookieParser());
app.use(express.json());


app.use('/api/auth', authRoutes);
app.use('/api', userRoutes);


app.get('/', (req, res) => res.json({ ok: true, message: 'API Usuarios funcionando' }));


app.use(errorHandler);


const PORT = variables.PORT || 3000;


(async () => {
try {
await sequelize.authenticate();
await sequelize.sync();
console.log('Conexión con la DB exitosa');


app.listen(PORT, () => console.log(`Servidor listo en puerto: ${PORT}`));
} catch (err) {
console.error('No se pudo conectar a la DB:', err);
process.exit(1);
}
})();