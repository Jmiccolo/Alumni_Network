import {SET_CURRENT_ORG} from "../actionTypes";

const DEFAULT_STATE = {
    isValidated:false,
    organization:null
}

export default (state = DEFAULT_STATE, action)=>{
    switch (action.type){
        case SET_CURRENT_ORG:
            return{
                isValidated: action.isValidated,
                organization: action.organization
            };
        default:
            return state;
    }
}