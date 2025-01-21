
import { Connection } from 'mongoose';
import { VendorSchema } from 'src/schemas/vendor.schema';

export const vendorsProviders = [
  {
    provide: 'VENDOR_MODEL',
    useFactory: (connection: Connection) => connection.model('Vendor', VendorSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
