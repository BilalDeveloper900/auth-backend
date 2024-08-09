const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const { Users, Banks } = require('./models/User');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/authentication");

// User Registration
app.post('/register-user', async (req, res) => {
    try {
        const { name, password, email, confirmPassword, gender, dateOfBirth, address, bank,idCardNumber } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const updateDate = new Date(dateOfBirth)
        const newUser = new Users({
            name,
            password: hashedPassword,
            email,
            gender,
            dateOfBirth: updateDate,
            address,
            bank,
            idCardNumber
        });

        const savedUser = await newUser.save();
        res.json(savedUser);

    } catch (error) {
        console.log(error)
    }
});

// Bank Registration
app.post('/register-bank', async (req, res) => {
    try {
        const { bankName, branchName, ifscCode, contactNumber, email, address, password, confirmPassword } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new Banks({
            bankName,
            branchName,
            ifscCode,
            contactNumber,
            password: hashedPassword,
            email,
            address,
            role: "Bank"
        });

        const savedUser = await newUser.save();
        res.json(savedUser);

    } catch (error) {
        console.log(error)
    }
});

// User Login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await Users.findOne({ email: email });
        if (user) {
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                res.json("Success");
            } else {
                res.status(400).json("The password is incorrect");
            }
        } else {
            res.status(400).json("No record existed");
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/all-banks', async (req, res) => {
    try {
        const allBanks = await Banks.find({ role: "Bank" }, { bankName: 1, _id: 1 });
        res.json(allBanks);
    } catch (error) {
        console.log(error);
    }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
