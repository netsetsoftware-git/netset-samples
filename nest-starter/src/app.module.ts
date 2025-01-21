import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VendorController } from './controller/vendor.controller';
import { databaseProviders } from './providers/database.providers';
import { VendorService } from './service/vendor.service';
import { vendorsProviders } from './providers/vendor.providers';
import { QueueModule } from './bullmq/queue.module';

@Module({
  imports: [QueueModule],
  controllers: [AppController, VendorController],
  providers: [
    AppService,
    ...databaseProviders,

    VendorService,
    ...vendorsProviders
  ],
  exports :[
    VendorService
  ]
})
export class AppModule {}
