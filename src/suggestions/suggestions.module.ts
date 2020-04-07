import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SuggestionsController } from './suggestions.controller';
import { SuggestionsService } from './suggestions.service';
import { SuggestionSchema } from './schemas/suggestion.schema';
import { ParsingService } from '../parsing/parsing.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Suggestion', schema: SuggestionSchema }])],
  controllers: [SuggestionsController],
  providers: [SuggestionsService, ParsingService],
})
export class SuggestionsModule {}
