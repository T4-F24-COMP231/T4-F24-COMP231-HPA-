const express = require('express');
const router = express.Router();
const Message = require('../models/message');

// Send a message
router.post('/messages', async (req, res) => {
  const { senderId, recipientId, message } = req.body;

  try {
    const newMessage = new Message({ senderId, recipientId, message });
    await newMessage.save();
    res.status(201).json({ message: 'Message sent successfully!', newMessage });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send message.' });
  }
});

// Fetch chat history
router.get('/messages/:senderId/:recipientId', async (req, res) => {
  const { senderId, recipientId } = req.params;

  try {
    const messages = await Message.find({
      $or: [
        { senderId, recipientId },
        { senderId: recipientId, recipientId: senderId },
      ],
    }).sort({ timestamp: 1 });

    res.status(200).json({ messages });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch messages.' });
  }
});
