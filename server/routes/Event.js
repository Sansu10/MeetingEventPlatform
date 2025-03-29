const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Event = require('../models/Event');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const auth = require('../middlewares/Auth');  // ✅ Middleware for authentication

// ✅ Create Event with Participants & Availability Check
router.post('/', auth, async (req, res) => {
    const { 
        title, description, dateTime, duration, link, bannerImage, backgroundColor, password, participants 
    } = req.body;

    try {
        const start = new Date(dateTime);
        if (isNaN(start.getTime())) {
            return res.status(400).json({ success: false, message: "Invalid date format" });
        }

        const end = new Date(start.getTime() + duration * 60000);

        // 🔥 Availability check
        const overlappingEvent = await Event.findOne({
            $or: [
                { $and: [{ startTime: { $lt: end } }, { endTime: { $gt: start } }] },
                { $and: [{ startTime: { $eq: start } }, { endTime: { $eq: end } }] }
            ]
        });

        if (overlappingEvent) {
            return res.status(400).json({
                success: false,
                message: "Event time conflicts with an existing event.",
                conflictingEvent: overlappingEvent
            });
        }

        // ✅ Validate & Convert participants to ObjectId safely
        const participantData = participants
            .filter(id => mongoose.isValidObjectId(id))  // ✅ Ensure only valid IDs
            .map(id => ({
                userId: new mongoose.Types.ObjectId(id),   // ✅ Safe ObjectId conversion
                status: "pending"
            }));

        const event = new Event({
            title,
            description,
            dateTime,
            startTime: start,
            endTime: end,
            duration,
            link,
            bannerImage,
            backgroundColor,
            password: password ? await bcrypt.hash(password, 10) : undefined,
            createdBy: req.user.userId,
            participants: participantData
        });

        await event.save();
        
        res.status(201).json({ success: true, message: 'Event created successfully', event });

    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// ✅ Get All Events (with pagination)
router.get('/', auth, async (req, res) => {
    const { page = 1, limit = 10 } = req.query;


    try {
        const query = { createdBy: req.user.userId };   //  Filter by current user ID

        const events = await Event.find(query)   //  Find events by user ID
        const total = await Event.countDocuments(query);
        res.json({ 
            success: true, 
            events, 
            total, 
            page: Number(page), 
            limit: Number(limit) 
        });

    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// get meeting by status 
router.get("/userMeetings", auth, async (req, res) => {
    try {
      const now = new Date();
      const query = {
        $or: [{ createdBy: req.user.userId }, { "participants.useId": req.user.userId }],
      };
    //   res.send(query);
      const meetings = await Event.find(query)
        // .p("createdBy", "name email")
        // .populate("participants.user", "name email");
  

        res.send(meetings)
      const categorizedMeetings = {
        upcoming: meetings.filter(
          (m) =>          (
              m.createdBy.id.toString() === req.user.userId ||
              m.participants.find((p) => p.status === "accepted"))
        ),
        past: meetings.filter((m) => {
          const isPast = new Date(m.dateTime).getTime() + m.duration * 60000 < now.getTime();
          const isCreator = m.createdBy._id.toString() === req.user.userId;
          const participant = m.participants.find(
            (p) => p.user && p.user._id.toString() === req.user.userId
          );
          return isPast && (isCreator || participant);
        }),
        pending: meetings.filter((m) =>{
          const isCreator = m.createdBy._id.toString() === req.user.userId;
          const participant = m.participants.find(
            (p) => p.user && p.user._id.toString() === req.user.userId
          );
          return !isCreator && participant && participant.status === "pending";
      }),
        cancelled: meetings.filter((m) =>{
          const isCreator = m.createdBy._id.toString() === req.user.userId;
          const participant = m.participants.find(
            (p) => p.user && p.user._id.toString() === req.user.userId
          );
          return !isCreator && participant && participant.status === "rejected";
        }
        ),
      };
      res.json({ success: true, events: categorizedMeetings });
    } catch (error) {
  
      console.log(error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  });
  


//  Get Event by ID
router.get('/:id', auth, async (req, res) => {
    try {
        const event = await Event.findById(req.params.id)
            .populate('createdBy', 'name email')
            .populate('participants.userId', 'name email');

        if (!event) {
            return res.status(404).json({ success: false, message: 'Event not found' });
        }

        res.status(200).json({ success: true, event });

    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});


// ✅ Update Event by ID with ObjectId handling
router.put('/:id', auth, async (req, res) => {
    try {
        const { dateTime, duration, participants } = req.body;

        if (dateTime && duration) {
            const start = new Date(dateTime);
            const end = new Date(start.getTime() + duration * 60000);

            const overlappingEvent = await Event.findOne({
                _id: { $ne: req.params.id },
                $or: [
                    { $and: [{ startTime: { $lt: end } }, { endTime: { $gt: start } }] }
                ]
            });

            if (overlappingEvent) {
                return res.status(400).json({
                    success: false,
                    message: "Updated event time conflicts with an existing event.",
                    conflictingEvent: overlappingEvent
                });
            }
        }

        const updateData = { ...req.body, updatedAt: Date.now() };

        // ✅ Convert participants to ObjectId safely
        if (participants) {
            updateData.participants = participants
                .filter(id => mongoose.isValidObjectId(id))  // ✅ Filter valid IDs
                .map(id => ({
                    userId: mongoose.Types.ObjectId(id),
                    status: "pending"
                }));
        }

        const event = await Event.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        ).populate('participants.userId', 'name email');

        if (!event) {
            return res.status(404).json({ success: false, message: 'Event not found' });
        }

        res.status(200).json({ success: true, message: 'Event updated successfully', event });

    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// ✅ Delete Event by ID
router.delete('/:id', auth, async (req, res) => {
    try {
        const event = await Event.findByIdAndDelete(req.params.id);

        if (!event) {
            return res.status(404).json({ success: false, message: 'Event not found' });
        }

        res.json({ success: true, message: 'Event deleted successfully' });

    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;
