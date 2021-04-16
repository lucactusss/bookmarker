import { getModelForClass, prop } from '@typegoose/typegoose';

export class Keyword {
  // Mongoose validation goes inside the @Props arguments
  @prop({ type: () => String, required: true, unique: true })
  label!: string;

  @prop({ type: () => String, required: true })
  color!: string;
}

const KeywordModel = getModelForClass(Keyword);

export default KeywordModel;
