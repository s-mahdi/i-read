import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';

@ValidatorConstraint({ async: false })
class IsValidNationalCodeConstraint implements ValidatorConstraintInterface {
  validate(nationalCode: any) {
    return isValidNationalCode(nationalCode);
  }

  defaultMessage() {
    return 'کد ملی نامعتبر است.';
  }
}

// Decorator function
export function IsValidNationalCode(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsValidNationalCodeConstraint,
    });
  };
}

function isValidNationalCode(input: string) {
  if (!/^\d{10}$/.test(input)) return false;
  const check = +input[9];
  const sum =
    input
      .split('')
      .slice(0, 9)
      .reduce((acc, x, i) => acc + +x * (10 - i), 0) % 11;
  return sum < 2 ? check === sum : check + sum === 11;
}
