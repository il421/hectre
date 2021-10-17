import { Dispatch } from "react";

import {
  fetchHarvest,
  fetchOrchardRefData,
  fetchVarietyRefData,
  HarvestDto,
  RefData
} from "../api/harvest";
import { refDataToMap } from "../common/utils";
import { Harvest } from "../models/Harvest";
import { createContext, ReducerAction } from "./createContext";

enum Actions {
  set_ref_data,
  set_harvest,
  set_loading,
  set_error,
  set_filter
}

export type HarvestRefData = {
  orchards: Map<string, RefData["name"]>;
  variety: Map<string, RefData["name"]>;
};

type Filter = {
  orchard: string[];
};

type HarvestContextState = {
  harvest: Harvest[];
  loading: boolean;
  orchards: HarvestRefData["orchards"];
  variety: HarvestRefData["variety"];
  error?: Error;
  filter: Filter;
};

interface HarvestMethods {
  getHarvest: () => void;
  setFilter: (key: keyof Filter, value: string[]) => void;
}

const defaultState: HarvestContextState = {
  loading: false,
  harvest: [],
  orchards: new Map(),
  variety: new Map(),
  filter: {
    orchard: []
  }
};

const harvestReducer = (
  state: HarvestContextState,
  action: ReducerAction<Actions, any>
): HarvestContextState => {
  switch (action.type) {
    case Actions.set_harvest:
      return {
        ...state,
        harvest: action.payload.map((hr: HarvestDto) => new Harvest(hr))
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
    case Actions.set_filter:
      const { key, value } = action.payload;
      return {
        ...state,
        filter: { ...state.filter, [key]: value }
      };
    case Actions.set_ref_data:
      return {
        ...state,
        // covert ref data dto array to map for convenience
        variety: refDataToMap(action.payload.variety),
        orchards: refDataToMap(action.payload.orchards)
      };
    default:
      return state;
  }
};

const getRefData = (
  dispatch: Dispatch<ReducerAction<Actions, any>>
) => async () => {
  dispatch({ type: Actions.set_loading, payload: true });
  const promises = Promise.all([fetchOrchardRefData(), fetchVarietyRefData()]);

  try {
    const [orchards, variety] = await promises;
    dispatch({ type: Actions.set_ref_data, payload: { orchards, variety } });
  } catch (e) {
    dispatch({ type: Actions.set_error, payload: e });
  } finally {
    dispatch({ type: Actions.set_loading, payload: false });
  }

  return promises;
};

const getHarvest = (
  dispatch: Dispatch<ReducerAction<Actions, any>>
) => async () => {
  try {
    await getRefData(dispatch)();
    const data = await fetchHarvest();
    dispatch({ type: Actions.set_harvest, payload: data });
  } catch (error) {
    dispatch({ type: Actions.set_error, payload: error });
  } finally {
    dispatch({ type: Actions.set_loading, payload: false });
  }
};

const setFilter = (dispatch: Dispatch<ReducerAction<Actions, any>>) => (
  key: keyof Filter,
  value: string
) => {
  dispatch({ type: Actions.set_filter, payload: { key, value } });
};

export const { Context, Provider } = createContext<
  HarvestContextState,
  HarvestMethods
>(harvestReducer, { getHarvest, getRefData, setFilter }, defaultState);
