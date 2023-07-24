const express = require("express")
const cors = require("cors")
require("dotenv").config()
const bodyParser = require("body-parser")

const app = express()

app.listen(process.env.PORT, () => console.log(`Server is listening on port ${process.env.PORT}`))