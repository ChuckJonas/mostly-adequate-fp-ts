import { ord, ordNumber } from "fp-ts/Ord";
import * as RA from "fp-ts/ReadonlyNonEmptyArray";
import { flow } from "fp-ts/function";
import * as _ from "../../utils";
import { Car } from "./types";

const getHorsepower = (car: Car) => car.horsepower;

const getName = (car: Car) => car.name;

const ordByHorsepower = ord.contramap(ordNumber, getHorsepower);

export const fastestCar = flow(
  RA.sort(ordByHorsepower),
  RA.last,
  getName,
  _.append(" is the fastest")
);
