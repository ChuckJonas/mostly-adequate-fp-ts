import { NonEmptyArray, last } from "fp-ts/NonEmptyArray";
import { flow } from "fp-ts/function";
import { Car } from './types'

export const isLastInStock: (cars: NonEmptyArray<Car>) => boolean = flow(
  last,
  (item: Car) => item.in_stock
);
