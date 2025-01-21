import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';

@Processor('notificationQueue')
export class QueueProcessor extends WorkerHost {

  async process(job: Job<any>): Promise<void> {
    console.log(`Processing job: ${job.id}`);
    console.log(`Job data:`, job.data);

    // mock send email
  }
}
