const {  Banks } = require('../models/userSchema');


const allBanks= async (req, res) => {
    try {
        const allBanks = await Banks.find({ role: "Bank" });
        res.json(allBanks);
    } catch (error) {
        console.log(error);
    }
}


module.exports={
    allBanks
    };