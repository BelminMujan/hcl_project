const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require("../database")

const Job = sequelize.define('Jobs', {
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
        type: DataTypes.DATE,
        allowNull: true
    },
    termin_od: {
        type: DataTypes.DATE,
        allowNull: true
    },
    images: {
        type: DataTypes.STRING,
        allowNull: true,
        get() {
            const images = this.getDataValue('images');
            return images ? JSON.parse(images) : [];
        },
        set(value) {
            this.setDataValue('images', value ? JSON.stringify(value) : null);
        },
    },
}, {
});

module.exports = Job