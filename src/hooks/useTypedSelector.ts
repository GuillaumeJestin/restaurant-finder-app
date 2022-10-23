import { TypedUseSelectorHook, useSelector } from "react-redux";
import PlaceReducerState from "../types/PlaceReducerState";
import StylingReducerState from "../types/StylingReducerState";

const useTypedSelector: TypedUseSelectorHook<{ place: PlaceReducerState, styling: StylingReducerState }> = useSelector;

export default useTypedSelector;