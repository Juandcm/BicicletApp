import { SET_BANCOS, SET_SERVICIOS,SET_TIPO_SERVICIO } from "../../actions/mensajeria/pagoservicios";
const initialState = {
    databancos: {},
    dataservicios: {},
    servicioseleccionado: {}
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_BANCOS:
            return {
                databancos: action.databancos
            };
        case SET_SERVICIOS:
            return {
                dataservicios: action.dataservicios
            };
        case SET_TIPO_SERVICIO:
            return {
                servicioseleccionado: action.servicioseleccionado
            };

        default:
            return state;
    }
};
