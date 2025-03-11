import { RequestHandler } from 'express';
import { Group } from '../models/Group';

export const getAllGroups: RequestHandler = async (_req, res) => {
  try {
    const groups = await Group.find();
    res.json(groups);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching groups' });
  }
};

export const getGroupById: RequestHandler<{ id: string }> = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);
    if (!group) {
      res.status(404).json({ message: 'Group not found' });
    } else {
      res.json(group);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching group' });
  }
};

export const createGroup: RequestHandler = async (req, res) => {
  try {
    const group = new Group(req.body);
    await group.save();
    res.status(201).json(group);
  } catch (error) {
    res.status(400).json({ message: 'Error creating group' });
  }
};

export const updateGroup: RequestHandler<{ id: string }> = async (req, res) => {
  try {
    const group = await Group.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!group) {
      res.status(404).json({ message: 'Group not found' });
    } else {
      res.json(group);
    }
  } catch (error) {
    res.status(400).json({ message: 'Error updating group' });
  }
};

export const deleteGroup: RequestHandler<{ id: string }> = async (req, res) => {
  try {
    const group = await Group.findByIdAndDelete(req.params.id);
    if (!group) {
      res.status(404).json({ message: 'Group not found' });
    } else {
      res.json({ message: 'Group deleted successfully' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting group' });
  }
};