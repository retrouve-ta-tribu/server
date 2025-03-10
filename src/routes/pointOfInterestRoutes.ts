import express, { RequestHandler } from 'express';
import { PointOfInterest } from '../models/PointOfInterest';

const router = express.Router();

interface NearbyQuery {
  longitude?: string;
  latitude?: string;
  maxDistance?: string;
}

const getAllPoints: RequestHandler = async (_req, res) => {
  try {
    const points = await PointOfInterest.find();
    res.json(points);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching points of interest' });
  }
};

const getNearbyPoints: RequestHandler<{}, any, any, NearbyQuery> = async (req, res) => {
  try {
    const { longitude, latitude, maxDistance = '5000' } = req.query;
    
    if (!longitude || !latitude) {
      res.status(400).json({ message: 'Longitude and latitude are required' });
      return;
    }

    const points = await PointOfInterest.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [Number(longitude), Number(latitude)]
          },
          $maxDistance: Number(maxDistance)
        }
      }
    });
    res.json(points);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching nearby points of interest' });
  }
};

const getPointById: RequestHandler<{ id: string }> = async (req, res) => {
  try {
    const point = await PointOfInterest.findById(req.params.id);
    if (!point) {
      res.status(404).json({ message: 'Point of interest not found' });
    } else {
      res.json(point);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching point of interest' });
  }
};

const createPoint: RequestHandler = async (req, res) => {
  try {
    const point = new PointOfInterest(req.body);
    await point.save();
    res.status(201).json(point);
  } catch (error) {
    res.status(400).json({ message: 'Error creating point of interest' });
  }
};

const updatePoint: RequestHandler<{ id: string }> = async (req, res) => {
  try {
    const point = await PointOfInterest.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!point) {
      res.status(404).json({ message: 'Point of interest not found' });
    } else {
      res.json(point);
    }
  } catch (error) {
    res.status(400).json({ message: 'Error updating point of interest' });
  }
};

const deletePoint: RequestHandler<{ id: string }> = async (req, res) => {
  try {
    const point = await PointOfInterest.findByIdAndDelete(req.params.id);
    if (!point) {
      res.status(404).json({ message: 'Point of interest not found' });
    } else {
      res.json({ message: 'Point of interest deleted successfully' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting point of interest' });
  }
};

router.get('/', getAllPoints);
router.get('/nearby', getNearbyPoints);
router.get('/:id', getPointById);
router.post('/', createPoint);
router.put('/:id', updatePoint);
router.delete('/:id', deletePoint);

export default router;