import State from "crocks/State";
import assoc from "crocks/helpers/assoc";
import fst from "crocks/Pair/fst";
import snd from "crocks/Pair/snd";
import { createReducer } from "../helpers";

import {
  Game,
  answerQuestion,
  completeGame,
  intro,
  pickTile,
  setTileWinner,
  start
} from "../model/Game";
import {
  Player,
  addPointsAndReset,
  toggleFlash,
  toggle,
  toggleEq
} from "../model/Player";

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
    .chain(commitGameToState);

const selectPlayer = p =>
  get()
    .map(
      ({ players, game }) =>
        Game.Asking.is(game) ? players.bimap(toggleEq(p), toggleEq(p)) : players
    )
    .chain(commitPlayersToState);

const buzzer = player => selectPlayer(player).chain(answeringQuestion);

const toggleFlashIfEq = p1 => p2 => (p1 === p2 ? toggleFlash(p2) : p2);

const setPlayerFlash = player =>
  get(({ players }) => players)
    .map(players => players.bimap(toggleFlashIfEq(player), toggleFlashIfEq(player)))
    .chain(commitPlayersToState);

const correctAnswer = () =>
  getActivePlayer()
    .chain(assignTileToPlayer)
    .chain(addPointsAndResetPlayers);

const incorrectAnswer = () =>
  get(({ players }) => players)
    .map(p => p.bimap(toggle, toggle))
    .chain(commitPlayersToState);

const addPointsAndResetPlayers = () =>
  get(({ players }) => players)
    .map(p => p.bimap(addPointsAndReset, addPointsAndReset))
    .chain(commitPlayersToState);

const blockbusters = () =>
  getActivePlayer()
    .map(completeGame)
    .ap(get(pickGameFromState))
    .chain(commitGameToState)
    .chain(addPointsAndResetPlayers);

export const reducer = createReducer({
  BLOCKBUSTERS: blockbusters,
  BUZZER: buzzer,
  CORRECT_ANSWER: correctAnswer,
  INCORRECT_ANSWER: incorrectAnswer,
  ONE_AWAY: setPlayerFlash,
  PLAY_INTRO: playIntro,
  SELECT_TILE: selectTile,
  START: startRound
});

export default reducer;
