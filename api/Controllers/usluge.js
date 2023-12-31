const Usluga = require("../Models/usluga")
const User = require("../Models/user")


const dodajUslugu = async (req, res) => {
    try {
        const { title, description, hourlyRate } = req.body
        if (!title || !description || !hourlyRate) {
            return res.status(400).json({ error: "Popuni sva polja" });
        }

        Usluga.create({
            userId: req.user.userId,
            title: title,
            description: description,
            hourlyRate: hourlyRate
        }).then(data => {
            console.log("Usluga uspjesno dodana")
            return res.status(200).json({ message: "Usluga uspjesno dodana" })
        }).catch(e => {
            console.log("Error prilikom dodavanja usluge");
            console.log(e);
            return res.status(400).json({ error: "Error prilikom dodavanja usluge" });
        })
    } catch (error) {
        res.status(500).json({ error: "Internal server error on dodajUslugu" })
    }
}

const loadForUser = async (req, res) => {
    try {
        let usluge = await Usluga.findAll({ where: { "userId": req.user.userId } })
        console.log("usluge");
        console.log(usluge);
        return res.status(200).json(usluge)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Internal server error on dodajUslugu" })
    }
}
const loadAll = async (req, res) => {
    try {
        let usluge = await Usluga.findAll({
            include: {
                model: User,
                as: "user"
            }
        })
        return res.status(200).json(usluge)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Internal server error on dodajUslugu" })
    }
}
const deleteUsluga = async (req, res) => {  //depricated
    try {
        let uslugaId = req.params.id
        if (!uslugaId) {
            return res.status(400).json({ error: "Usluga ne postoji" })
        }
        await Usluga.destroy({
            where: {
                id: uslugaId,
            }
        });
        console.log("Job removed from saved");
        return res.status(200).json({ success: "Usluga izbrisana" })
    } catch (error) {
        res.status(500).json({ error: "Internal server error on register" })
    }
}

module.exports = { dodajUslugu, loadForUser, deleteUsluga, loadAll }