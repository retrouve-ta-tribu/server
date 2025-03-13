import express from "express";
import {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    getUserGroups
} from "../controllers/userController";

const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.get("/:id/groups", getUserGroups);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
