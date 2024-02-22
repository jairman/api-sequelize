import mysql from "promise-mysql";
import config from './../config.js'


import Sequelize from 'sequelize'

export const sequelize = new Sequelize(
    config.database, // database name
    config.user,     // username
    config.password,
    {
    dialect: config.dialect,
    host: config.host

})