import express from 'express';
import { getSettingsByClientId, updateSettings } from '../controllers/settingsController';

const router = express.Router();

router.get('/settings/:clientId', getSettingsByClientId);
router.put('/settings/:clientId', updateSettings);

export default router;
