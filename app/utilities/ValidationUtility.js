import { isNumeric, isInt, isAlpha, isEmail, isLength, isDate } from 'validator';
import _ from 'lodash';

import {
  INT,
  REQUIRED,
  OPTIONAL,
  ALPHA,
  EMAIL,
  NUMERIC,
  LENGTH,
  DATE,
  NOTNULL
} from '../models/types';

export function makeValidationError(val, propName, validator) {
  switch(validator.name) {
    case INT:
      return `${propName} must be an integer, but got '${val}'.`;
    case REQUIRED:
      return `${propName} is required.`;
    case ALPHA:
      return `${propName} must contain only alphabetic characters, but got '${val}'.`;
    case EMAIL:
      return `${propName} must be a valid email, but got '${val}'.`;
    case NUMERIC:
      return `${propName} must be numeric, but got '${val}'.`;
    case LENGTH:
      return `${propName} must have length between ${validator.options[0]} and ${validator.options[1]}.`;
    case NOTNULL:
      return `${propName} must not be null.`;
    case DATE:
      return `${propName} must be a valid date, but got '${val}'.`;
    default:
      return '';
  }
}

export function executePropValidator(val, propName, validator) {
  let isValid = false;
  let error = null;
  switch(validator.name) {
    case INT:
      isValid = isInt(val) || _.isUndefined(val);
      break;
    case REQUIRED:
      isValid = !_.isUndefined(val);
      break;
    case NOTNULL:
      isValid = !_.isNull(val);
      break;
    case ALPHA:
      isValid = isAlpha(val) || _.isUndefined(val);
      break;
    case EMAIL:
      isValid = isEmail(val) || _.isUndefined(val);
      break;
    case NUMERIC:
      isValid = isNumeric(val) || _.isUndefined(val);
      break;
    case LENGTH:
      isValid = isLength(val, validator.options[0], validator.options[1]) || _.isUndefined(val);
      break;
    case DATE:
      isValid = isDate(val) || _.isUndefined(val);
      break;
    default:
      break;
  }
  if (!isValid) error = makeValidationError(val, propName, validator);
  return {
    isValid: isValid,
    error: error
  }
}

export function validateProp(val, propName, validators) {
  let result = validators.map(validator => executePropValidator(val, propName, validator));
  let isValid = result.reduce((prev, curr, index, arr) => prev && curr.isValid, true);
  let errors = result.filter(vr => !vr.isValid).map(vr => vr.error);
  return {
    isValid: isValid,
    errors: errors
  }
}

export function validateObject(obj, props) {
  let result = props.map(prop => validateProp(obj[prop.name], prop.name, prop.validators));
  let isValid = result.reduce((prev, curr, index, arr) => prev && curr.isValid, true);
  let errors = result.filter(vr => !vr.isValid).map(vr => vr.errors).reduce((a,b) => a.concat(b), []);
  return {
    isValid: isValid,
    errors: errors
  }
}

