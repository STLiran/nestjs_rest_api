import { Injectable, Logger } from '@nestjs/common';
import * as fs from 'fs';
import { Suggestion } from '../suggestions/interfaces/suggestion.interface';

@Injectable()
export class ParsingService {
  private readonly logger: Logger = new Logger('Auth Resolver');

  savedData: Suggestion[];

  async parse() {
    if (this.savedData === undefined) {
      this.logger.log('Initializing the data');
      const data = await this.innerParse().then((parsedData) => {
        this.savedData = parsedData;
      });
    } else {
      this.logger.log('Data is already initialized: ' + this.savedData);
    }
  }

  async innerParse() {
    const stream = fs.createReadStream('src/suggestions/input/cities_canada-usa.tsv');
    const csv = require('csv-parser');
    const results = [];
    stream.pipe(csv())
      .on('data', (dat2a) => results.push(dat2a))
      .on('end', () => {
        this.savedData = results;
      });
    return this.savedData;
  }
}
