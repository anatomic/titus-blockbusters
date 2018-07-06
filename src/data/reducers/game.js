import State from "crocks/State";
import assoc from "crocks/helpers/assoc";

import { createReducer } from "../helpers";

import {
  answerQuestion,
  intro,
  start,
  pickTile,
  setTileWinner,
  Game
} from "../model/Game";
import { Player, reset, toggle, toggleEq } from "../model/Player";

const { get, modify } = State;

const pickGameFromState = ({ game }) => game;
const commitGameToState = game => modify(assoc("game", game));
const commitPlayersToState = players => modify(assoc("players", players));

const playIntro = () =>
  get(pickGameFromState)
    .map(intro)
    .chain(commitGameToState);

const startRound = () =>
  get(pickGameFromState)
    .map(start)
    .chain(commitGameToState);

const selectTile = tile =>
  get(pickGameFromState)
    .map(pickTile(tile))
    .chain(commitGameToState);

const answeringQuestion = () =>
  get(pickGameFromState)
    .map(answerQuestion)
    .chain(commitGameToState);

const getActivePlayer = () =>
  get(({ players }) => players.toArray()).map(
    ps => ps.filter(p => Player.Answering.is(p))[0]
  );

const assignTileToPlayer = player =>
  get(pickGameFromState)
    .map(setTileWinner(player))
    .chain(commitGameToState)
    .chain(resetPlayers);

const correctAnswer = () => getActivePlayer().chain(assignTileToPlayer);

const selectPlayer = p =>
  get()
    .map(
      ({ players, game }) =>
        Game.Asking.is(game) ? players.bimap(toggleEq(p), toggleEq(p)) : players
    )
    .chain(commitPlayersToState)
    .chain(answeringQuestion);

const changePlayer = () =>
  get(({ players }) => players)
    .map(p => p.bimap(toggle, toggle))
    .chain(commitPlayersToState);

const resetPlayers = () =>
  get(({ players }) => players)
    .map(p => p.bimap(reset, reset))
    .chain(commitPlayersToState);

export const reducer = createReducer({
  PLAY_INTRO: playIntro,
  START: startRound,
  SELECT_TILE: selectTile,
  BUZZER: selectPlayer,
  CORRECT_ANSWER: correctAnswer,
  INCORRECT_ANSWER: changePlayer
});

export default reducer;
