import { createStore, compose } from "redux";

import Pair from "crocks/Pair";
import reducer from "./reducers";
import identity from "crocks/combinators/identity";

import { Player } from "./model/Player";
import { Game, createTilesAndSelectRandom } from "./model/Game";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const player1 = Player.Inactive("Bet", "blue", 0, false);
const player2 = Player.Inactive("Account", "white", 0, false);

const initialState = {
  players: Pair(player1, player2),
  game: Game.Asking(createTilesAndSelectRandom())
  // game: Game.NotStarted
};

export const store = createStore(
  reducer,
  initialState,
  composeEnhancers(identity)
);
