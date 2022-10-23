import StylingReducerAction from "../../types/StylingReducerAction";
import StylingReducerState from "../../types/StylingReducerState";
import { STYLING_STORE_ACTION_SET_THEME_MODE } from "./actions/setThemeMode";

const PERSIST_LIGHT_MODE_KEY = "redux-light-mode";

// Initial state will check in the local storage to see if there isn't any persisted data
const initialStylingState: StylingReducerState = {
  lightMode: window.localStorage.getItem(PERSIST_LIGHT_MODE_KEY) ? JSON.parse(window.localStorage.getItem(PERSIST_LIGHT_MODE_KEY)!) : !(window.matchMedia?.('(prefers-color-scheme: dark)').matches),
}

const stylingReducer = (state = initialStylingState, action: StylingReducerAction) => {

  switch (action.type) {
    case STYLING_STORE_ACTION_SET_THEME_MODE: {
      window.localStorage.setItem(PERSIST_LIGHT_MODE_KEY, JSON.stringify(action.lightMode));

      return {
        ...state,
        lightMode: action.lightMode
      }
    }
  }

  return state;
}

export { stylingReducer, initialStylingState };