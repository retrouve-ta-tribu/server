import express from 'express';
import {
  getAllPoints,
  getNearbyPoints,
  getPointById,
  createPoint,
  updatePoint,
  deletePoint
} from '../controllers/pointOfInterestController';

const router = express.Router();

router.get('/', getAllPoints);
router.get('/nearby', getNearbyPoints);
router.get('/:id', getPointById);
router.post('/', createPoint);
router.put('/:id', updatePoint);
router.delete('/:id', deletePoint);

export default router;