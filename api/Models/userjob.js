const { sequelize } = require("../database")

const UserJob = sequelize.define('UserJob', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
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
}, {
    indexes: [
        {
            unique: true,
            fields: ["userId", "jobId"]
        }
    ]
});

module.exports = UserJob