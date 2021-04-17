import validateCreateLinkSchema from '../validators/validateCreateLink.json';
import validateCreateKeywordSchema from '../validators/validateCreateKeyword.json';
import { validate, ValidatorResult } from 'jsonschema';

export function validateCreateLink(body: unknown): ValidatorResult {
  return validate(body, validateCreateLinkSchema);
}

export function validateCreateKeyword(body: unknown): ValidatorResult {
  return validate(body, validateCreateKeywordSchema);
}
