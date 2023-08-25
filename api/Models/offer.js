const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require("../database")

const status = require("../Helpers/status")

const Offer = sequelize.define('Offers', {
    details: {
        type: DataTypes.STRING,
        allowNull: false
    },
    requirements: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price_from: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    price_to: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "Users",
            key: "id"
        }
    },
    jobId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "Jobs",
            key: "id"
        }
    },
    status: {
        type: DataTypes.ENUM(status.SENT, status.BEING_REVIEWED, status.ACCEPTED, status.IN_PROGRESS, status.COMPLETED),
        allowNull: false,
        defaultValue: status.SENT
    }
}, {
    indexes: [
        {
            unique: true,
            fields: ['jobId', 'userId']
        }
    ]
});

module.exports = Offer