import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';

@ValidatorConstraint({ async: false })
class IsValidPhoneNumberConstraint implements ValidatorConstraintInterface {
  validate(phoneNumber: any) {
    return isValidPhoneNumber(phoneNumber);
  }

  defaultMessage() {
    return 'شماره تلفن نامعتبر است.';
  }
}

export function IsValidPhoneNumber(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsValidPhoneNumberConstraint,
    });
  };
}

function isValidPhoneNumber(input: string) {
  const phoneRegex = /^09\d{9}$/;
  return phoneRegex.test(input);
}
