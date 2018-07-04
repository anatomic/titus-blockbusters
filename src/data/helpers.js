import First from "crocks/First";
import State from "crocks/State";
import applyTo from "crocks/combinators/applyTo";
import flip from "crocks/combinators/flip";
import isSameType from "crocks/predicates/isSameType";
import mreduceMap from "crocks/helpers/mreduceMap";
import prop from "crocks/Maybe/prop";
import safe from "crocks/Maybe/safe";

export const combineReducers = flip(action => mreduceMap(First, applyTo(action)));

export const createReducer = strategies => ({ type, payload }) =>
  prop(type, strategies)
    .map(applyTo(payload))
    .chain(safe(isSameType(State)));
