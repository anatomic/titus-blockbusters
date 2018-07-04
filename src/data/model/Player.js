import { tagged } from "daggy";

export const Player = tagged("Player", ["name", "colour", "oneAway"]);
