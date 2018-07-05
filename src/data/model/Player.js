import { tagged } from "daggy";
import PropTypes from "proptypes";

export const Player = tagged("Player", ["name", "colour", "oneAway"]);

export const PlayerPropTypes = PropTypes.shape({
  name: PropTypes.string,
  colour: PropTypes.string
});
