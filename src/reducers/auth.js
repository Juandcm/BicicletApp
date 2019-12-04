import {SET_CURRENT_USER,SET_CODGIO_ENVIADO} from '../actions/auth';
import isEmpty from 'lodash/isEmpty'
const initialState={
    isAuthenticated:false,
    user:{},
    codigo:{},
    sesionGoogle:''
}

export default (state=initialState, action)=>{
    switch(action.type){
        case SET_CURRENT_USER:
            return{
                isAuthenticated: !isEmpty(action.user),
                user:action.user
            } 
            case SET_CODGIO_ENVIADO:
            return{
                isAuthenticated: false,
                codigo:action.codigo
            }
        default: return state
    }
}