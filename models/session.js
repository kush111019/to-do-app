const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    startTime: { type: Date, default: Date.now },
    endTime: { type: Date },
    ipAddress: { type: String }
}, { timestamps: true });

// Create an index for userId and startTime to speed up queries
sessionSchema.index({ userId: 1, startTime: 1 });

const Session = mongoose.model('Session', sessionSchema);

module.exports = Session;
