import { Module } from '@nestjs/common';
import { ConsumerService } from './consumer';
import { ProducerService } from './producer';

@Module({
  providers: [ProducerService, ConsumerService],
  exports: [ProducerService],
})
export class QueueModule {}
