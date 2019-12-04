import axios from 'axios';
import stringify from 'qs-stringify'
export const SET_HISTORY = "[History] Se establecieron las ordenes completadas";



export const setHistory=(id,origen,destino,destino1,destino2,tipoOrden,date,time,ordenId)=>{
  return({
    type:SET_HISTORY,
    id:id,
    origen,
    destino,
    destino1,
    destino2,
    tipoOrden,
    date,
    time,
    ordenId
  })
}

export const getHistory = (data)=>{
    return (dispatch)=>{
        return   axios({
            method: 'post',
            url: `${process.env.REACT_APP_BACKEND_URL}apis/get_user_completed_orders`,
            data:stringify(data),
            headers : {
              'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
          }
          }).then(function(response){
            
            if(response.data.status === true){
            
            // console.log(response.data.data);
              response.data.data.reverse().map((orden,index)=>{
                if(orden.order_type =='mensajeria'){
                    var tipoOrden='Envío de Paquetes'
                }
               let fecha=orden.order_end_time.split('-');
               let date=fecha[0];
               let time=fecha[1]; 
                dispatch(setHistory(`orden${index+1}`,
                orden.order_pick_address,
                orden.order_deli_address,
                orden.order_deli2_address,
                orden.order_deli3_address,
                tipoOrden,
                date,
                time,
                orden.order_id
                ))
              })
            } 
            
          })
    }
}


export const getDeltingIds = (data)=>{
  return (dispatch)=>{
      return   axios({
          method: 'post',
          url: `${process.env.REACT_APP_BACKEND_URL}apis/hide_user_completed_orders`,
          data:stringify(data),
          headers : {
            'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
        }
        }).then(function(response){
          
          if(response.data.status === true){
            // console.log(response.data)
          } 
          
        }).catch((error)=>{
          console.log(error);
        })
  }
}


