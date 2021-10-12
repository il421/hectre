import React, { ReactNode, Reducer, useReducer } from "react";

type ContextState<State> = { state: State; [key: string]: any };
export type ContextActions = { [key: string]: any };

export type ReducerAction<A, P> = {
  type: A;
  payload: P;
};

export const createContext = <State extends object>(
  reducer: Reducer<State, ReducerAction<any, State>>,
  actions: ContextActions,
  defaultValue: State
) => {
  const Context = React.createContext<ContextState<State>>(
    {} as ContextState<State>
  );

  const Provider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer<
      Reducer<State, ReducerAction<any, State>>
    >(reducer, defaultValue);

    let boundActions: ContextActions = {};
    for (let key in actions) {
      boundActions[key] = actions[key](dispatch);
    }

    return (
      <Context.Provider value={{ state, ...boundActions }}>
        {children}
      </Context.Provider>
    );
  };

  return { Context, Provider };
};
