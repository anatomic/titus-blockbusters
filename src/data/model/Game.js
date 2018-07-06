import { taggedSum } from "daggy";
import shuffle from "array-shuffle";
import constant from "crocks/combinators/constant";

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
  NotStarted: [],
  Intro: [],
  Selectable: ["tiles"],
  Asking: ["tiles"],
  Answering: ["tiles"],
  Complete: ["tiles", "winner"]
});

export const createTiles = () =>
  shuffle(letters)
    .slice(0, 20)
    .map(c => Available(c));

export const createTilesAndSelectRandom = () => {
  const tiles = createTiles();
  const idx = randIndex(tiles);
  tiles[idx] = select(tiles[idx]);
  return tiles;
};

Game.of = () => Game.NotStarted;

export const intro = game =>
  game.cata({
    NotStarted: () => Game.Intro,
    Intro: constant(game),
    Selectable: constant(game),
    Asking: constant(game),
    Answering: constant(game),
    Complete: constant(game)
  });

export const start = game =>
  game.cata({
    NotStarted: constant(game),
    Intro: () => Game.Asking(createTilesAndSelectRandom()),
    Selectable: constant(game),
    Asking: constant(game),
    Answering: constant(game),
    Complete: constant(game)
  });

export const pickTile = char => game =>
  game.cata({
    NotStarted: constant(game),
    Intro: constant(game),
    Complete: constant(game),
    Selectable: tiles => {
      const idx = tiles.findIndex(t => t.char === char);
      if (idx === -1 || Tile.Won.is(tiles[idx])) {
        return game;
      }

      tiles[idx] = select(tiles[idx]);
      return Game.Asking(tiles);
    },
    Asking: constant(game),
    Answering: constant(game)
  });

export const answerQuestion = game =>
  game.cata({
    NotStarted: constant(game),
    Intro: constant(game),
    Selectable: constant(game),
    Asking: Game.Answering,
    Answering: constant(game),
    Complete: constant(game)
  });

export const setTileWinner = player => game =>
  game.cata({
    NotStarted: constant(game),
    Selectable: constant(game),
    Asking: constant(game),
    Answering: tiles => {
      const activeTile = tiles.findIndex(t => Tile.Selected.is(t));
      tiles[activeTile] = Tile.Won(player.colour);
      return Game.Selectable(tiles);
    },
    Complete: constant(game)
  });

export const completeGame = player => game =>
  game.cata({
    NotStarted: constant(game),
    Selectable: constant(game),
    Asking: constant(game),
    Answering: tiles => {
      const activeTile = tiles.findIndex(t => Tile.Selected.is(t));
      tiles[activeTile] = Tile.Won(player.colour);
      return Game.Complete(tiles, player);
    },
    Complete: constant(game)
  });
