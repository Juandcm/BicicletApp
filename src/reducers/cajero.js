import {SET_CREDIT_TARJ_USER} from '../actions/cajero';
const initialState={
    tarjetasusuario:{},
}

export default (state=initialState, action)=>{
    switch(action.type){
        case SET_CREDIT_TARJ_USER:
            return{
                tarjetasusuario:action.tarjetasusuario
            } 
            // case SET_CODGIO_ENVIADO:
            // return{
            //     isAuthenticated: false,
            //     codigo:action.codigo
            // }
        default: return state
    }
}