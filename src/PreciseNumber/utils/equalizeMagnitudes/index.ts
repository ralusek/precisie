// Types
import { PreciseNumberLike } from '@/PreciseNumber/types';

// /Utils
import asMagnitude from '../asMagnitude';


export default (...items: PreciseNumberLike[]) => {
  const max = items.reduce((max, item) => {
    return Math.max(item.magnitude, max);
  }, -Infinity);

  return items.map(item => asMagnitude(
    max,
    {
      value: item.value,
      magnitude: item.magnitude,
    },
  ));
};