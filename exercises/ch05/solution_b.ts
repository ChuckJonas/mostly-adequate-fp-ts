import { map, reduce } from 'fp-ts/ReadonlyArray';
import { flow, pipe } from 'fp-ts/function';
import * as _ from '../utils';
import { Car } from './types';

const average = (xs: readonly number[]) => pipe(xs, reduce(0, _.add)) / xs.length;

const getDollarValue = (car: Car) => car.dollar_value;

export const averageDollarValue = flow(map(getDollarValue), average);
