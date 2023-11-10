import { getState } from "./store.js";
import { Action } from "./actions.js";

/**
 * @param { State } state
 * @param { Action } action
 * @return { State }
 */
export const reducer = (state, action) => {
  switch (action.type) {
    case "ADD": {
      return {
        ...state,
        phase: state.phase + 1,
      };
    }

    case "SUBTRACT": {
      return {
        ...state,
        phase: state.phase - 1,
      };
    }

    case "RESET": {
      return {
        ...state,
        phase: 0,
      };
    }
    default:
      return state;
  }
};
