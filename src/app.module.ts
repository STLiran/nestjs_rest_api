import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SuggestionsController } from './suggestions/suggestions.controller';
import { SuggestionsService } from './suggestions/suggestions.service';
import { SuggestionsModule } from './suggestions/suggestions.module';
import { MongooseModule } from '@nestjs/mongoose';
import config from './config/keys';
import { CsvModule } from 'nest-csv-parser';
import { ParsingService } from './parsing/parsing.service';

@Module({
  imports: [SuggestionsModule, MongooseModule.forRoot(config.mongoURI, { useUnifiedTopology: true, useNewUrlParser: true }),  CsvModule],
  controllers: [AppController, SuggestionsController],
  providers: [AppService, SuggestionsService, ParsingService],
})
export class AppModule {}
