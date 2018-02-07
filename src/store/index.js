import GameReducers from "./../reducers";
import logger from "redux-logger";
import { applyMiddleware } from "redux";
import { createStore } from "redux";

let Store = createStore(GameReducers, applyMiddleware(logger));

export default Store;
