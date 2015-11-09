import { expect } from 'chai';
import {
  executePropValidator,
  validateProp,
  validateObject,
  makeValidationError
} from '../app/utilities/ValidationUtility';
import models from '../app/models/index';

import {
  int,
  required,
  optional,
  alpha,
  email,
  numeric,
  length,
  date,
  notnull
} from '../app/models/types';

describe('Validation Utility', function() {
  describe('executePropValidator()', function() {
    let propName = 'testProp';
    it('Should validate a valid integer', function() {
      let res = executePropValidator(0, propName, int);
      expect(res.error).to.equal(null);
      expect(res.isValid).to.equal(true);
    });

    it('Should not validate an invalid integer', function() {
      let res = executePropValidator('test', propName, int);
      expect(res.error).to.equal(makeValidationError('test', propName, int));
      expect(res.isValid).to.equal(false);
    });

    it('Should validate a required property that exists', function() {
      let res = executePropValidator('test', propName, required);
      expect(res.error).to.equal(null);
      expect(res.isValid).to.equal(true);
    });

    it('Should not validate required property that is undefined', function() {
      let res = executePropValidator(undefined, propName, required);
      expect(res.error).to.equal(makeValidationError(undefined, propName, required));
      expect(res.isValid).to.equal(false);
    });

    it('Should not validate not null property that is null', function() {
      let res = executePropValidator(null, propName, notnull);
      expect(res.error).to.equal(makeValidationError(null, propName, notnull));
      expect(res.isValid).to.equal(false);
    });

    
  });

  describe('validateProp()', function() {
    let propName = 'testProp';
    it('Should validate a required integer', function() {
      let res = validateProp(0, propName, [required, int]);
      expect(res.errors).to.have.length(0);
      expect(res.isValid).to.equal(true);
    });

    it('Should not validate an required integer that is undefined', function() {
      let res = validateProp(undefined, propName, [required, int]);
      expect(res.errors).to.have.length(1);
      expect(res.isValid).to.equal(false);
    });
  });

  describe('validateObject()', function() {
    it('Should validate a valid description', function() {
      let description = {
        userId: 1,
        pinId: 1,
        text: 'test',
      }
      let res = validateObject(description, models.description);
      expect(res.errors).to.have.length(0);
      expect(res.isValid).to.equal(true);
    });

    it('Should not validate a description with a missing required prop', function() {
      let description = {
        pinId: 1,
        text: 'test',
      }
      let res = validateObject(description, models.description);
      expect(res.errors).to.have.length(1);
      expect(res.isValid).to.equal(false);
    });
  });
});
