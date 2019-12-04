import axios from 'axios';
import stringify from 'qs-stringify'
import { BASE_URL } from "../../config/URLs";
export const SET_BANCOS = "[Bancos] Se establecio bancos";
export const SET_SERVICIOS = "[Servicios] Se establecio servicios";
export const SET_TIPO_SERVICIO = "[Servicios] Seleccionado el tipo de servicio";


export const setBancos=(databancos)=>{
  return({
    type:SET_BANCOS,
    isLoading:false,
    databancos
  })
}

export const selecTipoServicio = (servicioseleccionado) => dispatch => {
  dispatch({
    type: SET_TIPO_SERVICIO,
    servicioseleccionado
  })
}




export const setServicios=(dataservicios)=>{
    return({
      type:SET_SERVICIOS,
      isLoading:false,
      dataservicios
    })
  }
//   Esto me trae todos los bancos
//   http://localhost/dito/index.php/Apis/getbanklist
  
//   Esto me trae todos los servicios
//   http://localhost/dito/index.php/Apis/getservicelist

export const getBancos = ()=>{
    return (dispatch)=>{
      // dispatch(boleteriaRequest());
        return axios({
            method: 'post',
            url: `${BASE_URL}getbanklist`,
            headers : {
              'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
          }
          }).then(function(response){
            if (response.data.status === true) {
                // console.log("respuesta desde el action: "+response.data);
                dispatch(setBancos(response.data));
            } else {
                throw new Error("No se pudo actualizar la boleteria");
            }
            
          })
    }
}

export const getServicios = ()=>{
    return (dispatch)=>{
      // dispatch(boleteriaRequest());
        return axios({
            method: 'post',
            url: `${BASE_URL}getservicelist`,
            headers : {
              'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
          }
          }).then(function(response){
            if (response.data.status === true) {
                // console.log("respuesta desde el action: "+response.data);
                dispatch(setServicios(response.data));
            } else {
                throw new Error("No se pudo actualizar la boleteria");
            }
            
          })
    }
}