import { Body, Controller, Delete, Get, Logger, Param, Post, Put } from '@nestjs/common';
import { CreateSuggestionsDto } from './dto/create-suggestions.dto';
import { SuggestionsService } from './suggestions.service';
import { Suggestion } from './interfaces/suggestion.interface';
import { ParsingService } from '../parsing/parsing.service';

@Controller('suggestions')
export class SuggestionsController {
  constructor(private readonly parsingService: ParsingService, private readonly suggestionsService: SuggestionsService) {}

  private readonly logger: Logger = new Logger('Auth Resolver');

  @Get()
  findAll(): Promise<Suggestion[]> {
    return this.suggestionsService.findAll();
  }

  @Get(':parse')
  async findOne(@Param('id') id): Promise<Suggestion[]> {
    this.logger.log('parse!');
    const data = await this.parsingService.parse();
    this.logger.log('data is : ');
    // return this.csvService.savedData;
    return this.parsingService.savedData;
  }

  @Post()
  create(@Body() createSuggestionDto: CreateSuggestionsDto): Promise<Suggestion> {
    return this.suggestionsService.create(createSuggestionDto);
  }

  @Delete(':id')
  delete(@Param('id') id): Promise<Suggestion> {
    return this.suggestionsService.delete(id);
  }

  @Put(':id')
  update(@Body() updateSuggestionDto: CreateSuggestionsDto, @Param('id') id): Promise<Suggestion> {
    return this.suggestionsService.update(id, updateSuggestionDto);
  }
}
