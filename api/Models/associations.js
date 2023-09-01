const Category = require("./category");
const Job = require("./job");
const Offer = require("./offer");
const User = require("./user");
const UserJob = require("./userjob");
const Usluga = require("./usluga");

User.belongsToMany(Job, { through: UserJob, as: "savedJobs", foreignKey: "userId" })
Job.belongsToMany(User, { through: UserJob, as: "usersSaved", foreignKey: "jobId" })

User.hasMany(Usluga, { as: "usluge", foreignKey: "userId" })
Usluga.belongsTo(User, { as: "user", foreignKey: "userId" })

Job.hasMany(Offer, { as: 'jobOffers', foreignKey: 'jobId' });
Offer.belongsTo(Job, { as: 'job', foreignKey: 'jobId' });

User.hasMany(Offer, { as: 'userOffers', foreignKey: 'userId' });
Offer.belongsTo(User, { as: 'user', foreignKey: 'userId' });

Job.belongsTo(Category, { as: "category", foreignKey: "categoryId" });
Category.hasMany(Job, { as: "jobs", foreignKey: "categoryId" })