import express from 'express';
import {
  getMessagesByGroup,
  createMessage,
  updateMessage,
  deleteMessage
} from '../controllers/messageController';

const router = express.Router();

router.get('/group/:groupId', getMessagesByGroup);
router.post('/', createMessage);
router.put('/:id', updateMessage);
router.delete('/:id', deleteMessage);

export default router;