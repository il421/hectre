import { Dispatch } from "react";

import {
  fetchHarvest,
  fetchOrchardRefData,
  fetchVarietyRefData,
  HarvestDto,
  HarvestRefData,
  RefData
} from "../api/harvest";
import { Harvest } from "../models/Harvest";
import { createContext, ReducerAction } from "./createContext";

enum Actions {
  set_ref_data,
  set_harvest,
  set_loading,
  set_error
}

type HarvestContextState = {
  harvest: Harvest[];
  loading: boolean;
  orchards: HarvestRefData["orchards"];
  variety: HarvestRefData["variety"];
  error?: Error;
};

interface HarvestMethods {
  fetchChemicals: () => void;
  setPage: (payload: number) => void;
  setShow: (payload: number) => void;
}

const defaultState: HarvestContextState = {
  loading: false,
  harvest: [],
  orchards: new Map<string, RefData["name"][]>(),
  variety: new Map<string, RefData["name"][]>()
};

const harvestReducer = (
  state: HarvestContextState,
  action: ReducerAction<Actions, any>
): HarvestContextState => {
  switch (action.type) {
    case Actions.set_harvest:
      return {
        ...state,
        harvest: action.payload.map(
          (hr: HarvestDto) =>
            // create a model with refData
            new Harvest(hr, {
              orchards: state.orchards,
              variety: state.variety
            })
        )
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
    case Actions.set_ref_data:
      return {
        ...state,
        // covert ref data dtos array to map for convenience
        variety: new Map(
          action.payload.variety.map((dto: RefData) => [dto.id, dto.name])
        ),
        orchards: new Map(
          action.payload.orchards.map((dto: RefData) => [dto.id, dto.name])
        )
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
    const [orchard, variety] = await promises;
    dispatch({ type: Actions.set_ref_data, payload: { orchard, variety } });
  } catch (e) {
    // @TODO chekc the eror tiel to thro erro or store erro
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

export const { Context, Provider } = createContext<
  HarvestContextState,
  HarvestMethods
>(harvestReducer, { getHarvest, getRefData }, defaultState);
