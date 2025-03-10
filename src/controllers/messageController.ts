import { RequestHandler } from 'express';
import { Message } from '../models/Message';

export const getMessagesByGroup: RequestHandler<{ groupId: string }> = async (req, res) => {
  try {
    const messages = await Message.find({ 
      groupId: req.params.groupId 
    }).sort({ timestamp: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching messages' });
  }
};

export const createMessage: RequestHandler = async (req, res) => {
  try {
    const message = new Message(req.body);
    await message.save();
    res.status(201).json(message);
  } catch (error) {
    res.status(400).json({ message: 'Error creating message' });
  }
};

export const updateMessage: RequestHandler<{ id: string }> = async (req, res) => {
  try {
    const message = await Message.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!message) {
      res.status(404).json({ message: 'Message not found' });
    } else {
      res.json(message);
    }
  } catch (error) {
    res.status(400).json({ message: 'Error updating message' });
  }
};

export const deleteMessage: RequestHandler<{ id: string }> = async (req, res) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);
    if (!message) {
      res.status(404).json({ message: 'Message not found' });
    } else {
      res.json({ message: 'Message deleted successfully' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting message' });
  }
};