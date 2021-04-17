import { getModelForClass, prop, Ref } from '@typegoose/typegoose';
import { WhatIsIt } from '@typegoose/typegoose/lib/internal/constants';
import { Keyword } from './Keyword';

export enum LinkType {
  VIDEO = 'VIDEO',
  PHOTO = 'PHOTO',
}

export class Link {
  // Mongoose validation goes inside the @Props arguments
  @prop({ type: () => String, required: true, unique: true })
  url!: string;

  @prop({ type: () => String, required: true })
  title!: string;

  @prop({ type: () => String, required: true })
  author!: string;

  @prop({ type: () => Date, required: true })
  creationDate!: Date;

  @prop({ type: () => String, enum: LinkType, required: true })
  linkType?: LinkType;

  @prop({ type: () => Number, required: true })
  width!: number;

  @prop({ type: () => Number, required: true })
  height!: number;

  @prop({ type: () => Number, required: false }) // TODO: Maybe change this type
  duration?: number;

  @prop({ ref: () => Keyword }, WhatIsIt.ARRAY)
  public keywords?: Ref<Keyword>[];
}

const LinkModel = getModelForClass(Link);

export default LinkModel;
