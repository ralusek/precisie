import { MATCH_GROUP } from '@/regex';

// Utils
import equalizeMagnitudes from './utils/equalizeMagnitudes';
import minimumMagnitudeFromInput from './utils/minimumMagnitudeFromInput';
import toString from './utils/toString';


type PreciseNumberPrivate = {
  value: bigint;
  sign: '-' | '';
  magnitude: number;
  inputPrecision: number;
};

const local = new WeakMap<PreciseNumber, PreciseNumberPrivate>();
function p(instance: PreciseNumber): PreciseNumberPrivate {
  if (!local.has(instance)) local.set(instance, {} as PreciseNumberPrivate);
  return local.get(instance) as PreciseNumberPrivate;
}

type Config = {
  /**
   * The magnitude of the input units.
   * An input of 1000 with magnitude of 2 is the equivalent
   * of having passed in 10.00.
   * An input of 1 with magnitude of -1 is the equivalent
   * of having passed in 10.
   */
  magnitude?: number;
};

export default class PreciseNumber {
  constructor(
    input: string,
    { magnitude = 0 }: Config = {},
  ) {
    if (!Number.isInteger(magnitude)) throw new Error(`Expected magnitude must be an integer.`);
    if ((typeof input) !== 'string') throw new Error('Expected input value to be a string.');

    const match = input.match(MATCH_GROUP.SIGNED_COMPONENTS);
    if (!match || !match.groups) throw new Error(`Expected input to be valid number string with optional fractional values.`);

    const {
      whole,
      fractional = '',
      sign
    } = match.groups;

    const { value, magnitude: minimumMagnitude } = minimumMagnitudeFromInput({
      whole,
      fractional,
      sign: sign as '-' || '',
      magnitude,
    });

    p(this).value = value;
    p(this).magnitude = minimumMagnitude;
    p(this).sign = sign as '-' || '';
    p(this).inputPrecision = fractional.length;
  }

  toString({
    magnitude = 0,
    minPrecision = p(this).inputPrecision,
  }) {
    return toString({
      outputMagnitude: magnitude,
      magnitude: p(this).magnitude,
      value: p(this).value,
      minPrecision,
    });
  }

  get magnitude() { return p(this).magnitude; }
  get value() { return p(this).value; }
  get sign() { return p(this).sign; }

  multiply(input: PreciseNumber | string) {
    if (typeof input === 'string') input = new PreciseNumber(input);
    if (!input || (input.constructor !== PreciseNumber)) throw new Error(`PreciseNumber.multiply takes either a string or a PrecieNumber.`);
    const product = p(this).value * input.value;
    return new PreciseNumber(product.toString(), { magnitude: p(this).magnitude + input.magnitude });
  }

  add(input: PreciseNumber | string) {
    if (typeof input === 'string') input = new PreciseNumber(input);
    if (!input || (input.constructor !== PreciseNumber)) throw new Error(`PreciseNumber.add takes either a string or a PrecieNumber.`);
    
    const equalized = equalizeMagnitudes(this, input);

    const sum = equalized.reduce((sum, item) => {
      return item.value + sum;
    }, 0n);

    return new PreciseNumber(sum.toString(), { magnitude: equalized[0].magnitude });
  }

  subtract(input: PreciseNumber | string) {
    if (typeof input === 'string') input = new PreciseNumber(input);
    if (!input || (input.constructor !== PreciseNumber)) throw new Error(`PreciseNumber.add takes either a string or a PrecieNumber.`);
    
    const equalized = equalizeMagnitudes(this, input);

    const diff = equalized.slice(1).reduce((diff, item) => {
      return diff - item.value;
    }, equalized[0].value);

    return new PreciseNumber(diff.toString(), { magnitude: equalized[0].magnitude });
  }
};