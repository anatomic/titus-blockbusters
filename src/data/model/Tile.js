import { taggedSum } from "daggy";

export const Tile = taggedSum("Tile", {
  Available: ["char"],
  Selected: ["char"],
  Won: ["colour"]
});

export const select = tile =>
  tile.cata({
    Available: c => Tile.Selected(c),
    Selected: _ => tile,
    Won: _ => tile
  });
