import { Dispatch } from "react";

import { fetchToken } from "../api/auth";
import { createContext, ReducerAction } from "./createContext";

enum Actions {
  set_code,
  set_token
}

type Token = {
  access_token: string;
  expires_in: number;
  id_token: string;
  refresh_token: string;
  token_type: string;
};

type AuthorizationContextState = {
  code: string | undefined;
  token: Token | undefined;
};

interface AuthorizationMethods {
  authorize: (code: string | undefined) => Promise<void>;
  getToken: () => Promise<void>;
}

const authReducer = (
  state: AuthorizationContextState,
  action: ReducerAction<Actions, any>
): AuthorizationContextState => {
  switch (action.type) {
    case Actions.set_code:
      return {
        ...state,
        code: action.payload
      };
    case Actions.set_token:
      return {
        ...state,
        token: action.payload
      };
    default:
      return state;
  }
};

const authorize = (dispatch: Dispatch<ReducerAction<Actions, any>>) => async (
  payload: string | undefined
) => {
  dispatch({ type: Actions.set_code, payload });
};

const getToken = (
  dispatch: Dispatch<ReducerAction<Actions, any>>,
  state: AuthorizationContextState
) => async () => {
  const { code } = state;
  if (!code) return;

  try {
    const token = fetchToken({ code });
    dispatch({ type: Actions.set_code, payload: token });
  } catch (e) {
    // logout if token is expired
    dispatch({ type: Actions.set_code, payload: undefined });
  }
};

export const { Context, Provider } = createContext<
  AuthorizationContextState,
  AuthorizationMethods
>(authReducer, { authorize, getToken }, { code: undefined, token: undefined });
