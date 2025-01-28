const express = require('express');
const router = express.Router();
const { saveMessage, getMessages } = require('../models/messageModel');

router.post('/messages', async (req, res) => {
  const { role, text } = req.body;
  try {
    await saveMessage(role, text);
    res.status(201).json({ message: 'Message saved successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/messages', async (req, res) => {
  try {
    const messages = await getMessages();
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;