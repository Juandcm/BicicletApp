import { SET_HISTORY} from "../actions/history";

const initialState = {
  ordenesCompletadas: []
};

const history = (state = initialState, action) => {
  switch (action.type) {
    
    case SET_HISTORY:
      return {
        ...state,
        ordenesCompletadas: [
          ...state.ordenesCompletadas,
          {
            id: action.id,
            origen_address:action.origen,
            destino_address:action.destino,
            destino1_address:action.destino1,
            destino2_address:action.destino2,
            orderType:action.tipoOrden,
            orderDate:action.date,
            orderTime:action.time,
            orderId:action.ordenId
          }
        ]
      };

    default:
      return state;
  }
};

export default history;
