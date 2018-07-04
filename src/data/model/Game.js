import { taggedSum } from "daggy";
import shuffle from "array-shuffle";

import { Tile, select } from "./Tile";

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

export const start = game =>
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

export const pickTile = t => g =>
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

export const setTileWinner = p => g =>
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
