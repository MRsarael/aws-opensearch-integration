const Sequelize = require('sequelize');

require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_DB, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
	dialect: process.env.DATABASE_CLIENT,
	host: process.env.DATABASE_HOST,
	port: process.env.DATABASE_PORT,
});

module.exports = sequelize;
