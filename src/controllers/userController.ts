import { RequestHandler } from "express";
import { User } from "../models/User";
import { Group } from "../models/Group";

export const getAllUsers: RequestHandler = async (_req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users" });
    }
};

export const getUserById: RequestHandler<{ id: string }> = async (req, res) => {
    try {
        const user = await User.findOne({ googleId: req.params.id });
        if (!user) {
            res.status(404).json({ message: "User not found" });
        } else {
            res.json(user);
        }
    } catch (error) {
        res.status(500).json({ message: "Error fetching user" });
    }
};

export const createUser: RequestHandler = async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: "Error creating user" });
    }
};

export const updateUser: RequestHandler<{ id: string }> = async (req, res) => {
    try {
        const user = await User.findOneAndUpdate(
            { googleId: req.params.id },
            req.body,
            { new: true }
        );
        if (!user) {
            res.status(404).json({ message: "User not found" });
        } else {
            res.json(user);
        }
    } catch (error) {
        res.status(400).json({ message: "Error updating user" });
    }
};

export const deleteUser: RequestHandler<{ id: string }> = async (req, res) => {
    try {
        const user = await User.findOneAndDelete({ googleId: req.params.id });
        if (!user) {
            res.status(404).json({ message: "User not found" });
        } else {
            res.json({ message: "User deleted successfully" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error deleting user" });
    }
};

export const addFriend: RequestHandler<{ id: string }> = async (req, res) => {
    try {
        const { friendId, email } = req.body;
        const user = await User.findOne({ googleId: req.params.id });
        
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        const friend = friendId 
            ? await User.findOne({ googleId: friendId })
            : await User.findOne({ email });

        if (!friend) {
            res.status(404).json({ message: "Friend not found" });
            return;
        }

        if (user.friends.includes(friend.googleId)) {
            res.status(400).json({ message: "Already friends" });
            return;
        }

        user.friends.push(friend.googleId);
        await user.save();

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Error adding friend" });
    }
};

export const removeFriend: RequestHandler<{ id: string }> = async (req, res) => {
    try {
        const { friendId, email } = req.body;
        const user = await User.findOne({ googleId: req.params.id });
        
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        const friend = friendId 
            ? await User.findOne({ googleId: friendId })
            : await User.findOne({ email });

        if (!friend) {
            res.status(404).json({ message: "Friend not found" });
            return;
        }

        const friendIndex = user.friends.indexOf(friend.googleId);
        if (friendIndex === -1) {
            res.status(400).json({ message: "Not friends" });
            return;
        }

        user.friends.splice(friendIndex, 1);
        await user.save();

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Error removing friend" });
    }
};

export const getUserGroups: RequestHandler<{ id: string }> = async (req, res) => {
    try {
        const groups = await Group.find({ members: req.params.id });
        res.json(groups);
    } catch (error) {
        res.status(500).json({ message: "Error fetching user's groups" });
    }
};