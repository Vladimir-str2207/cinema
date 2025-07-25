import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type DirectorDocument = HydratedDocument<Director>;

@Schema()
export class Director {
  @Prop({ required: true, unique: true, index: true })
  name: string;

  @Prop()
  birthDate: Date;
}

export const DirectorSchema = SchemaFactory.createForClass(Director);
