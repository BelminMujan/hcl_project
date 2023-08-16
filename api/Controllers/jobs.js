const Job = require("../Models/job")
const User = require("../Models/user")
const UserJob = require("../Models/userjob")


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
            case "saved":
                console.log("Getting saved jobs");
                console.log(req.user);
                let user = await User.findByPk(req.user.userId)
                jobs = await user.getSavedJobs()
                console.log(jobs);
                break;
            default:
                let users = await Job.findAll({
                    include: {
                        model: User,
                        as: "usersSaved",
                    }
                })

                jobs = users.map(job => {
                    let temp = job.toJSON()
                    temp.isSaved = job.usersSaved.filter(user => user.id === req.user?.userId).length
                    delete temp.usersSaved
                    return temp
                })
                break;
        }
        return res.status(200).json(jobs)
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const save_job = async (req, res) => {
    try {
        let jobId = req.params.id
        let userId = req.user.userId
        if (!jobId || !userId) {
            return res.status(400).json({ error: "User id or job id is missing" })
        }
        let existing = await UserJob.findAll({ where: { userId: userId, jobId: jobId } })
        if (existing && existing.length > 0) {
            console.log(existing);
            await UserJob.destroy({
                where: {
                    userId: userId,
                    jobId: jobId,
                }
            });
            return res.status(200).json({ message: "Posao uklonjen iz sacuvanih", isSaved: false })
        }
        await UserJob.create({
            userId: userId,
            jobId: jobId,
        });
        console.log("Job saved");
        return res.status(200).json({ message: "Posao sacuvan", isSaved: true })
    } catch (error) {
        res.status(500).json({ error: "Internal server error on register" })
    }
}
const remove_saved_job = async (req, res) => {  //depricated
    try {
        let jobId = req.params.id
        let userId = req.user.userId
        if (!jobId || !userId) {
            return res.status(400).json({ error: "User id or job id is missing" })
        }
        await UserJob.destroy({
            where: {
                userId: userId,
                jobId: jobId,
            }
        });
        console.log("Job removed from saved");
        return res.status(200).json({ success: "Job removed", isSaved: false })
    } catch (error) {
        res.status(500).json({ error: "Internal server error on register" })
    }
}

const objavi_oglas = async (req, res) => {
    try {
        const { title, description, city, address, trajanje_od, trajanje_do, termin_od, termin_do } = req.body
        if (!title || !description || !city) {
            return res.status(400).json({ error: "Naslov, opis i grad su neophodni" });
        }

        Job.create({
            userId: req.user.userId,
            title: title,
            description: description,
            city: city,
            address: address,
            trajanje_do: trajanje_do,
            trajanje_od: trajanje_od,
            termin_od: termin_od,
            termin_do: termin_do
        }).then(data => {
            console.log("Oglas uspjesno objavljen")
            console.log(data);
            return res.status(200).json({ message: "Oglas uspjesno objavljen" })
        }).catch(e => {
            console.log("Error prilikom preiranja oglasa");
            console.log(e);
            return res.status(400).json({ error: "Error prilikom preiranja oglasa" });
        })
    } catch (error) {
        res.status(500).json({ error: "Internal server error on register" })
    }
}

const izbrisi_oglas = async (req, res) => {
    try {
        Job.destroy({ where: { id: req.params.id } }).then(deleted => {
            console.log(deleted)
            return res.status(200).json({ message: "Oglas uspjesno izbrisan" })
        }).catch(e => {
            console.log(e)
            return res.status(400).json({ error: "Error prilikom brisanja oglasa" });
        })
    } catch (error) {
        res.status(500).json({ error: "Internal server error on izrisi oglas" })
    }
}

module.exports = { get, save_job, objavi_oglas, izbrisi_oglas, remove_saved_job }