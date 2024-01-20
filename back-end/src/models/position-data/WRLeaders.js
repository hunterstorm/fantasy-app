const { DataTypes } = require('sequelize');
const sequelize = require('../../connections/positionDataSchema');

const WRLeaders = sequelize.define('wr_leaders', {
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
        allowNull: true,
    },
    headshot_url: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    total_ppr: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    total_targets: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    avg_target_share: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    total_rec: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    total_rec_yards: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    total_yac: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    total_rec_tds: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    avg_rec_epa: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
});

module.exports = WRLeaders;