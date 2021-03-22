import 'mocha';
import { expect } from 'chai';

import PreciseNumber from '../../lib/PreciseNumber';


describe('Invocation', () => {
  it('should be able to initialize', () => {
    new PreciseNumber('0');
  });

  it('should correctly return values and magnitudes when adding', () => {
    let a = new PreciseNumber('10.23', { magnitude: -2 });
    let result = a.add('0.02');
    expect(result).to.nested.include({
      value: BigInt(102302),
      magnitude: 2,
    });
    expect(result.toString({ magnitude: -2 })).to.equal('10.2302');

    a = new PreciseNumber('10.23', { magnitude: -2 });
    result = a.add(new PreciseNumber('4.05', { magnitude: -2 }));
    expect(result).to.nested.include({
      value: BigInt(1428),
      magnitude: 0,
    });
    expect(result.toString({ magnitude: -2 })).to.equal('14.28');

    a = new PreciseNumber('10.23');
    result = a.add(new PreciseNumber('-4'));
    expect(result).to.nested.include({
      value: BigInt(623),
      magnitude: 2,
    });
    expect(result.toString({ magnitude: 2 })).to.equal('623');
    expect(result.toString({ magnitude: 0 })).to.equal('6.23');

    a = new PreciseNumber('10');
    result = a.add(new PreciseNumber('-4'));
    expect(result).to.nested.include({
      value: BigInt(6),
      magnitude: 0,
    });
    expect(result.toString({ magnitude: 2 })).to.equal('600');
    expect(result.toString({ magnitude: 0 })).to.equal('6');
    expect(result.toString({ magnitude: 0, minPrecision: 2 })).to.equal('6.00');

    a = new PreciseNumber('10');
    result = a.add(new PreciseNumber('-4.23'));
    expect(result).to.nested.include({
      value: BigInt(577),
      magnitude: 2,
    });
    expect(result.toString({ magnitude: 2 })).to.equal('577');
    expect(result.toString({ magnitude: 0 })).to.equal('5.77');
  });
});
