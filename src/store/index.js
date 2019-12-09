import GameReducers from "./../reducers";
import { createStore } from "redux";

let Store = createStore(GameReducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default Store;
