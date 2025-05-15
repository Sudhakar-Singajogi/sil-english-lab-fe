import { configureStore } from "@reduxjs/toolkit";
import basicReducer from "./basicSlice"; // update path if needed
import authReducer from "./authSlice";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";

let store;

if (import.meta.env.MODE === "development" ) {
  const persistConfig = {
    key: "root",
    storage,
    whitelist: ["auth", "basics"], // only persist the auth slice
  };

  const rootReducer = combineReducers({
    auth: authReducer, // 'auth' → appears in `state.auth` need use like this while calling
    basics: basicReducer, // 'basics' → appears in `state.basics` need use like this while calling
  });

  const persistedReducer = persistReducer(persistConfig, rootReducer);

  store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  });
} else {
  store = configureStore({
    reducer: {
      basics: basicReducer,
      auth: authReducer,
    },
  });
}

export const persistor = persistStore(store);
export default store;
