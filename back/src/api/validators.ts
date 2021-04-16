import validateCreateLinkSchema from '../validators/validateCreateLink.json';
import { validate, ValidatorResult } from 'jsonschema';

export function validateCreateLink(body: unknown): ValidatorResult {
  return validate(body, validateCreateLinkSchema);
}
