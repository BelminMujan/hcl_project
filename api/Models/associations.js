const Job = require("./job");
const User = require("./user");
const UserJob = require("./userjob");

User.belongsToMany(Job, { through: UserJob, as: "savedJobs", foreignKey: "userId" })
Job.belongsToMany(User, { through: UserJob, as: "usersSaved", foreignKey: "jobId" })