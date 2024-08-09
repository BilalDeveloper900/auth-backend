const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String, required: true,
    },
    password: {
        type: String, required: true,
    },
    email: {
        type: String, required: true, unique: true,
    },
    gender: {
        type: String, enum: ['male', 'female']
    },
    dateOfBirth: {
        type: Date, required: true,
    },
    address: {
        type: String,
    },
    idCardNumber: {
        type: String, required: true,
    },
    bank: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Bank', required: true,
    },
    status: {
        type: String, enum: ['requested', 'pending', 'approved', 'rejected'], default: 'requested',
    },
    createdAt: {
        type: Date, default: Date.now,
    },
    updatedAt: {
        type: Date, default: Date.now,
    },
});


const bankRegistrationSchema = new mongoose.Schema({
    bankName: {
        type: String, required: true, unique: true
    },
    branchName: {
        type: String, required: true
    },
    ifscCode: {
        type: String, required: true, unique: true
    },
    contactNumber: {
        type: Number, required: true
    },
    email: {
        type: String, required: true, unique: true
    },
    password: {
        type: String, required: true,
    },
    address: {
        type: String,
    },
    role: {
        type: String, required: true, enum: ['Bank', 'User'], default: 'Bank'
    },
    createdAt: {
        type: Date, default: Date.now,
    },
    updatedAt: {
        type: Date, default: Date.now,
    },
});



module.exports = {
    Banks: mongoose.model('Banks', bankRegistrationSchema),
    Users: mongoose.model('User', UserSchema),
};