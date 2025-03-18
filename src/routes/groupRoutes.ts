import express from 'express';
import {
  getAllGroups,
  getGroupById,
  createGroup,
  updateGroup,
  deleteGroup,
  addUserToGroup,
  removeUserFromGroup,
  getGroupMembers,
  getGroupPointsOfInterest,
  addPointOfInterestToGroup,
  removePointOfInterestFromGroup
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

// Points of interest routes
router.get('/:id/points', getGroupPointsOfInterest);
router.post('/:id/points', addPointOfInterestToGroup);
router.delete('/:id/points/:pointId', removePointOfInterestFromGroup);

export default router;