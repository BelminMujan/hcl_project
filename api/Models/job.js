const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require("../database")

const Job = sequelize.define('Job', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true
    },
    trajanje_od: {
        type: DataTypes.STRING,
        allowNull: true
    },
    trajanje_do: {
        type: DataTypes.STRING,
        allowNull: true
    },
    termin_do: {
        type: DataTypes.STRING,
        allowNull: true
    },
    termin_od: {
        type: DataTypes.STRING,
        allowNull: true
    },
    images: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true
    }
}, {
});

module.exports = Job