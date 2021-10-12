import { Dispatch } from "react";

import { ChemicalDto, getChemicals } from "../api/chemicals";
import { Chemical } from "../models/Chemical";
import { ContextActions, createContext, ReducerAction } from "./createContext";

enum Actions {
  fetch,
  error,
  loading
}

type ChemicalsContextState = {
  chemicals: ChemicalDto[];
  error?: Error;
  loading: boolean;
};

const chemicalReducer = (
  state: ChemicalsContextState,
  action: ReducerAction<Actions, any>
): ChemicalsContextState => {
  switch (action.type) {
    case Actions.fetch:
      return {
        ...state,
        chemicals: action.payload.map((ch: ChemicalDto) => new Chemical(ch))
      };
    case Actions.loading:
      return {
        ...state,
        loading: action.payload
      };
    case Actions.error:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};

const fetchChemicals = (dispatch: Dispatch<ContextActions>) => async () => {
  dispatch({ type: Actions.loading, payload: true });

  try {
    const data = await getChemicals();
    dispatch({ type: Actions.fetch, payload: data });
    dispatch({ type: Actions.loading, payload: false });
  } catch (error) {
    dispatch({ type: Actions.error, payload: error });
  }
};

export const { Context, Provider } = createContext(
  chemicalReducer,
  { fetchChemicals },
  { loading: false, chemicals: [] }
);
