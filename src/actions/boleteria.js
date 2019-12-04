import axios from 'axios';
import stringify from 'qs-stringify'
import { BASE_URL } from "../config/URLs";
export const SET_BOLETERIA = "[Boleteria] Se establecio la boleteria";
// export const LOADING_BOLETERIA = "[Boleteria] Se esta cargando la boleteria";

export const setBoleteria=(databoleteria)=>{
  return({
    type:SET_BOLETERIA,
    isLoading:false,
    databoleteria
  })
}


// export const boleteriaRequest = () => {
//    return({
//     type:LOADING_BOLETERIA,
//     isLoading:true
//   }) 
// }

export const getBoleteria = ()=>{
    return (dispatch)=>{
      // dispatch(boleteriaRequest());
        return axios({
            method: 'post',
            url: `${BASE_URL}getboleterialist`,
            headers : {
              'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
          }
          }).then(function(response){
            if (response.data.status === true) {
                // console.log("respuesta desde el action: "+response.data);
                dispatch(setBoleteria(response.data));
            } else {
                throw new Error("No se pudo actualizar la boleteria");
            }
            
          })
    }
}