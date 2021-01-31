type Options = {
  whole: string;
  fractional? : string;
  magnitude: number;
  sign: '-' | '';
};

export default ({
  whole,
  fractional = '',
  magnitude,
  sign,
}: Options) => {
  const fractionalMagnitude = fractional.length;
  const magnitudeIncludingFractional = magnitude + fractionalMagnitude;

  const combined = `${sign}${whole}${fractional}`;
  // We remove trailing zeroes AFTER combining, because 1000.00, for example, could be reduced to 1, instead of 1000
  const withoutTrailingZeroes = combined.replace(/0+$/, '') || '0'; // Make sure that doesn't result in empty string with || '0';

  const magnitudeReduction = combined.length - withoutTrailingZeroes.length;
  
  return {
    value: BigInt(withoutTrailingZeroes),
    magnitude: withoutTrailingZeroes === '0' ? 0 : magnitudeIncludingFractional - magnitudeReduction,
  };
};