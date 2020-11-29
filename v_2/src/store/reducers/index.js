import { combineReducers } from "redux";
import currentAlumni from "./currentAlumni";
import errors from "./errors";
import currentOrg from "./currentOrg"


const rootReducer = combineReducers({
    currentAlumni,
    currentOrg,
    errors
});

export default rootReducer;