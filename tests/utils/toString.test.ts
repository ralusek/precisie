import 'mocha';
import { expect } from 'chai';

import toString from '../../lib/PreciseNumber/utils/toString';


describe('Invocation', () => {
  it('should be able to be executed.', () => {
    toString({
      value: BigInt(1),
      magnitude: 0,
      outputMagnitude: 0,
      minPrecision: 0
    });
  });

  it('should correctly return values and magnitudes', () => {
    expect(toString({ value: BigInt(1), magnitude: -3, outputMagnitude: 0, minPrecision: 0 })).to.equal('1000');
    expect(toString({ value: BigInt(1111), magnitude: 0, outputMagnitude: -5, minPrecision: 0 })).to.equal('0.01111');
    expect(toString({ value: BigInt(1111), magnitude: -5, outputMagnitude: -5, minPrecision: 0 })).to.equal('1111');
    expect(toString({ value: BigInt(1111), magnitude: -5, outputMagnitude: -3, minPrecision: 0 })).to.equal('111100');
    expect(toString({ value: BigInt(1), magnitude: -3, outputMagnitude: -2, minPrecision: 0 })).to.equal('10');
    expect(toString({ value: BigInt(0), magnitude: -3, outputMagnitude: -2, minPrecision: 0 })).to.equal('0');
    expect(toString({ value: BigInt(10), magnitude: -2, outputMagnitude: -2, minPrecision: 0 })).to.equal('10');
    expect(toString({ value: BigInt(10), magnitude: -2, outputMagnitude: -2, minPrecision: 2 })).to.equal('10.00');
    expect(toString({ value: BigInt(1015), magnitude: 0, outputMagnitude: -2, minPrecision: 3 })).to.equal('10.150');
    expect(toString({ value: BigInt(-1015), magnitude: 0, outputMagnitude: -2, minPrecision: 0 })).to.equal('-10.15');
  });
});
