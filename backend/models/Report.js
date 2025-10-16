const mongoose = require('mongoose');
const { creditAccountSchema } = require('./creditAccount.js');

const reportSchema = new mongoose.Schema({
    basicDetails: {
        name: {
            type: String,
            required: true
        },
        mobilePhone: {
            type: String
        },
        pan: {
            type: String,
            required: true,
            unique: true
        },
        creditScore: {
            type: Number,
            required: true
        }
    },
    reportSummary: {
        totalAccounts: Number,
        activeAccounts: Number,
        closedAccounts: Number,
        currentBalanceAmount: Number,
        securedAmount: Number,
        unsecuredAmount: Number,
        enquiriesLast7Days: Number,
    },
    creditAccounts: [creditAccountSchema]
}, {
    timestamps: true 
});

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;