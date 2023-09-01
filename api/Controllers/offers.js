const Usluga = require("../Models/usluga")
const User = require("../Models/user")
const Offer = require("../Models/offer")
const status = require("../Helpers/status")


const save = async (req, res) => {
    try {
        const { offer_details, requirements, price_from, price_to, jobId } = req.body
        const userId = req.user.userId
        if (!offer_details || !requirements || !jobId || !userId) {
            return res.status(400).json({ error: "Popuni sva polja" });
        }
        console.log("creating offer");
        Offer.create({
            userId: userId,
            details: offer_details,
            requirements: requirements,
            price_from: price_from,
            price_to: price_to,
            jobId: jobId,
            status: status.SENT
        }).then(data => {
            console.log("Usluga poslana ponuda")
            return res.status(200).json({ message: "Uspjesno poslana ponuda" })
        }).catch(e => {
            console.log("Error prilikom slanja ponude!");
            console.log(e);
            return res.status(400).json({ error: "Error prilikom slanja ponude!" });
        })
    } catch (error) {
        res.status(500).json({ error: "Internal server error on slanje ponude" })
    }
}

const load = async (req, res) => {
    try {
        let type = req.params?.type
        let offers = []
        if (type === "my") {
            offers = await Offer.findAll({ where: { userId: req?.user?.userId } })
        }
        if (offers.length != 0) {
            return res.status(200).json(offers)
        } else {
            return res.status(404).json({ error: "Nema ponuda" })
        }
    } catch (error) {
        res.status(500).json({ error: "Internal server error on slanje ponude" })
    }
}

const changeStatus = async (req, res) => {
    try {
        console.log(req.params);
        let offer = await Offer.findByPk(parseInt(req?.params?.id))
        console.log(offer);
        await offer.update({
            status: req?.params?.status
        }
        )
        return res.status(200).json({ success: "Status promjenjen u " + req?.params?.status })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Internal server error on status change" })
    }
}


module.exports = { save, load, changeStatus }