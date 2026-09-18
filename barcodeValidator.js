function isValidChecksum(barcode) {
  const digits = barcode.replace(/\D/g, '');

  if (digits.length !== 13 && digits.length !== 12) {
    return { valid: false, reason: 'Barcode length invalid (must be 12 or 13 digits)' };
  }

  const code = digits.length === 12 ? '0' + digits : digits;
  const digitsArr = code.split('').map(Number);
  const checkDigit = digitsArr.pop();

  let sum = 0;
  digitsArr.reverse().forEach((digit, i) => {
    sum += i % 2 === 0 ? digit * 3 : digit;
  });

  const calculatedCheckDigit = (10 - (sum % 10)) % 10;

  return {
    valid: calculatedCheckDigit === checkDigit,
    reason: calculatedCheckDigit === checkDigit ? 'Checksum valid' : 'Checksum mismatch — barcode may be fake/corrupted'
  };
}

const gs1Prefixes = [
  { range: [890, 890], country: 'India' },
  { range: [0, 19], country: 'USA/Canada' },
  { range: [30, 39], country: 'USA' },
  { range: [400, 440], country: 'Germany' },
  { range: [450, 459], country: 'Japan' },
  { range: [460, 469], country: 'Russia' },
  { range: [690, 699], country: 'China' },
  { range: [500, 509], country: 'UK' },
  { range: [45, 49], country: 'Japan' },
  { range: [880, 880], country: 'South Korea' }
];

function getCountryFromBarcode(barcode) {
  const digits = barcode.replace(/\D/g, '');
  if (digits.length < 3) return 'Unknown';

  const prefix3 = parseInt(digits.substring(0, 3), 10);
  const prefix2 = parseInt(digits.substring(0, 2), 10);

  const match = gs1Prefixes.find(
    (p) => (prefix3 >= p.range[0] && prefix3 <= p.range[1]) || (prefix2 >= p.range[0] && prefix2 <= p.range[1])
  );

  return match ? match.country : 'Unknown/Unregistered prefix';
}

function validateFSSAIFormat(licenseNumber) {
  if (!licenseNumber) {
    return { valid: false, reason: 'No FSSAI number provided' };
  }

  const digits = String(licenseNumber).replace(/\D/g, '');

  if (digits.length !== 14) {
    return { valid: false, reason: `Invalid length: FSSAI license must be exactly 14 digits (found ${digits.length})` };
  }

  return {
    valid: true,
    reason: 'Format valid (14 digits)',
    stateCode: digits.substring(1, 3)
  };
}

module.exports = { isValidChecksum, getCountryFromBarcode, validateFSSAIFormat };