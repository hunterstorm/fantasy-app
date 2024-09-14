const { DataTypes } = require('sequelize');
const sequelize = require('../connections/teamDataSchema')

const TeamStats = sequelize.define('team_stats', {
    team_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    posteam: {
        type: DataTypes.STRING,
        allowNull: false
    },
    team_full_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    photo_URL: {
        type: DataTypes.STRING,
        allowNull: false
    },
    run_rate: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    pass_rate: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    total_yards: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    total_run_yards: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    total_pass_yards: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    total_fg_made: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    total_fg_missed: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    fg_rate: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
})

module.exports = TeamStats