const { Sequelize } = require('sequelize');

module.exports = {
    up: async ({ context: queryInterface }) => {
        await queryInterface.createTable("Jobs", {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            title: {
                type: Sequelize.STRING,
                allowNull: false
            },
            description: {
                type: Sequelize.STRING,
                allowNull: false
            },
            userId: {
                type: Sequelize.STRING,
                allowNull: false
            },
            city: {
                type: Sequelize.STRING,
                allowNull: false
            },
            address: {
                type: Sequelize.STRING,
                allowNull: false
            },
            trajanje_od: {
                type: Sequelize.STRING,
                allowNull: false
            },
            trajanje_do: {
                type: Sequelize.STRING,
                allowNull: false
            },
            termin_do: {
                type: Sequelize.DATE,
                allowNull: false
            },
            termin_od: {
                type: Sequelize.DATE,
                allowNull: false
            },
            images: {
                type: Sequelize.ARRAY,
                allowNull: true,
                get() {
                    return JSON.parse(this.getDataValue('images') || '[]');
                },
                set(value) {
                    this.setDataValue('images', JSON.stringify(value));
                },
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false
            }
        })
    },

    down: async ({ context: queryInterface }) => {
        await queryInterface.dropTable('Jobs');
    }
}