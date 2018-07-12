import { applyMiddleware, compose, createStore } from "redux";

import Pair from "crocks/Pair";
import chain from "crocks/pointfree/chain";
import flip from "crocks/combinators/flip";
import map from "crocks/pointfree/map";
import pipe from "crocks/helpers/pipe";
import prop from "crocks/Maybe/prop";
import tap from "crocks/helpers/tap";

import reducer from "./reducers";

import correctAnswer from "../assets/correct-answer.mp3";
import incorrectAnswer from "../assets/wrong-answer.mp3";
import buzzer from "../assets/buzzer.mp3";
import stab from "../assets/stab.mp3";
import theme from "../assets/theme.mp3";

import { Player } from "./model/Player";
import { Game } from "./model/Game";

const sounds = {
  START: stab,
  WELCOME: stab,
  BLOCKBUSTERS: stab,
  CORRECT_ANSWER: correctAnswer,
  INCORRECT_ANSWER: incorrectAnswer,
  BUZZER: buzzer,
  PLAY_THEME: theme
};

const playSound = pipe(
  prop("type"),
  chain(flip(prop)(sounds)),
  map(tap(s => new Audio(s).play()))
);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const player1 = Player.Inactive("Account", "white", 0, false);
const player2 = Player.Inactive("Bet", "blue", 0, false);

const initialState = {
  players: Pair(player1, player2),
  game: Game.NotStarted
};

const soundBoardMiddleware = () => next => action => {
  next(action);
  playSound(action);
};

export const store = createStore(
  reducer,
  initialState,
  composeEnhancers(applyMiddleware(soundBoardMiddleware))
);
