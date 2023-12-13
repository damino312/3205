export function validateEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}
export function validateNumber(number: string) {
  const validatedNumber = Number(number);
  if (!isNaN(validatedNumber) && typeof validatedNumber === 'number') {
    return true;
  } else {
    return false;
  }
}
