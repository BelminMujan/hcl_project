const { sequelize } = require("../database")

const Usluga = sequelize.define('Usluga', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    hourlyRate: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    tableName: "Usluge"
});

module.exports = Usluga