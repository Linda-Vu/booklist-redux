import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import App from "./components/app";
import reducers from "./reducers";

const combineReducers = (reducers) => {
  return (state = {}, action) => {
    return Object.keys(reducers).reduce((nextState, key) => {
      nextState[key] = reducers[key](state[key], action);
      return nextState;
    },{});
  }
};

const rootReducer = combineReducers({
  books: function() {
    return [
      { title: "Harry Potter and the Chamber of Secrets", pages: 357 },
      { title: "Hunger Games", pages: 387 },
      { title: "JavaScript: The Good Parts", pages: 176 },
      { title: "Clojure for the Brave and True", pages: 329 }
    ];
  },
  activeBook: function(state = null, action) {
    switch (action.type) {
      case "BOOK_SELECTED":
        return action.payload;
    }

    return state;
  }
});

// we should now have "Hunger Games" as our activeBook
const state = rootReducer({},
  { type: "BOOK_SELECTED",
  payload: { title: "Hunger Games", pages: 387 }
});

// state is a POJO, as expected
console.log(state);


ReactDOM.render(
  <Provider store={createStore(rootReducer)}>
    <App />
  </Provider>,
  document.getElementById('root')
);
