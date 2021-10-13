import { Dispatch } from "react";

import { getAuthorization } from "../api/auth";
import { createContext, ReducerAction } from "./createContext";

enum Actions {
  set
}

type AuthorizationContextState = {
  code: string;
};

const authReducer = (
  state: AuthorizationContextState,
  action: ReducerAction<Actions, any>
): AuthorizationContextState => {
  switch (action.type) {
    case Actions.set:
      return {
        ...state,
        code: action.payload
      };
    default:
      return state;
  }
};

const authorize = (
  dispatch: Dispatch<ReducerAction<Actions, AuthorizationContextState>>
) => async () => {
  try {
    const res = await getAuthorization();
    dispatch({ type: Actions.set, payload: res });
  } catch (e) {}
};

export const { Context, Provider } = createContext(
  authReducer,
  { authorize },
  { loading: false, chemicals: [] }
);
