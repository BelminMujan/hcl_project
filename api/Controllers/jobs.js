const Job = require("../Models/job")


const get = async (req, res) => {
    try {
        let jobs
        switch (req.params.type) {
            case "public":
                jobs = await Job.findAll({})
                break;
            case "my":
                console.log("Getting my");
                console.log(req.user);
                jobs = await Job.findAll({ where: { userId: req.user.userId } })
                break;

            default:
                jobs = await Job.findAll({})
                break;
        }
        return res.status(200).json(jobs)
    } catch (error) {
        return res.status(500).json({ error: "Internal server error while getting jobs" })
    }
}

module.exports = { get }