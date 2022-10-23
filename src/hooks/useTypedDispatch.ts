import { useDispatch } from "react-redux";
import store from "../stores/store";

const useTypedDispatch: () => typeof store.dispatch = useDispatch;

export default useTypedDispatch;