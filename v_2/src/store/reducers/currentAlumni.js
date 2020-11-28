import {SET_CURRENT_ALUMNI} from "../actionTypes";

const DEFAULT_STATE = {
    isAuthenticated:false,
    id:""
}

export default (state = DEFAULT_STATE, action)=>{
    switch (action.type){
        case SET_CURRENT_ALUMNI:
            console.log(action)
            return{
                isAuthenticated: !!Object.keys(action.alumni).length,
                id:action.alumni
            };
        default:
            return state;
    }
}