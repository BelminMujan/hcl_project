const express = require("express")
const cors = require("cors")
require("dotenv").config()
const bodyParser = require("body-parser")
const { sequelize, runMigrations } = require('./database');
const authRouter = require("./Routes/authRouter")

const app = express()
app.use(cors())
app.use(bodyParser.json())

app.use("/auth", authRouter)


app.get("/migrate", (req, res) => {
    runMigrations()
    res.sendStatus(200)
})
app.listen(process.env.PORT, () => console.log(`Server is listening on port ${process.env.PORT}`))