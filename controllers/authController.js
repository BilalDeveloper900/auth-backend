
const bcrypt = require('bcryptjs');
const { Users, Banks } = require('../models/userSchema');

const registerUser =async (req, res) => {
    try {
        const { name, password, email, confirmPassword, gender, dateOfBirth, address, bank, idCardNumber } = req.body;
        console.log(bank ,"bank id")

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const updateDate = new Date(dateOfBirth);

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
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Server error', error });
    }
}

const registerBank= async (req, res) => {
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
}

const login =async (req, res) => {
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
}

module.exports={
login,
registerBank,
registerUser
}