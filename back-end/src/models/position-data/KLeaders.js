const { DataTypes } = require('sequelize');
const sequelize = require('../../connections/positionDataSchema');

const KLeaders = sequelize.define('k_leaders', {
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
    team: {
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
    total_fg_att: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    total_fg_made: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    total_fg_missed: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    fg_pct: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    avg_make_yds: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    avg_miss_yds: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    total_pat_att: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    total_pat_missed: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

module.exports = KLeaders;