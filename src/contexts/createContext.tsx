import {
  createContext as reactContext,
  Dispatch,
  ReactNode,
  Reducer,
  useReducer
} from "react";

type ContextState<State, Actions> = { state: State; actions: Actions };

export type ReducerAction<A, P> = {
  type: A;
  payload: P;
};

export const createContext = <State extends object, Methods extends object>(
  reducer: Reducer<State, ReducerAction<any, State>>,
  actions: {
    [key: string]: (dispatch: Dispatch<ReducerAction<any, any>>) => void;
  },
  defaultValue: State
) => {
  const Context = reactContext<ContextState<State, Methods>>(
    {} as ContextState<State, Methods>
  );

  const Provider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer<
      Reducer<State, ReducerAction<any, State>>
    >(reducer, defaultValue);

    let boundActions = {} as Methods;
    for (let key in actions) {
      boundActions[key] = actions[key](dispatch);
    }

    return (
      <Context.Provider value={{ state, actions: boundActions }}>
        {children}
      </Context.Provider>
    );
  };

  return { Context, Provider };
};
