import { Request, Response } from 'express';
import mongoose from 'mongoose';

import { getSettingsByClientId, updateSettings } from '../../controllers/settingsController';
import Settings from '../../models/settings';

jest.mock('../../models/settings');

const mockSettings = {
  findOne: jest.fn(),
  findOneAndUpdate: jest.fn(),
  save: jest.fn(),
};

(Settings as any).findOne = mockSettings.findOne;
(Settings as any).findOneAndUpdate = mockSettings.findOneAndUpdate;
(Settings.prototype as any).save = mockSettings.save;

beforeAll(async () => {
  await mongoose.connect('mongodb://root:example@localhost:27017/st-hiring-mongo-db-test', {
    authSource: 'admin',
  });
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.disconnect();
});

describe('Settings Controller', () => {
  describe('GET /settings/:clientId', () => {
    it('should return settings for the given clientId', async () => {
      const clientId = 1;

      mockSettings.findOne.mockResolvedValueOnce({
        clientId,
        deliveryMethods: [
          { name: 'Print Now', enum: 'PRINT_NOW', order: 1, isDefault: true, selected: true },
          { name: 'Print@Home', enum: 'PRINT_AT_HOME', order: 2, isDefault: false, selected: true },
        ],
        fulfillmentFormat: { rfid: false, print: false },
        printer: { id: null },
        printingFormat: { formatA: true, formatB: false },
        scanning: { scanManually: true, scanWhenComplete: false },
        paymentMethods: { cash: true, creditCard: false, comp: false },
        ticketDisplay: { leftInAllotment: true, soldOut: true },
        customerInfo: { active: false, basicInfo: false, addressInfo: false },
      });

      const req = {
        params: { clientId: clientId.toString() },
        // Add any other properties required by your mock if needed
      } as unknown as Request;

      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      } as unknown as Response;

      await getSettingsByClientId(req, res);

      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ clientId }));
    });

    //Todo: should create default settings if not found
  });

  describe('PUT /settings/:clientId', () => {
    it('should update settings for the given clientId', async () => {
      const clientId = 1;
      const updatedData = {
        deliveryMethods: [{ name: 'Updated Print Now', enum: 'PRINT_NOW', order: 1, isDefault: true, selected: false }],
        fulfillmentFormat: { rfid: true, print: true },
        printer: { id: '1234' },
        printingFormat: { formatA: false, formatB: true },
        scanning: { scanManually: false, scanWhenComplete: true },
        paymentMethods: { cash: false, creditCard: true, comp: false },
        ticketDisplay: { leftInAllotment: false, soldOut: false },
        customerInfo: { active: true, basicInfo: true, addressInfo: true },
      };

      mockSettings.findOneAndUpdate.mockResolvedValueOnce({
        ...updatedData,
        clientId,
      });

      const req = {
        params: { clientId: clientId.toString() },
        body: updatedData,
      } as unknown as Request;

      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      } as unknown as Response;

      await updateSettings(req, res);

      expect(res.json).toHaveBeenCalledWith(expect.objectContaining(updatedData));
    });

    it('should return 404 if settings not found for update', async () => {
      const clientId = 999;
      const updatedData = {
        deliveryMethods: [{ name: 'New Method', enum: 'NEW_METHOD', order: 1, isDefault: true, selected: true }],
      };

      mockSettings.findOneAndUpdate.mockResolvedValueOnce(null);

      const req = {
        params: { clientId: clientId.toString() },
        body: updatedData,
      } as unknown as Request;

      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      } as unknown as Response;

      await updateSettings(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Settings not found' });
    });
  });
});
