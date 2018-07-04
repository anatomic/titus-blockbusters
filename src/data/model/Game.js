import { taggedSum } from "daggy";
import State from "crocks/State";
import assoc from "crocks/helpers/assoc";
import shuffle from "array-shuffle";

import { Tile, select } from "./Tile";

const { get, modify } = State;
const { Available } = Tile;

const letters = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "y"
];

const randIndex = items => Math.floor(Math.random() * (items.length - 1));

export const Game = taggedSum("Game", {
  NotStarted: ["tiles"],
  Selectable: ["tiles"],
  Active: ["tiles"],
  Complete: ["tiles"]
});

Game.of = () =>
  Game.NotStarted(
    shuffle(letters)
      .slice(0, 20)
      .map(c => Available(c))
  );

Game.start = game =>
  game.cata({
    NotStarted: tiles => {
      const idx = randIndex(tiles);
      tiles[idx] = select(tiles[idx]);
      return Game.Active(tiles);
    },
    Selectable: () => game,
    Active: () => game,
    Complete: () => game
  });

Game.pickTile = t => g =>
  g.cata({
    NotStarted: () => g,
    Active: () => g,
    Complete: () => g,
    Selectable: tiles => {
      const idx = tiles.findIndex(t1 => t1 === t);
      if (idx === -1 || Tile.Won.is(tiles[idx])) {
        return g;
      }

      tiles[idx] = select(tiles[idx]);
      return Game.Active(tiles);
    }
  });

Game.setTileWinner = p => g =>
  g.cata({
    NotStarted: () => g,
    Selectable: () => g,
    Active: tiles => {
      const activeTile = tiles.findIndex(t => Tile.Selected.is(t));
      tiles[activeTile] = Tile.Won(p.colour);
      return Game.Selectable(tiles);
    },
    Complete: () => g
  });

const pickGameFromState = ({ game }) => game;
const commitGameToState = game => modify(assoc("game", game));

export const startRound = () =>
  get(pickGameFromState)
    .map(Game.start)
    .chain(commitGameToState);

export const selectTile = t =>
  get(pickGameFromState)
    .map(Game.pickTile(t))
    .chain(commitGameToState);

export const commitAnswer = player =>
  get(pickGameFromState)
    .map(Game.setTileWinner(player))
    .chain(commitGameToState);
