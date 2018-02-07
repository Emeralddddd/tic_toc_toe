import GameReducers from "./../reducers";
import { applyMiddleware } from "redux";
import { createStore } from "redux";

let Store = createStore(GameReducers);

export default Store;
