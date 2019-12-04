export const VALIDATE_FORM = "[TransporteForm] Se ha validado el formulario";
export const ADD_ADDITIONAL_ELEMENT = "[TransporteForm] Se ha añadido un destino adicional"
export const REMOVE_ADDITIONAL_ELEMENT = "[TransporteForm] Se ha removido un destino adicional"
export const SET_MAX_DESTINY = "[TransporteForm] Se ha modificado el limite máximo de destinos"
export const SET_ROUNDTRIP = "[TransporteForm] Se ha modificado el roundtrip"
export const SET_FORMIK_PROPS = "[TransporteForm] Se han inicializado las props de formik"
export const SET_ACTIVE_KEYBOARD = "[TransporteForm] Se ha setteado a activo el status del keyboard"
export const REMOVE_ACTIVE_KEYBOARD = "[TransporteForm] Se ha removido el status activo del keyboard"


export function validateForm(value){
    return {
        type:VALIDATE_FORM,
        value
    }
}

export function setActiveKeyboard(keyboardHeight){
    return {
        type:SET_ACTIVE_KEYBOARD,
        keyboardHeight
    }
}
export function removeActiveKeyboard(){
    return {
        type:REMOVE_ACTIVE_KEYBOARD
    }
}


export function setFormikProps(props){
    return {
        type:SET_FORMIK_PROPS,
        props
    }
}
export function checkFormikProps(props){
    
    return (dispatch,getState) =>{
        let state=getState();
        
        if(state.transporte.formikProps.values !== props.values && state.transporte.formikProps.errors !== props.errors ||
            state.transporte.formikProps.values == props.values && state.transporte.formikProps.errors !== props.errors
            
            ){
            dispatch(setFormikProps(props));
        } else{
            return null
        }
        
    }
}