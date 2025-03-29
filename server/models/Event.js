// const mongoose = require("mongoose");

// const EventSchema = new mongoose.Schema({
//     title : {
//         type: String,
//         required: true
//     },
//     description : {
//         type: String,
//         required: true,
//         trime : true,
//     },
//     dateTime : {
//         type: Date,
//         required: true,
//     },
//     duration : {
//         type: Number,
//         required: true,
//     },
//     link : {
//         type: String,
//         required: true,
//     },
//     bannerImage : {
//         type: String
//     },
//     backgroundColor: { 
//         type: String
//      },
//     password: { 
//         type: String,
//         required: true
//     },
//     status: {
//         type: String,
//         enum: ['upcoming', 'pending', 'canceled', 'active', 'deactivated'],
//         default: 'upcoming',
//       },
//       createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//       participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
//     //   createdAt: { type: Date, default: Date.now },
//       updatedAt: { type: Date, default: Date.now },
//     });
//     module.exports = mongoose.model('Event', EventSchema);
const mongoose = require("mongoose");

const participantSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },  // ✅ Store participant ID as ObjectId
    status: { type: String, enum: ["pending", "accepted", "rejected"], default: "pending" }
});

const EventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true, trim: true },
    dateTime: { type: Date, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    duration: { type: Number, required: true },
    link: { type: String, required: true },
    bannerImage: { type: String },
    backgroundColor: { type: String },
    password: { type: String, required: true },
    status: {
        type: String,
        enum: ['upcoming', 'pending', 'canceled', 'active', 'deactivated'],
        default: 'upcoming'
    },
    participants: [participantSchema],    // ✅ Array of participant objects
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },   // ✅ Creator as ObjectId
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Event', EventSchema);




