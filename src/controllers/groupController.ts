import { RequestHandler } from 'express';
import { Group } from '../models/Group';
import { User } from '../models/User';
import { PointOfInterest } from '../models/PointOfInterest';

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

export const getGroupMembers: RequestHandler<{ id: string }> = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);
    
    if (!group) {
      res.status(404).json({ message: "Group not found" });
      return;
    }

    const members = [];

    for (const member of group.members) {
      const user = await User.findOne({ googleId: member });
      members.push(user);
    }

    res.json(members);
  } catch (error) {
    res.status(500).json({ message: "Error fetching group members" });
  }
};

export const getGroupPointsOfInterest: RequestHandler<{ id: string }> = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id).populate('pointsOfInterest');
    
    if (!group) {
      res.status(404).json({ message: "Group not found" });
      return;
    }

    res.json(group.pointsOfInterest);
  } catch (error) {
    res.status(500).json({ message: "Error fetching group points of interest" });
  }
};

export const addPointOfInterestToGroup: RequestHandler<{ id: string }> = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);

    if (!group) {
      res.status(404).json({ message: "Group not found" });
      return;
    }

    const point = new PointOfInterest(req.body);
    await point.save();

    group.pointsOfInterest.push(point._id);
    await group.save();

    res.status(201).json({
      message: "Point of interest created and added to group successfully",
      point: point
    });
  } catch (error) {
    res.status(400).json({ message: "Error creating and adding point of interest to group" });
  }
};

export const removePointOfInterestFromGroup: RequestHandler<{ id: string; pointId: string }> = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);

    if (!group) {
      res.status(404).json({ message: "Group not found" });
      return;
    }

    const pointIdStr = req.params.pointId.toString();
    const pointExists = group.pointsOfInterest.some(poi => poi.toString() === pointIdStr);
    
    if (!pointExists) {
      res.status(400).json({ message: "Point of interest not in group" });
      return;
    }

    group.pointsOfInterest = group.pointsOfInterest.filter(poi => poi.toString() !== pointIdStr);
    await group.save();

    res.json({ message: "Point of interest removed from group successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error removing point of interest from group" });
  }
};