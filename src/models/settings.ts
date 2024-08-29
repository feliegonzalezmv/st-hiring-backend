import mongoose, { Schema, Document } from 'mongoose';

interface DeliveryMethod {
  name: string;
  enum: string;
  order: number;
  isDefault: boolean;
  selected: boolean;
}

interface FulfillmentFormat {
  rfid: boolean;
  print: boolean;
}

interface Printer {
  id: string | null;
}

interface PrintingFormat {
  formatA: boolean;
  formatB: boolean;
}

interface Scanning {
  scanManually: boolean;
  scanWhenComplete: boolean;
}

interface PaymentMethods {
  cash: boolean;
  creditCard: boolean;
  comp: boolean;
}

interface TicketDisplay {
  leftInAllotment: boolean;
  soldOut: boolean;
}

interface CustomerInfo {
  active: boolean;
  basicInfo: boolean;
  addressInfo: boolean;
}

export interface SettingsDocument extends Document {
  clientId: number;
  deliveryMethods: DeliveryMethod[];
  fulfillmentFormat: FulfillmentFormat;
  printer: Printer;
  printingFormat: PrintingFormat;
  scanning: Scanning;
  paymentMethods: PaymentMethods;
  ticketDisplay: TicketDisplay;
  customerInfo: CustomerInfo;
}

const deliveryMethodSchema = new Schema<DeliveryMethod>({
  name: { type: String, required: true },
  enum: { type: String, required: true },
  order: { type: Number, required: true },
  isDefault: { type: Boolean, required: true },
  selected: { type: Boolean, required: true },
});

const fulfillmentFormatSchema = new Schema<FulfillmentFormat>({
  rfid: { type: Boolean, required: true },
  print: { type: Boolean, required: true },
});

const printerSchema = new Schema<Printer>({
  id: { type: String, default: null },
});

const printingFormatSchema = new Schema<PrintingFormat>({
  formatA: { type: Boolean, required: true },
  formatB: { type: Boolean, required: true },
});

const scanningSchema = new Schema<Scanning>({
  scanManually: { type: Boolean, required: true },
  scanWhenComplete: { type: Boolean, required: true },
});

const paymentMethodsSchema = new Schema<PaymentMethods>({
  cash: { type: Boolean, required: true },
  creditCard: { type: Boolean, required: true },
  comp: { type: Boolean, required: true },
});

const ticketDisplaySchema = new Schema<TicketDisplay>({
  leftInAllotment: { type: Boolean, required: true },
  soldOut: { type: Boolean, required: true },
});

const customerInfoSchema = new Schema<CustomerInfo>({
  active: { type: Boolean, required: true },
  basicInfo: { type: Boolean, required: true },
  addressInfo: { type: Boolean, required: true },
});

const settingsSchema = new Schema<SettingsDocument>({
  clientId: { type: Number, required: true },
  deliveryMethods: { type: [deliveryMethodSchema], required: true },
  fulfillmentFormat: { type: fulfillmentFormatSchema, required: true },
  printer: { type: printerSchema, required: true },
  printingFormat: { type: printingFormatSchema, required: true },
  scanning: { type: scanningSchema, required: true },
  paymentMethods: { type: paymentMethodsSchema, required: true },
  ticketDisplay: { type: ticketDisplaySchema, required: true },
  customerInfo: { type: customerInfoSchema, required: true },
});

const Settings = mongoose.model<SettingsDocument>('Settings', settingsSchema);

export default Settings;
