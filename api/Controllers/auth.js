const jwt = require("jsonwebtoken")
const User = require("../Models/user")
const bcrypt = require("bcrypt")

const login = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }
        let user = await User.findOne({ where: { email } });

        if (user) {
            console.log("User found");
            let isPasswordCorrect = await bcrypt.compare(password, user.password)
            if (isPasswordCorrect) {
                let token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT, { expiresIn: "1h" })
                user = user.get()
                delete user.password
                res.json({ message: "Login successful", user: user, token: token });
            } else {
                return res.status(400).json({ error: "Invalid credentials" })
            }
        } else {
            return res.status(400).json({ error: "Invalid credentials" })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Internal server error on login" })
    }
}
const register = async (req, res) => {
    try {
        const { email, firstName, lastName, password, passwordConfirm } = req.body

        if (!firstName || !lastName || !email || !password || !passwordConfirm) {
            return res.status(400).json({ error: "All fields are required" });
        }
        if (password !== passwordConfirm) {
            return res.status(400).json({ error: "Passwords must match" });
        }
        // Validate email format using regular expression
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: "Invalid email format" });
        }

        // Validate password length (minimum 8 characters)
        if (password.length < 8) {
            return res.status(400).json({ error: "Password must be at least 8 characters long" });
        }

        // Check if the email is already registered in the database
        let existingUser = await User.findOne({ where: { email } });

        if (existingUser) {
            return res.status(400).json({ error: "Email already in use" });
        }
        let newUser = await User.create({
            email: email,
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
        })
        newUser = newUser.get()
        delete newUser.password
        let token = jwt.sign({ userId: newUser.id, email: newUser.email }, process.env.JWT, { expiresIn: "1h" })
        res.json({ message: "Registration successful", user: newUser, token: token });

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Internal server error on register" })
    }
}
const auto_login = async (req, res) => {
    try {
        let query = await User.findOne({ where: { email: req.user.email } });
        if (query) {
            let user = query.get()
            delete user.password
            let token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT, { expiresIn: "1h" })
            res.json({ message: "Autologin successful", user: user, token: token });
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Internal server error on register" })
    }
}

const update_profile = async (req, res) => {
    try {
        let user = await User.findOne({ where: { id: req.body.id } });
        if (user) {
            console.log(req.body);
            await user.update({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                phone: req.body.phone,
                city: req.body.city,
                address: req.body.address,
            });
            if (req.body.password && req.body.password !== "") {
                console.log("mjenjanje sifre");
                await user.update({
                    password: req.body.password
                })
            }

            res.status(200).json({ message: "Profile updated successfully" });
        } else {
            res.status(404).json({ error: "User not found" });
        }


    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Internal server error on register" })
    }
}
module.exports = { login, register, auto_login, update_profile }