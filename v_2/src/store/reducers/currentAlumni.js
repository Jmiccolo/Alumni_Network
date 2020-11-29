import {SET_CURRENT_ALUMNI} from "../actionTypes";

const DEFAULT_STATE = {
    isAuthenticated:false,
    alumni: null
}

export default (state = DEFAULT_STATE, action)=>{
    switch (action.type){
        case SET_CURRENT_ALUMNI:
            return{
                isAuthenticated: !!Object.keys(action.alumni).length,
                alumni:action.alumni
            };
        default:
            return state;
    }
}