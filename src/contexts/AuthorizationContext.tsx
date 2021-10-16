import { Dispatch } from "react";

import { fetchToken, Token } from "../api/auth";
import { createContext, ReducerAction } from "./createContext";

export enum Actions {
  set_code,
  set_token
}

type AuthorizationContextState = {
  code: string | null;
  token: Token | null;
};

interface AuthorizationMethods {
  authorize: (code: string | null) => Promise<void>;
  unauthorize: () => void;
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

const syncWithLocalStorage = (key: string | number, value: string | object) => {
  const data = typeof value === "string" ? value : JSON.stringify(value);
  localStorage.setItem(String(key), data);
};

const getFromLocalStorage = (key: string | number): any | null => {
  const data = localStorage.getItem(String(key));
  if (data) {
    return data;
  }
  return data;
};

const removeFromLocalStorage = (key: string | number): any | undefined => {
  return localStorage.removeItem(String(key));
};

const authorize = (dispatch: Dispatch<ReducerAction<Actions, any>>) => async (
  code: string | undefined
) => {
  if (!code) return;

  // fetch token
  try {
    const token = await fetchToken({ code });
    // persist token for both state and localeStorage
    dispatch({ type: Actions.set_token, payload: token });
    dispatch({ type: Actions.set_code, payload: code });

    syncWithLocalStorage(Actions.set_code, code);
    syncWithLocalStorage(Actions.set_token, token);
  } catch (e) {
    // logout if token is expired
    unauthorize(dispatch)();
  }
};

const unauthorize = (dispatch: Dispatch<ReducerAction<Actions, any>>) => () => {
  dispatch({ type: Actions.set_code, payload: undefined });
  dispatch({ type: Actions.set_token, payload: undefined });
  removeFromLocalStorage(Actions.set_token);
  removeFromLocalStorage(Actions.set_code);
};

export const { Context, Provider } = createContext<
  AuthorizationContextState,
  AuthorizationMethods
>(
  authReducer,
  { authorize, unauthorize },
  {
    code: getFromLocalStorage(Actions.set_code),
    token: getFromLocalStorage(Actions.set_token)
  }
);
