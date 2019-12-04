import {
  SET_LOCATION,
  SET_ORIGEN,
  SET_DESTINO,
  SET_DESTINO1,
  SET_DESTINO2,
  DELETE_LOCATION,
  SET_DISTANCE,
  SET_ACTUAL_LOCATION,
  SET_MARKER,
  REMOVE_MARKER,
  EDIT_MARKER,
  SET_POINT_PLACE,
  DELETE_POINT_PLACE,
  REGION_CHANGE,
  SET_ROUTES_COORDINATES,
  SET_FULL_MARKER,
  SET_SELECTED_POINT,
  SET_ACTIVE_MAP
} from "../actions/map";
import {round} from 'lodash';
const initialState = {
  ultimaLocacion: {},
  origen: "",
  destino: "",
  destino1: "",
  destino2: "",
  distance: '',
  duration:'',
  region: {
    latitude: 14.081385,
    longitude: -87.197639,
    latitudeDelta: 0.003,
    longitudeDelta: 0.003
  },
  markers: [],
  polylineCoordinates: [],
  selectedPoint: {},
  activeMap: ""
};

const map = (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTED_POINT:
      return {
        ...state,
        selectedPoint: {
          id: action.id,
          place_name: action.place_name,
          latitude: action.latitude,
          longitude: action.longitude
        },
        destino: action.place_name,
        region:{...state.region,latitude:action.latitude,longitude:action.longitude}
      };

    case SET_POINT_PLACE:
      return {
        ...state,
        [action.id]: action.place_name
      };
    case DELETE_POINT_PLACE:
      return {
        ...state,
        [action.id]: ""
      };
    case SET_ACTIVE_MAP:
      if (action.resetState) {
        let resetState = { ...initialState, activeMap: action.mapId };
        return resetState;
      } else{
        return {
          ...state,
          activeMap:action.mapId
        }
      }

    case SET_ORIGEN:
      return {
        ...state,
        origen: action.place_name
      };
    case SET_DESTINO:
      return {
        ...state,
        destino: action.place_name
      };
    case SET_DESTINO1:
      return {
        ...state,
        destino1: {
          id: action.id,
          nombre: action.nombre,
          latitud: action.latitud,
          longitud: action.longitud
        }
      };
    case SET_DESTINO2:
      return {
        ...state,
        destino2: {
          id: action.id,
          nombre: action.nombre,
          latitud: action.latitud,
          longitud: action.longitud
        }
      };

    case DELETE_LOCATION:
      switch (action.id) {
        case "destino1":
          if (Object.keys(state.destino2).length === 0) {
            return {
              ...state,
              destino1: {},
              ultimaLocacion: state.destino
            };
          } else {
            let destino2 = state.destino2;
            destino2.id = "destino1";

            return {
              ...state,
              destino1: destino2,
              ultimaLocacion: state.destino,
              destino2: {}
            };
          }

        case "destino2":
          return {
            ...state,
            destino2: {},
            ultimaLocacion: state.destino
          };

        default:
          break;
      }
      return state.filter(location => location.id !== action.id);

    case SET_DISTANCE:
      return {
        ...state,
        distancia: action.distance
      };

    case SET_ACTUAL_LOCATION:
      return {
        ...state,
        region: {
          latitude: action.latitude,
          longitude: action.longitude,
          latitudeDelta: 0.003,
          longitudeDelta: 0.003
        }
      };

    case SET_MARKER:
      return {
        ...state,
        markers: [
          ...state.markers,
          {
            id: action.id,
            coordinate: action.coordinate,
            key: new Date().getUTCMilliseconds()
          }
        ]
      };
    case SET_FULL_MARKER:
      return {
        ...state,
        markers: [
          ...state.markers,
          {
            id: action.id,
            place_name: action.place_name,
            coordinate: action.coordinate,
            key: new Date().getUTCMilliseconds()
          }
        ],
        [action.id]: action.place_name,
        region:{...state.region,latitude:action.coordinate.latitude,longitude:action.coordinate.longitude}
      };
    case REGION_CHANGE:
      return {
        ...state,
        region: action.region
      };
    case REMOVE_MARKER: {
      let { id } = action;

      switch (id) {
        case "destino1":
          if (Object.keys(state.destino2).length === 0) {
            let nuevosMarkers = state.markers.filter(
              element => element.id != id
            );
            return {
              ...state,
              markers: nuevosMarkers,
              destino1: ""
            };
          } else {
            let destino1copia = state.markers.filter(
              element => element.id == id
            )[0];

            function editLocation(markers, edits, id) {
              Object.assign(
                markers.find(o => o.id === id),
                edits
              );
              return markers;
            }
            let prevMarkers2 = state.markers.filter(
              element => element.id != id
            );
            let edits = {
              id
            };
            let newMarkers2 = editLocation(prevMarkers2, edits, "destino2");

            // let destino2=state.destino2;
            // destino2.id='destino1';

            return {
              ...state,
              markers: newMarkers2,
              destino1: state.destino2,
              destino2: ""
            };
          }

        case "destino2":
          let nuevosMarkers = state.markers.filter(element => element.id != id);
          return {
            ...state,
            markers: nuevosMarkers,
            destino2: ""
          };

        default:
          return {
            ...state
          };
      }
    }

    case EDIT_MARKER:
      let { id, place_name, coordinate } = action;
      // let coordenadas = state.markers.filter((marker) =>(marker.id == id))[0].coordinate;
      function editLocation(markers, edits, id) {
        for (let index = 1; index <= state.markers.length; index++) {
          Object.assign(
            markers.find(o => o.id === id),
            edits
          );
        }
        return markers;
      }
      var prevMarkers = state.markers;
      let edits = {
        place_name,
        coordinate
      };
      var newMarkers = editLocation(prevMarkers, edits, id);
      return {
        ...state,
        markers: newMarkers.slice(),
        [id]: place_name,
        region:{...state.region,latitude:action.coordinate.latitude,longitude:action.coordinate.longitude}
      };

    case SET_ROUTES_COORDINATES:
      return {
        ...state,
        polylineCoordinates: action.coordinates, 
        distance:Number((action.distance / 1000).toFixed(1)),
        duration:parseInt(action.duration / 60)
      };

    default:
      return state;
  }
};

export default map;