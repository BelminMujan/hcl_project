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

        sequelize.sync({ force: false }).then(() => {
            console.log('Database and tables synchronized.');
        })
            .catch((err) => {
                console.error('Error synchronizing database:', err);
            });

    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
    });



// const umzug = new Umzug({
//     migrations: { glob: 'Migrations/*.js' },
//     context: sequelize.getQueryInterface(),
//     storage: new SequelizeStorage({ sequelize }),
//     logger: console,
// });


// async function runMigrations() {
//     try {
//         const pendingMigrations = await umzug.pending();
//         if (pendingMigrations.length > 0) {
//             await umzug.up();
//             console.log('Migrations executed successfully.');
//         } else {
//             console.log('No pending migrations.');
//         }
//     } catch (err) {
//         console.error('Error running migrations:', err);
//     }
// }
// async function rollbackLastMigration() {
//     try {
//         const [migration] = await umzug.down();
//         if (migration) {
//             console.log(`Rolled back migration: ${migration.file}`);
//         } else {
//             console.log('No migration to rollback.');
//         }
//     } catch (error) {
//         console.error('Error rolling back migration:', error);
//     }
// }

module.exports = { sequelize };
