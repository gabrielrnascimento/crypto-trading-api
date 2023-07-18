import { MissingParamError } from '../../presentation/errors';
import { RequiredFieldValidation } from './required-field-validation';

describe('RequiredFieldValidation', () => {
  test('should return MissingParamError if validation fails', () => {
    const sut = new RequiredFieldValidation('requiredField');

    const response = sut.validate({ field: 'any_value' });

    expect(response).toEqual(new MissingParamError('requiredField'));
  });
});
