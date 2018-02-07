import GameReducers from "./../reducers";
import { createStore } from "redux";

let Store = createStore(GameReducers);

export default Store;
