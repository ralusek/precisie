import 'mocha';
import { expect } from 'chai';

import minimumMagnitudeFromInput from '../../lib/PreciseNumber/utils/minimumMagnitudeFromInput';


describe('Invocation', () => {
  it('should be able to be executed.', () => {
    minimumMagnitudeFromInput({
      whole: '0',
      magnitude: 0,
      sign: '',
    });
  });

  it('should correctly return values and magnitudes', () => {
    expect(minimumMagnitudeFromInput({ whole: '10', fractional: '00', magnitude: -2, sign: '' })).to.nested.include({
      value: BigInt('1'),
      magnitude: -3,
    });

    expect(minimumMagnitudeFromInput({ whole: '00', fractional: '00', magnitude: -2, sign: '' })).to.nested.include({
      value: BigInt('0'),
      magnitude: 0,
    });

    expect(minimumMagnitudeFromInput({ whole: '1000', fractional: '', magnitude: 0, sign: '' })).to.nested.include({
      value: BigInt('1'),
      magnitude: -3,
    });

    expect(minimumMagnitudeFromInput({ whole: '13', fractional: '10', magnitude: -2, sign: '' })).to.nested.include({
      value: BigInt('131'),
      magnitude: -1,
    });

    expect(minimumMagnitudeFromInput({ whole: '0', fractional: '10', magnitude: -2, sign: '' })).to.nested.include({
      value: BigInt('1'),
      magnitude: -1,
    });

    expect(minimumMagnitudeFromInput({ whole: '000', fractional: '100', magnitude: -2, sign: '' })).to.nested.include({
      value: BigInt('1'),
      magnitude: -1,
    });

    expect(minimumMagnitudeFromInput({ whole: '0', fractional: '1001', magnitude: -2, sign: '' })).to.nested.include({
      value: BigInt('1001'),
      magnitude: 2,
    });

    expect(minimumMagnitudeFromInput({ whole: '0', fractional: '1001', magnitude: -2, sign: '-' })).to.nested.include({
      value: BigInt('-1001'),
      magnitude: 2,
    });

    expect(minimumMagnitudeFromInput({ whole: '15', fractional: '1001', magnitude: 2, sign: '-' })).to.nested.include({
      value: BigInt('-151001'),
      magnitude: 6,
    });
  });
});
