import { Request, Response } from 'express';
import Settings from '../models/settings';

export const getSettingsByClientId = async (req: Request, res: Response) => {
  const clientId = parseInt(req.params.clientId, 10);

  try {
    let settings = await Settings.findOne({ clientId });

    if (!settings) {
      settings = new Settings({
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

      await settings.save();
    }

    res.json(settings);
  } catch (error) {
    console.error('Error retrieving settings:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
export const updateSettings = async (req: Request, res: Response) => {
  const { clientId } = req.params;
  const updateData = req.body;

  try {
    const settings = await Settings.findOneAndUpdate({ clientId: Number(clientId) }, updateData, {
      new: true,
      runValidators: true,
    });

    if (!settings) {
      return res.status(404).json({ error: 'Settings not found' });
    }

    return res.json(settings);
  } catch (error) {
    return res.status(500).json({ error: 'Server Error' });
  }
};
