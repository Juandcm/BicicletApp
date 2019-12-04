import { SET_FIELD, VALIDATE_FORM, ADD_ADDITIONAL_ELEMENT, REMOVE_ADDITIONAL_ELEMENT, SET_MAX_DESTINY, SET_ROUNDTRIP, SET_FORMIK_PROPS } from '../../actions/mensajeria/enviaralgo';
const initialState = {
  nombre_emisor: '',
  numero_contacto: '',
  instrucciones: '',
  tabIndex: 0,
  infoAdicional: '',
  fragil: false,
  pesoPaquete: '',
  tipoVehiculo: '',
  activeSchelude: 'yoprogramo',
  fechaEnvio: '',
  horaEnvio: '',
  metodoPago: 'efectivo',
  formValidation: false,
  additionalElements: [],
  maxDestiny: false,
  roundTrip: false,
  formikProps:{}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_FIELD:
      return {
        ...state,
        [action.field]: action.value
      }
    case VALIDATE_FORM:
      return {
        ...state,
        formValidation: action.value
      }
    case ADD_ADDITIONAL_ELEMENT:
      return {
        ...state,
        additionalElements: [
          ...state.additionalElements,
          {
            id: action.id
          }]
      }
    case REMOVE_ADDITIONAL_ELEMENT: {
      let { id } = action;

      switch (id) {
        case 'destino1':
          if (Object.keys(state.additionalElements).length === 1) {
            let newElements = state.additionalElements.filter(
              element => element.id != id
            );
            return {
              ...state,
              additionalElements: newElements,
            }
          } else {
            let destino1copia = state.additionalElements.filter(
              element => element.id == id
            )[0];

            function editLocation(elements, edits, id) {
              Object.assign(elements.find(o => o.id === id), edits);
              return elements;
            }
            let prevElements = state.additionalElements.filter(element => element.id != id);
            let edits = {
              id
            };
            let newElements = editLocation(prevElements, edits, 'destino2');

            // let destino2=state.destino2;
            // destino2.id='destino1';

            return {
              ...state,
              additionalElements: newElements
            }
          }

        case 'destino2':
          let newElements = state.additionalElements.filter(
            element => element.id != id
          );
          return {
            ...state,
            additionalElements: newElements,
          }

        default:
          return {
            ...state
          }
      }
    }

    case SET_MAX_DESTINY:
      return {
        ...state,
        maxDestiny: action.value
      }
    case SET_ROUNDTRIP:
      return {
        ...state,
        roundTrip: action.value
      }
    case SET_FORMIK_PROPS:
      return {
        ...state,
        formikProps: action.props
      }

    default: return state
  }
}