import execWith from "crocks/State/execWith";

import gameReducer from "./game";
import { combineReducers } from "../helpers";

const reducers = combineReducers([gameReducer]);
export const reducer = (prevState, action) =>
  reducers(action)
    .map(execWith(prevState))
    .option(prevState);

export default reducer;
