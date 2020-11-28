import { combineReducers } from "redux";
import currentAlumni from "./currentAlumni";
import errors from "./errors";


const rootReducer = combineReducers({
    currentAlumni,
    errors
});

export default rootReducer;