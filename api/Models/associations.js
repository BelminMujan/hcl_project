const Job = require("./job");
const User = require("./user");
const UserJob = require("./userjob");
const Usluga = require("./usluga");

User.belongsToMany(Job, { through: UserJob, as: "savedJobs", foreignKey: "userId" })
Job.belongsToMany(User, { through: UserJob, as: "usersSaved", foreignKey: "jobId" })

User.hasMany(Usluga, { as: "usluge", foreignKey: "userId" })
Usluga.belongsTo(User, { as: "user", foreignKey: "userId" })
