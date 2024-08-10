const { allBanks } = require('../controllers/banksController');
const express = require('express');
const router = express.Router();

const app = express();

router.get('/all-banks',allBanks);

module.exports =router;