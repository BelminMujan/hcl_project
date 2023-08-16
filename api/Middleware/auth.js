const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1]
    if (!token) {
        return res.status(401).json({ message: "Not authenticated" })
    }
    jwt.verify(token, process.env.JWT, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Not authenticated" })
        }
        req.user = user
        console.log(user);
        next()
    })
}

const maybeAuthenticate = (req, res, next) => {
    let token = req.header("Authorization")?.split(" ")[1]
    if (token) {
        jwt.verify(token, process.env.JWT, (err, user) => {
            req.user = user
        })
    }
    next()
}

module.exports = { authenticate, maybeAuthenticate }