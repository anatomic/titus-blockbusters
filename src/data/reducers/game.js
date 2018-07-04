import State from "crocks/State";
import assoc from "crocks/helpers/assoc";

import { createReducer } from "../helpers";

import { start, pickTile, setTileWinner } from "../model/Game";

const { get, modify } = State;

const pickGameFromState = ({ game }) => game;
const commitGameToState = game => modify(assoc("game", game));

export const startRound = () =>
  get(pickGameFromState)
    .map(start)
    .chain(commitGameToState);

export const selectTile = tile =>
  get(pickGameFromState)
    .map(pickTile(tile))
    .chain(commitGameToState);

export const commitAnswer = player =>
  get(pickGameFromState)
    .map(setTileWinner(player))
    .chain(commitGameToState);

export const reducer = createReducer({
  START: startRound,
  SELECT_TILE: selectTile,
  CORRECT_ANSWER: commitAnswer
});

export default reducer;
