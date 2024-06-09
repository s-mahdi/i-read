import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ async: false })
class IsValidPhoneNumberConstraint implements ValidatorConstraintInterface {
  validate(phoneNumber: any) {
    return isValidPhoneNumber(phoneNumber);
  }

  defaultMessage(args: ValidationArguments) {
    const phoneNumber = args.value;
    if (!phoneNumber) {
      return 'شماره تلفن نمی‌تواند خالی باشد.';
    }
    if (!/^\d+$/.test(phoneNumber)) {
      return 'شماره تلفن باید فقط شامل اعداد باشد.';
    }
    if (phoneNumber.length !== 11) {
      return 'شماره تلفن باید ۱۱ رقم باشد.';
    }
    if (!/^09/.test(phoneNumber)) {
      return 'شماره تلفن باید با ۰۹ شروع شود.';
    }
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
