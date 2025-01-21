import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { QueueProcessor } from './queue.processor';
import { QueueService } from './queue.service';

@Module({
  imports: [
    BullModule.forRoot({
      connection: {
        host: '127.0.0.1',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: 'notificationQueue', 
    }),
  ],
  providers: [QueueService, QueueProcessor],
  exports: [QueueService],
})
export class QueueModule {}
