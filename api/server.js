const express = require("express")
const cors = require("cors")
require("dotenv").config()
const bodyParser = require("body-parser")
const { sequelize, runMigrations, rollbackLastMigration } = require('./database');
const authRouter = require("./Routes/authRouter")
const jobsRouter = require("./Routes/jobsRouter")
const uslugeRouter = require("./Routes/uslugeRouter")
const offerRouter = require("./Routes/offerRouter")
const categoriesRouter = require("./Routes/categoriesRouter")
require('./Models/associations');

const app = express()
app.use(cors())
app.use(bodyParser.json())

app.use("/auth", authRouter)
app.use("/jobs", jobsRouter)
app.use("/usluga", uslugeRouter)
app.use("/offer", offerRouter)
app.use("/categories", categoriesRouter)


app.get("/migrate", (req, res) => {
    runMigrations()
    res.sendStatus(200)
})
app.get("/migrate_rollback", (req, res) => {
    rollbackLastMigration()
    res.sendStatus(200)
})
app.listen(process.env.PORT, () => console.log(`Server is listening on port ${process.env.PORT}`))