const Job = require("./job");
const Offer = require("./offer");
const User = require("./user");
const UserJob = require("./userjob");
const Usluga = require("./usluga");

User.belongsToMany(Job, { through: UserJob, as: "savedJobs", foreignKey: "userId" })
Job.belongsToMany(User, { through: UserJob, as: "usersSaved", foreignKey: "jobId" })

User.hasMany(Usluga, { as: "usluge", foreignKey: "userId" })
Usluga.belongsTo(User, { as: "user", foreignKey: "userId" })

Offer.hasOne(User, { as: "user", foreignKey: "userId" })
Offer.hasOne(Job, { as: "job", foreignKey: "jobId" })
Job.belongsTo(Offer, { as: "offers", foreignKey: "jobId" })
User.belongsTo(Offer, { as: "offers", foreignKey: "userId" })