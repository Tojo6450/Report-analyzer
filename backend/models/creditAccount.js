const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    line1: String,
    line2: String,
    city: String,
    state: String,
    postalCode: String,
}, { _id: false }); 

const creditAccountSchema = new mongoose.Schema({
    subscriberName: String, 
    accountNumber: String,
    accountType: String,
    openDate: Date,
    currentBalance: {
        type: Number,
        default: 0
    },
    amountOverdue: {
        type: Number,
        default: 0
    },
    paymentHistory: String,
    address: addressSchema,
}, { _id: false });

module.exports = {
    creditAccountSchema,
    addressSchema
};