export const SET_FIELD = "[EnviarAlgoForm] Se ha actualizado un campo";
export const VALIDATE_FORM = "[EnviarAlgoForm] Se ha validado el formulario";
export const ADD_ADDITIONAL_ELEMENT = "[EnviarAlgoForm] Se ha añadido un destino adicional"
export const REMOVE_ADDITIONAL_ELEMENT = "[EnviarAlgoForm] Se ha removido un destino adicional"
export const SET_MAX_DESTINY = "[EnviarAlgoForm] Se ha modificado el limite máximo de destinos"
export const SET_ROUNDTRIP = "[EnviarAlgoForm] Se ha modificado el roundtrip"
export const SET_FORMIK_PROPS = "[EnviarAlgoForm] Se han inicializado las props de formik"
export function setFieldValue(value,field) {
    return {
        type: SET_FIELD,
        value,
        field
    };
}

export function validateForm(value){
    return {
        type:VALIDATE_FORM,
        value
    }
}


export function addAdditionalElement(id){
    return {
        type:ADD_ADDITIONAL_ELEMENT,
        id
    }
}
export function removeAdditionalElement(id){
    return {
        type:REMOVE_ADDITIONAL_ELEMENT,
        id
    }
}
export function setMaxDestiny(value){
    return {
        type:SET_MAX_DESTINY,
        value
    }
}
export function setRoundTrip(value){
    return {
        type:SET_ROUNDTRIP,
        value
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
        
        if(state.enviaralgo.formikProps.values !== props.values && state.enviaralgo.formikProps.errors !== props.errors ||
            state.enviaralgo.formikProps.values == props.values && state.enviaralgo.formikProps.errors !== props.errors
            
            ){
            dispatch(setFormikProps(props));
        } else{
            return null
        }
        
    }
}

export const handleFieldChange=(value,field)=>{
    return dispatch =>{
        dispatch(setFieldValue(value,field));
    }
  }