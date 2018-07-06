import { taggedSum } from "daggy";
import PropTypes from "proptypes";
import constant from "crocks/combinators/constant";

export const Player = taggedSum("Player", {
  Inactive: ["name", "colour", "points", "oneAway"],
  Answering: ["name", "colour", "points", "oneAway"]
});

export const PlayerPropTypes = PropTypes.shape({
  name: PropTypes.string,
  colour: PropTypes.string
});

export const reset = p =>
  p.cata({
    Answering: Player.Inactive,
    Inactive: constant(p)
  });

export const toggle = p =>
  p.cata({
    Inactive: Player.Answering,
    Answering: Player.Inactive
  });

export const toggleEq = p1 => p2 => (p1 === p2 ? toggle(p2) : p2);
