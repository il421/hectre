import { Dispatch } from "react";

import { AxiosError } from "axios";

import { ChemicalDto, getChemicals } from "../api/chemicals";
import { Chemical } from "../models/Chemical";
import { createContext, ReducerAction } from "./createContext";

enum Actions {
  set_fetch,
  set_error,
  set_loading,
  set_show,
  set_page
}

type ChemicalsContextState = {
  chemicals: Chemical[];
  loading: boolean;
  show: number;
  page: number;
  error?: AxiosError;
};

interface ChemicalsMethods {
  fetchChemicals: () => void;
  setPage: (payload: number) => void;
  setShow: (payload: number) => void;
}

const defaultState = { loading: false, chemicals: [], page: 1, show: 10 };

const chemicalReducer = (
  state: ChemicalsContextState,
  action: ReducerAction<Actions, any>
): ChemicalsContextState => {
  switch (action.type) {
    case Actions.set_fetch:
      return {
        ...state,
        chemicals: action.payload.map((ch: ChemicalDto) => new Chemical(ch))
      };
    case Actions.set_loading:
      return {
        ...state,
        loading: action.payload
      };
    case Actions.set_error:
      return {
        ...state,
        error: action.payload
      };
    case Actions.set_page:
      return {
        ...state,
        page: action.payload
      };
    case Actions.set_show:
      return {
        ...state,
        show: action.payload
      };
    default:
      return state;
  }
};

const setPage = (dispatch: Dispatch<ReducerAction<Actions, any>>) => (
  payload: number
) => {
  dispatch({ type: Actions.set_page, payload });
};

const setShow = (dispatch: Dispatch<ReducerAction<Actions, any>>) => (
  payload: number
) => {
  dispatch({ type: Actions.set_show, payload });
  dispatch({ type: Actions.set_page, payload: defaultState.page });
};

const fetchChemicals = (
  dispatch: Dispatch<ReducerAction<Actions, any>>
) => async () => {
  dispatch({ type: Actions.set_loading, payload: true });

  try {
    const data = await getChemicals();
    dispatch({ type: Actions.set_fetch, payload: data });
  } catch (error) {
    dispatch({ type: Actions.set_error, payload: error });
  } finally {
    dispatch({ type: Actions.set_loading, payload: false });
  }
};

export const { Context, Provider } = createContext<
  ChemicalsContextState,
  ChemicalsMethods
>(chemicalReducer, { fetchChemicals, setShow, setPage }, defaultState);
