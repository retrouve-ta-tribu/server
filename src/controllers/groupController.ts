import { RequestHandler } from 'express';
import { Group } from '../models/Group';
import { User } from '../models/User';

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

export const addUserToGroup: RequestHandler<{ id: string; userId: string }> = async (req, res) => {
  try {
    const user = await User.findOne({ googleId: req.params.userId });
    const group = await Group.findById(req.params.id);

    if (!user || !group) {
      res.status(404).json({ message: "User or group not found" });
      return;
    }

    if (group.members.includes(user.googleId)) {
      res.status(400).json({ message: "User is already in the group" });
      return;
    }

    group.members.push(user.googleId);
    await group.save();

    res.json({ message: "User added to group successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error adding user to group" });
  }
};

export const removeUserFromGroup: RequestHandler<{ id: string; userId: string }> = async (req, res) => {
  try {
    const user = await User.findOne({ googleId: req.params.userId });
    const group = await Group.findById(req.params.id);

    if (!user || !group) {
      res.status(404).json({ message: "User or group not found" });
      return;
    }

    if (!group.members.includes(user.googleId)) {
      res.status(400).json({ message: "User is not in the group" });
      return;
    }

    group.members = group.members.filter(memberId => memberId !== user.googleId);
    
    // Check if the group is now empty and delete it if so
    if (group.members.length === 0) {
      await Group.findByIdAndDelete(req.params.id);
      res.json({ message: "User removed and empty group deleted successfully" });
    } else {

      await group.save();
      res.json({ message: "User removed from group successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error removing user from group" });
  }
};