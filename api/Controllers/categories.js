const Category = require("../Models/category")


const load = async (req, res) => {
    try {
        let catego = await Category.findAll()
        return res.status(200).json(catego)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Internal server error on dodajUslugu" })
    }
}

module.exports = { load }