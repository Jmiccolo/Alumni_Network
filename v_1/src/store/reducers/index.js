import { combineReducers } from "redux";
import currentBrother from "./currentBrother";
import errors from "./errors";


const rootReducer = combineReducers({
    currentBrother,
    errors
});

export default rootReducer;