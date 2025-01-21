import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { Vendor } from 'src/models';

@Injectable()
export class QueueService {
  constructor(
    @InjectQueue('notificationQueue') private readonly notificationQueue: Queue) {}

  async addJob(vendors:Vendor[]): Promise<void> {

    await this.notificationQueue.add("default", vendors);
  }
}
