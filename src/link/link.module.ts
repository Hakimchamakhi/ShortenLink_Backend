import { Module } from '@nestjs/common';
import { LinkService } from './link.service';
import { MongooseModule } from '@nestjs/mongoose';
import { LinkSchema } from '../models/link.schema';
import { LinkController } from './link.controller';
import { LogSchema } from 'src/models/log.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Link', schema: LinkSchema },{name: 'Log', schema: LogSchema}]),
  ],
  providers: [LinkService],
  controllers: [LinkController],
  exports: [LinkService],
})
export class LinkModule {}