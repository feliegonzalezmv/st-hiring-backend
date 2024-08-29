import express from 'express';
import { getSettingsByClientId, updateSettings } from '../controllers/settingsController';
import { validateSettings } from '../middlewares/validationSettings';

const router = express.Router();

router.get('/settings/:clientId', getSettingsByClientId);
router.put('/settings/:clientId', validateSettings, updateSettings);

export default router;
