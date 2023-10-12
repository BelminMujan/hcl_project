const { Sequelize } = require("sequelize");
// const { Umzug, SequelizeStorage } = require('umzug');


// const sequelize = new Sequelize(process.env.DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
//     host: process.env.DB_HOST,
//     dialect: 'mysql',
// });

let sequelize;
if (process.env.NODE_ENV === "production") {
    sequelize = new Sequelize(process.env.DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
        host: process.env.DB_HOST,
        dialect: 'mysql',
    })
} else {
    sequelize = new Sequelize(
        process.env.DATABASE,
        process.env.DB_USERNAME,
        process.env.DB_PASSWORD,
        {
            host: process.env.MYSQL_HOST,
            port: process.env.MYSQL_PORT,
            dialect: "mysql",
            pool: {
                max: 100,
                min: 0,
                idle: 30000,
                acquire: 10000,
            },
        }
    );
}

const tryDatabaseConnection = () => {
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
            setTimeout(tryDatabaseConnection, 5000);
        });
};

tryDatabaseConnection();



//legacy migrations
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
