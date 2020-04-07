import { Injectable } from '@nestjs/common';
import { Suggestion } from './interfaces/suggestion.interface';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class SuggestionsService {
  // constructor(@InjectModel('Suggestion') private readonly suggestionModel: Model<Suggestion>) {}
  constructor(@InjectModel('Suggestion') private readonly suggestionModel) {}

  async findAll(): Promise<Suggestion[]> {
    return await this.suggestionModel.find();
  }

  async findOne(id: string): Promise<Suggestion> {
    return await this.suggestionModel.findOne({ _id: id });
  }

  async create(suggestion: Suggestion): Promise<Suggestion> {
    const newSuggestion = new this.suggestionModel(suggestion);
    return await newSuggestion.save();
  }

  async delete(id: string): Promise<Suggestion> {
    return await this.suggestionModel.findByIdAndRemove(id);
  }

  async update(id: string, suggestion: Suggestion): Promise<Suggestion> {
    return await this.suggestionModel.findByIdAndUpdate(id, suggestion, { new: true });
  }
}
