const {  DataTypes } = require('sequelize');
const sequelize = require('../../connections/positionDataSchema');


const QBLeaders = sequelize.define('qb_leaders', {
    player_id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    player_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    player_display_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    position: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    recent_team: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    headshot_url: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    total_ppr: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    total_pass_yds: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    total_completions: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    total_attempts: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    comp_rate: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    total_pass_tds: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    total_ints: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    td_int_rate: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    avg_passing_epa: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    total_carries: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    total_rush_yds: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

module.exports = QBLeaders;