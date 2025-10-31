const { Sequelize } = require('sequelize');
const variables = require('../utils/variables.js');


const sequelize = new Sequelize(variables.DB_NAME, variables.DB_USER, variables.DB_PASS , {
host: variables.DB_HOST,
port: variables.DB_PORT || 3306,
dialect: 'mysql',
logging: false
});


module.exports = sequelize;