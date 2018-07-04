import { createStore, compose } from "redux";

import reducer from "./reducers";
import identity from "crocks/combinators/identity";

import { Player } from "./model/Player";
import { Game } from "./model/Game";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const player1 = Player("Bet", "blue", false);
const player2 = Player("Account", "white", false);

const initialState = {
  player1,
  player2,
  game: Game.of()
};

export const store = createStore(
  reducer,
  initialState,
  composeEnhancers(identity)
);
