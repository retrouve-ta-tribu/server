import express from 'express';
import {
  getAllGroups,
  getGroupById,
  createGroup,
  updateGroup,
  deleteGroup,
  addUserToGroup,
  removeUserFromGroup,
  getGroupMembers
} from '../controllers/groupController';

const router = express.Router();

router.get('/', getAllGroups);
router.get('/:id', getGroupById);
router.post('/', createGroup);
router.put('/:id', updateGroup);
router.delete('/:id', deleteGroup);
router.get("/:id/members", getGroupMembers);
router.post('/:id/members/:userId', addUserToGroup);
router.delete('/:id/members/:userId', removeUserFromGroup);

export default router;