import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { rootReducer } from "./rootReducer";
import { composeWithDevTools } from "redux-devtools-extension";

//finalReducer

const finalReducer = combineReducers({
  rootReducer,
});

//initial state

const initialState = {
  rootReducer: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
  },
}; 

//middleware

const middleware = [thunk];

//Creating the store

const store = createStore(finalReducer, initialState,composeWithDevTools( applyMiddleware(...middleware)));

//export the store
export default store;
