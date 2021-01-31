// Types
import { PreciseNumberLike } from '@/PreciseNumber/types';

export default (
  magnitude: number,
  {
    value,
    magnitude: currentMagnitude,
  }: PreciseNumberLike
) => {
  if (magnitude === currentMagnitude) return { magnitude, value: value };
  if (!Number.isInteger(magnitude)) throw new Error(`PreciseNumber.asMagnitude expects an integer.`);
  if (magnitude < currentMagnitude) throw new Error(`PreciseNumber.asMagnitude was passed a desired magnitude of ${magnitude}, when minimum for value is ${currentMagnitude}.`);
  
  const increaseInMagnitude = magnitude - currentMagnitude;
  
  return {
    magnitude,
    value: value * (BigInt(10) ** BigInt(increaseInMagnitude)),
  };
};
