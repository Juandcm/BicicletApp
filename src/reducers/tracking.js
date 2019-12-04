import {
  SET_RUTAS,
  SET_ORDEN_INFO,
  SET_SELECTED_ORDEN,
  GET_DRIVER_LOCATION
} from "../actions/tracking";

const initialState = {
  ordenesRutas: [],
  ordenesInfo: [],
  selectedOrden: ""
};

const tracking = (state = initialState, action) => {
  switch (action.type) {
    case SET_RUTAS:
      return {
        ...state,
        ordenesRutas: [
          ...state.ordenesRutas,
          {
            id: action.id,
            rutas: action.rutas
          }
        ]
      };
    case SET_ORDEN_INFO:
      return {
        ...state,
        ordenesInfo: [
          ...state.ordenesInfo,
          {
            id: action.id,
            origen_address: action.origen,
            destino_address: action.destino,
            destino1_address: action.destino1,
            destino2_address: action.destino2,
            ordenId:action.ordenid,
            round: action.round,
            date: action.date,
            time: action.time,
            status: action.status,
            driverName: action.driverName,
            driverNum: action.driverNum,
            driverLat: action.driverLat,
            driverLon: action.driverLon,
            driverId: action.driverId,
            driverPhoto:action.driverPhoto
          }
        ]
      };
    case SET_SELECTED_ORDEN:
      return {
        ...state,
        selectedOrden: action.id
      };
    case GET_DRIVER_LOCATION:
      let {longitud,latitud,id,ordenid}=action;
      function editLocation(ordenes,edits,id,ordenid){
        
        let conductoresActivos=ordenes.filter((o)=>(o.driverId === id.driver_id)).length;
        for (let index = 1; index <= conductoresActivos; index++) {
          Object.assign(ordenes.find(o => (o.id === ordenid)),edits);
        }
        return ordenes;
        
      }
      var prevOrdenes =state.ordenesInfo;
      let edits= {
          driverLat: latitud,
          driverLon: longitud
        }
      var newOrdenes=editLocation(prevOrdenes,edits,id,ordenid);
      return {
        ...state,
        ordenesInfo:newOrdenes
      };

    default:
      return state;
  }
};

export default tracking;
