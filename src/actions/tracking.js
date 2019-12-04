import axios from 'axios';
import stringify from 'qs-stringify'
export const SET_RUTAS = "[Tracking] Se establecieron las rutas de tracking";
export const SET_ORDEN_INFO = "[Tracking] Se estableció la informacion de las órdenes";
export const SET_SELECTED_ORDEN = "[Tracking] Se estableció la orden para el mapa";
export const GET_DRIVER_LOCATION = "[Tracking] Se estableció la ubicación del conductor";







export const setRutas = (id,ruta)=>{ 
  return ({
    type:SET_RUTAS,
    id:id,
    rutas:ruta
  })
}
export const setSelectedOrden = (id)=>{ 
  return ({
    type:SET_SELECTED_ORDEN,
    id:id
  })
}

export const setUbicacion=(id,longitud,latitud,ordenid)=>{
  return({
    type:GET_DRIVER_LOCATION,
    id,
    longitud,
    latitud,
    ordenid
  })
}

export const setOrdenInfo=(id,origen,destino,destino1,destino2,ordenid,round,date,time,status
  ,driverName,driverNum,driverLat,driverLon,driverId,driverPhoto)=>{
  if(driverId){
    return({
      type:SET_ORDEN_INFO,
      id:id,
      origen,
      destino,
      destino1,
      destino2,
      ordenid,
      round,
      date,
      time,
      status,
      driverName,
      driverNum,
      driverLat,
      driverLon,
      driverId,
      driverPhoto
  
    })
  } else{
    return({
      type:SET_ORDEN_INFO,
      id:id,
      origen,
      destino,
      destino1,
      destino2,
      ordenid,
      round,
      date,
      time,
      status,
      driverName:'',
      driverNum:'',
      driverLat:'',
      driverLon:'',
      driverId:false,
      driverPhoto:''
  
    })
  }
  
}



export const getRutas = (data)=>{
    return (dispatch)=>{
        return   axios({
            method: 'post',
            url: `${process.env.REACT_APP_BACKEND_URL}apis/get_order_details_app`,
            data:stringify(data),
            headers : {
              'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
          }
          }).then(function(response){
            if(response.data.status === true){
              response.data.data.map((orden,index)=>{
                let rutas=[];
                let origen=orden.order_pick_cords.split(',');
                if(origen){
                 let nuevaRuta={
                    id:'origen',
                   latitud:Number(origen[1]),
                   longitud:Number(origen[0])
                 }
                 rutas.push(nuevaRuta);
                }
                
                let destino=orden.order_deli_cords.split(',');
                if(destino){
                  let nuevaRuta={
                    id:'destino',
                   latitud:Number(destino[1]),
                   longitud:Number(destino[0])
                 }
                 rutas.push(nuevaRuta);
                }
                let destino1=orden.order_deli2_cords.split(',');
                if(destino1.length > 1){
                  let nuevaRuta={
                    id:'destino1',
                   latitud:Number(destino1[1]),
                   longitud:Number(destino1[0])
                 }
                 rutas.push(nuevaRuta);
                }

                let destino2=orden.order_deli3_cords.split(',');
                if(destino2.length > 1){
                  let nuevaRuta={
                    id:'destino2',
                   latitud:Number(destino2[1]),
                   longitud:Number(destino2[0])
                 }
                 rutas.push(nuevaRuta);
                }
                dispatch(setRutas(`orden${index+1}`,rutas));
                if(orden.order_roundtrip == 0){
                  var roundtrip=false
                } else{
                  var roundtrip=true
                }
                let fecha=orden.order_start_time.split('-');
               let date=fecha[0];
               let time=fecha[1]; 
                dispatch(setOrdenInfo(`orden${index+1}`,
                orden.order_pick_address,
                orden.order_deli_address,
                orden.order_deli2_address,
                orden.order_deli3_address,
                orden.order_id,
                roundtrip,
                date,
                time,
                orden.order_status,
                orden.driver_name,
                orden.driver_phone_num,
                orden.latitude,
                orden.longitude,
                orden.driver_id,
                orden.driver_photo
                ))
              })
            }
            
          })
    }
}


export const getUbicacion = (data,id)=>{
  return (dispatch)=>{
      return   axios({
          method: 'post',
          url: `${process.env.REACT_APP_BACKEND_URL}apis/get_driver_location`,
          data:stringify(data),
          headers : {
            'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
        }
        }).then(function(response){
          if(response.data.status === true){
            var longitud=Number(response.data.location_data.longitude);
            var latitud=Number(response.data.location_data.latitude);
            dispatch(setUbicacion(data,longitud,latitud,id));
          }
        })
  }
}


export const getSingleOrder = (data)=>{
  return (dispatch)=>{
      return   axios({
          method: 'post',
          url: `${process.env.REACT_APP_BACKEND_URL}apis/get_public_order_details_app`,
          data:stringify(data),
          headers : {
            'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
        }
        }).then(function(response){
          
          if(response.data.status === true){
          
            response.data.data.map((orden,index)=>{
              let rutas=[];
              let origen=orden.order_pick_cords.split(',');
              if(origen){
               let nuevaRuta={
                  id:'origen',
                 latitud:Number(origen[1]),
                 longitud:Number(origen[0])
               }
               rutas.push(nuevaRuta);
              }
              
              let destino=orden.order_deli_cords.split(',');
              if(destino){
                let nuevaRuta={
                  id:'destino',
                 latitud:Number(destino[1]),
                 longitud:Number(destino[0])
               }
               rutas.push(nuevaRuta);
              }
              let destino1=orden.order_deli2_cords.split(',');
              if(destino1.length > 1){
                let nuevaRuta={
                  id:'destino1',
                 latitud:Number(destino1[1]),
                 longitud:Number(destino1[0])
               }
               rutas.push(nuevaRuta);
              }

              let destino2=orden.order_deli3_cords.split(',');
              if(destino2.length > 1){
                let nuevaRuta={
                  id:'destino2',
                 latitud:Number(destino2[1]),
                 longitud:Number(destino2[0])
               }
               rutas.push(nuevaRuta);
              }
              dispatch(setRutas(`orden${index+1}`,rutas));
              if(orden.order_roundtrip == 0){
                var roundtrip=false
              } else{
                var roundtrip=true
              }
              let fecha=orden.order_start_time.split('-');
             let date=fecha[0];
             let time=fecha[1]; 
              dispatch(setOrdenInfo(`orden${index+1}`,
              orden.order_pick_address,
              orden.order_deli_address,
              orden.order_deli2_address,
              orden.order_deli3_address,
              orden.order_id,
              roundtrip,
              date,
              time,
              orden.order_status,
              orden.driver_name,
              orden.driver_phone_num,
              orden.latitude,
              orden.longitude,
              orden.driver_id,
              orden.driver_photo
              ))
            })
          }
           else{
             throw new Error('Algo salió mal con los datos ingresados.')
           }
        })
  }
}


