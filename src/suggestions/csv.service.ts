import { Injectable, Logger } from '@nestjs/common';
import * as fs from 'fs';
import { CsvParser, ParsedData } from 'nest-csv-parser';
import { Suggestion } from './interfaces/suggestion.interface';
// import { SuggestionTO } from './SuggestionTO';
// import { Suggestion } from './interfaces/suggestion.interface';
// import { Suggestion } from './interfaces/suggestion.interface';

// class Entity {
//   foo: string;
//   bar: string
// }

@Injectable()
export class CsvService {
  private readonly logger: Logger = new Logger('Auth Resolver');

  savedData: Suggestion[];

  constructor(
    private readonly csvParser: CsvParser,
  ) {
  }

  async parse() {
    if (this.savedData === undefined) {
      this.logger.log('data is initialized');
      const data = await this.innerParse().then((parsedData) => {
        this.savedData = parsedData;
      });
    } else {
      this.logger.log('data is already initialized: ' + this.savedData);
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
    // const data = await this.csvParser.parse(stream, SuggestionTO);
    // this.logger.log('finish parsing data:!' + data);
    return this.savedData;
  }

  // async parse2() {
  //   const stream = fs.createReadStream('src/suggestions/input/cities_canada-usa.tsv');
  //   let temp =  await this.csvParser.parse(stream, Entity);
  //   // const entities: Entity[] = await this.csvParser.parse(stream, Entity);
  //   return  temp;
  // }
  //
  // async parse3(): Promise<Suggestion[]> {
  //   const results: any[] = [];
  //   const csv = require('csv-parser');
  //   const fs = require('fs');
  //
  //   const readable  = fs.createReadStream('src/suggestions/input/cities_canada-usa.tsv')
  //     .pipe(csv())
  //     .on('data', (data) => {
  //       results.push(data);
  //     })
  //     // .onerror((err) => {
  //     //     console.log(err);
  //     // }
  //     // )
  //     .on('end', () => {
  //       console.log("end");
  //       return results;
  //       //return new Promise<Suggestion>(results);
  //     });
  //   return results;
  // }
  // constructor(@InjectModel('Suggestion') private readonly suggestionModel) {}
  // var item1 = new LinkedList.Item()
  // var list = new LinkedList(item1, item2, item3)
  // async readCsv(csvfilepath) {
  //   const fs = require('fs');
  //   var stream = fs.ReadStream(csvfilepath);
  //   return new Promise((resolve, reject) => {
  //     var output = [];
  //
  //     fs.createReadStream('src/suggestions/input/cities_canada-usa.tsv')
  //       .pipe(csv())
  //       .on('data', (data) => {
  //
  //     //
  //     //   }
  //     // const parser = csv.fromStream(stream, {headers:true})
  //     //   .on('data', (data) => {
  //         parser.pause();
  //         c(data, output, (err) => {
  //           if (err) reject(err)
  //           parser.resume()
  //         })
  //       }).onError()
  //       .on('end', () => {
  //         resolve(output) // extraction/return point of the desired data
  //       })
  //     var c = (data, out, callback) => {
  //       out.push(data)
  //       callback()
  //     }
  //   })
  // }

}
