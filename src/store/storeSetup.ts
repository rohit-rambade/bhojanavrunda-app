import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Action,
  AnyAction,
  configureStore,
  Reducer,
  Store,
} from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import { PERSIST_STORE_NAME } from "../constants/app.constant";
import rootReducer, { AsyncReducers, RootState } from "./rootReducer";

const persistConfig = {
  key: PERSIST_STORE_NAME,
  keyPrefix: "",
  storage: AsyncStorage,
  whitelist: ["auth", "locale"],
};

interface CustomStore extends Store<RootState, AnyAction> {
  asyncReducers?: AsyncReducers;
}

const store: CustomStore = configureStore({
  reducer: persistReducer(persistConfig, rootReducer() as Reducer),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),

  devTools: process.env.NODE_ENV === "development",
});

store.asyncReducers = {};

export const persistor = persistStore(store);

export function injectReducer<S>(key: string, reducer: Reducer<S, Action>) {
  if (store.asyncReducers) {
    if (store.asyncReducers[key]) {
      return false;
    }
    store.asyncReducers[key] = reducer;
    store.replaceReducer(
      persistReducer(persistConfig, rootReducer(store.asyncReducers) as Reducer)
    );
  }
  persistor.persist();
  return store;
}

export type AppDispatch = typeof store.dispatch;

export default store;
