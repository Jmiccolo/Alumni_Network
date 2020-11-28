import {SET_CURRENT_BROTHER} from "../actionTypes";

const DEFAULT_STATE = {
    isAuthenticated:false,
    brother:{}
}

export default (state = DEFAULT_STATE, action)=>{
    switch (action.type){
        case SET_CURRENT_BROTHER:
            return{
                isAuthenticated: !!Object.keys(action.brother).length,
                brother:action.brother
            };
        default:
            return state;
    }
}