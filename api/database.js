const { Sequelize } = require("sequelize");
const { Umzug, SequelizeStorage } = require('umzug');


const sequelize = new Sequelize(process.env.DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: '127.0.0.1',
    dialect: 'mysql',
});

sequelize
    .authenticate()
    .then(() => {
        console.log('Database connected');
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
    });

const umzug = new Umzug({
    migrations: { glob: 'Migrations/*.js' },
    context: sequelize.getQueryInterface(),
    storage: new SequelizeStorage({ sequelize }),
    logger: console,
});


async function runMigrations() {
    try {
        const pendingMigrations = await umzug.pending();
        if (pendingMigrations.length > 0) {
            await umzug.up();
            console.log('Migrations executed successfully.');
        } else {
            console.log('No pending migrations.');
        }
    } catch (err) {
        console.error('Error running migrations:', err);
    }
}

module.exports = { sequelize, runMigrations };
