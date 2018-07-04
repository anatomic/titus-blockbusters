import { createStore, compose } from "redux";
import First from "crocks/First";
import State from "crocks/State";

import applyTo from "crocks/combinators/applyTo";
import execWith from "crocks/State/execWith";
import flip from "crocks/combinators/flip";
import identity from "crocks/combinators/identity";
import isSameType from "crocks/predicates/isSameType";
import mreduceMap from "crocks/helpers/mreduceMap";
import prop from "crocks/Maybe/prop";
import safe from "crocks/Maybe/safe";

import { Player } from "./model/Player";
import { Game, commitAnswer, selectTile, startRound } from "./model/Game";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const combineReducers = flip(action => mreduceMap(First, applyTo(action)));

const createReducer = strategies => ({ type, payload }) =>
  prop(type, strategies)
    .map(applyTo(payload))
    .chain(safe(isSameType(State)));

const player1 = Player("Bet", "blue");
const player2 = Player("Account", "white");

const initialState = {
  player1,
  player2,
  game: Game.of()
};

const game = {
  START: startRound,
  SELECT_TILE: selectTile,
  CORRECT_ANSWER: commitAnswer
};

const reducers = combineReducers([createReducer(game)]);
const reducer = (prevState, action) =>
  reducers(action)
    .map(execWith(prevState))
    .option(prevState);

export const store = createStore(
  reducer,
  initialState,
  composeEnhancers(identity)
);
