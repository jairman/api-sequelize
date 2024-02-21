import Sequelize from 'sequelize'

export const sequelize = new Sequelize(
    'apinode', // database name
    'root',     // username
    'loco1727',
    {
    dialect: process.env.DB_DIALECT || 'mysql',
    host: process.env.DB_HOST || 'localhost'


})