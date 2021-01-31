import 'mocha';
import { expect } from 'chai';

import PreciseNumber from '../../lib/PreciseNumber';


describe('Invocation', () => {
  it('should be able to initialize', () => {
    new PreciseNumber('0');
  });

  it('should correctly return values and magnitudes when multiplying', () => {
    let a = new PreciseNumber('10.23', { magnitude: -2 });
    let result = a.multiply('0.02');
    expect(result).to.nested.include({
      value: BigInt(2046),
      magnitude: 2,
    });
    expect(result.toString({ magnitude: -2 })).to.equal('0.2046');

    a = new PreciseNumber('0', { magnitude: -2 });
    result = a.multiply('0.00');
    expect(result).to.nested.include({
      value: BigInt(0),
      magnitude: 0,
    });
    expect(result.toString({ magnitude: -2 })).to.equal('0');
  });

  it('should be able to multiply by zero', () => {
    let a = new PreciseNumber('10.23', { magnitude: -2 });
    let result = a.multiply('0.00');
    expect(result).to.nested.include({
      value: BigInt(0),
      magnitude: 0,
    });
    expect(result.toString({ magnitude: -2 })).to.equal('0');


    a = new PreciseNumber('0', { magnitude: -2 });
    result = a.multiply('0.00');
    expect(result).to.nested.include({
      value: BigInt(0),
      magnitude: 0,
    });
    expect(result.toString({ magnitude: -2 })).to.equal('0');
  });
});
