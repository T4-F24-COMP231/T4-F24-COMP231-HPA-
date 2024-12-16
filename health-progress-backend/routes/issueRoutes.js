const express = require('express');
const router = express.Router();
const Issue = require('../models/Issue');

router.post('/report', async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({ message: 'Title and description are required.' });
  }

  try {
    const newIssue = new Issue({ title, description });
    await newIssue.save();
    res.status(201).json({ message: 'Issue reported successfully.', issue: newIssue });
  } catch (error) {
    console.error('Error saving issue:', error);
    res.status(500).json({ message: 'Failed to save issue.' });
  }
});

router.get('/', async (req, res) => {
  try {
    const issues = await Issue.find().sort({ reportedAt: -1 });
    res.status(200).json(issues);
  } catch (error) {
    console.error('Error fetching issues:', error);
    res.status(500).json({ message: 'Failed to fetch issues.' });
  }
});

module.exports = router;
