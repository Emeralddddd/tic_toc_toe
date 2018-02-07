import cells from "./cells";
import move from "./move";
import players from "./players";
import { combineReducers } from "redux";

const GameReducers = combineReducers({ cells, move, players });

export default GameReducers;
