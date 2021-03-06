import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { reduxFirestore, getFirestore } from "redux-firestore";
import { reactReduxFirebase, getFirebase } from "react-redux-firebase";

import rootReducer from "./reducers";
import firebase from "../config/firebase.config";
const middleware = [thunk.withExtraArgument({ getFirebase, getFirestore })];

// the below is so that when redux dev tools is not avaialable
// on browser, it falls back to normal compose

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  : compose;

const rrfConfig = {
  useFirestoreForProfile: true,
  userProfile: "users",
  attachAuthIsReady: true
};

const enhancer = composeEnhancers(
  applyMiddleware(...middleware),
  reactReduxFirebase(firebase, rrfConfig),
  reduxFirestore(firebase)
);

const store = createStore(rootReducer, enhancer);

export default store;
