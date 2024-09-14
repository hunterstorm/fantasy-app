const { Sequelize } = require('sequelize');
const config = require('../../config.json');

const username = config.DB_USER
const server = config.DB_SERVER
const password = config.DB_PASSWORD
const dbName = config.DB_NAME
const port = config.DB_PORT

const teamDataSchemaConnection = new Sequelize(`postgres://${username}:${password}@${server}:${port}/${dbName}`, {
    define: {
        timestamps: false,
        schema: 'team_data'
    }
});

module.exports = teamDataSchemaConnection