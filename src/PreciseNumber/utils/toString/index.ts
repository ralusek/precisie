import { MATCH_GROUP } from '@/regex';

type Options = {
  value: bigint;
  magnitude: number;
  outputMagnitude: number;
  minPrecision: number;
};

export default ({
  value,
  magnitude,
  outputMagnitude,
  minPrecision,
}: Options) => {
  if (!value) return '0';
  const asString = value.toString();

  // Handle Magnitude
  let magnitudeAdjusted: string;
  const magnitudeShift = outputMagnitude - magnitude;
  if (!magnitudeShift) magnitudeAdjusted = asString;
  else {
    const match = asString.match(MATCH_GROUP.SIGNED_COMPONENTS);
    if (!match || !match.groups) throw new Error(`Something went wrong.`);

    const { sign = '', whole } = match.groups;

    
    if (magnitudeShift > 0) {
      magnitudeAdjusted = `${sign}${whole.padEnd(whole.length + magnitudeShift, '0')}`;
    }
    else {
      const absoluteShift = Math.abs(magnitudeShift);
      const padded = whole.padStart(absoluteShift + 1, '0');
      const paddedLength = padded.length;
      const match = padded.match(new RegExp(`^(?<before>[0-9]{${paddedLength - absoluteShift}})(?<after>[0-9]+)$`));
      if (!match || !match.groups) throw new Error(`Something went wrong.`);
      magnitudeAdjusted = `${sign}${match.groups.before}.${match.groups.after}`;
    }
  }

  if (!minPrecision) return magnitudeAdjusted;

  // Handle Precision
  const adjustedMatch = magnitudeAdjusted.match(MATCH_GROUP.SIGNED_COMPONENTS);
  if (!adjustedMatch || !adjustedMatch.groups) throw new Error(`Something went wrong.`);
  const {
    sign = '',
    whole,
    fractional = '',
  } = adjustedMatch.groups;

  return `${sign}${whole}.${fractional.padEnd(minPrecision, '0')}`;
};
