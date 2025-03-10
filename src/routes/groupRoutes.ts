import express from 'express';
import {
  getAllGroups,
  getGroupById,
  createGroup,
  updateGroup,
  deleteGroup
} from '../controllers/groupController';

const router = express.Router();

router.get('/', getAllGroups);
router.get('/:id', getGroupById);
router.post('/', createGroup);
router.put('/:id', updateGroup);
router.delete('/:id', deleteGroup);

export default router;