import express, { RequestHandler } from "express";
import { User } from "../models/User";

const router = express.Router();

const getAllUsers: RequestHandler = async (_req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users" });
    }
};

const getUserById: RequestHandler<{ id: string }> = async (req, res) => {
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

const createUser: RequestHandler = async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: "Error creating user" });
    }
};

const updateUser: RequestHandler<{ id: string }> = async (req, res) => {
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

const deleteUser: RequestHandler<{ id: string }> = async (req, res) => {
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

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
