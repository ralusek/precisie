import 'mocha';
import { expect } from 'chai';

import PreciseNumber from '../../lib/PreciseNumber';


describe('Invocation', () => {
  it('should be able to initialize', () => {
    new PreciseNumber('0');
  });

  it('should correctly return values and magnitudes when subtracting', () => {
    let a = new PreciseNumber('10.23', { magnitude: -2 });
    let result = a.subtract('0.02');
    expect(result).to.nested.include({
      value: BigInt(102298),
      magnitude: 2,
    });
    expect(result.toString({ magnitude: -2 })).to.equal('10.2298');

    a = new PreciseNumber('10.23', { magnitude: -2 });
    result = a.subtract(new PreciseNumber('4.05', { magnitude: -2 }));
    expect(result).to.nested.include({
      value: BigInt(618),
      magnitude: 0,
    });
    expect(result.toString({ magnitude: -2 })).to.equal('6.18');

    a = new PreciseNumber('10.23');
    result = a.subtract(new PreciseNumber('-4'));
    expect(result).to.nested.include({
      value: BigInt(1423),
      magnitude: 2,
    });
    expect(result.toString({ magnitude: 2 })).to.equal('1423');
    expect(result.toString({ magnitude: 0 })).to.equal('14.23');

    a = new PreciseNumber('10.23');
    result = a.subtract(new PreciseNumber('23.1'));
    expect(result).to.nested.include({
      value: BigInt(-1287),
      magnitude: 2,
    });
    expect(result.toString({ magnitude: 2 })).to.equal('-1287');
    expect(result.toString({ magnitude: 0 })).to.equal('-12.87');

    a = new PreciseNumber('0.00');
    result = a.subtract(new PreciseNumber('23.1'));
    expect(result).to.nested.include({
      value: BigInt(-2310),
      magnitude: 2,
    });
    expect(result.toString({ magnitude: 2 })).to.equal('-2310');
    expect(result.toString({ magnitude: 0 })).to.equal('-23.10');
  });
});
