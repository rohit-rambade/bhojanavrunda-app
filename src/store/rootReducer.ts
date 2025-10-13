import { Action, combineReducers, Reducer } from "redux";
import auth, { AuthState } from "./slices/auth";

export type RootState = {
  auth: AuthState;
};

export interface AsyncReducers {
  [key: string]: Reducer<any, Action>;
}

const staticReducers = {
  auth,
};

const rootReducer =
  (asyncReducers?: AsyncReducers) => (state: RootState, action: Action) => {
    const combinedReducer = combineReducers({
      ...staticReducers,
      ...asyncReducers,
    });
    return combinedReducer(state, action);
  };

export default rootReducer;
