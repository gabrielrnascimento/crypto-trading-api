import { MissingParamError } from '../../presentation/errors';
import { RequiredFieldValidation } from './required-field-validation';

type SutTypes = RequiredFieldValidation;

const makeSut = (): SutTypes => {
  return new RequiredFieldValidation('requiredField');
};

describe('RequiredFieldValidation', () => {
  test('should return MissingParamError if validation fails', () => {
    const sut = makeSut();

    const response = sut.validate({ field: 'any_value' });

    expect(response).toEqual(new MissingParamError('requiredField'));
  });
});
