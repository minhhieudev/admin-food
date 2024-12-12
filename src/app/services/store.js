import { configureStore } from "@reduxjs/toolkit";
import rootSaga from "./saga.js";
import createSagaMiddleware from "redux-saga";
import reducer from "./reducer.js";

const sagaMiddleware = createSagaMiddleware();

export default configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => {
    const middlewares = getDefaultMiddleware({
      serializableCheck: false,
    }).concat(sagaMiddleware);
    return middlewares;
  },
});

sagaMiddleware.run(rootSaga);
