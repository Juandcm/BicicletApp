import { getLocation } from "./locationservice";
import axios from "axios";
import { REACT_APP_MAPBOX_TOKEN } from "../config/URLs";
export const SET_LOCATION = "[Map] Se eligió una locación";
export const SET_ORIGEN = "[Map] Se eligió el origen";
export const SET_DESTINO = "[Map] Se eligió el destino";
export const SET_DESTINO1 = "[Map] Se eligió el destino adicional 1";
export const SET_DESTINO2 = "[Map] Se eligió el destino adicional 2";
export const DELETE_LOCATION = "[Map] Se eliminó una locación";
export const SET_DISTANCE = "[Map] Se ha ajustado la distancia del viaje";
export const SET_ACTUAL_LOCATION =
  "[Map] Se eligió la locacion actual del usuario";
export const SET_MARKER = "[Map] Se eligió un marcador y se colocó en el mapa";
export const SET_FULL_MARKER = "[Map] Se eligió un marcador completamente";
export const REMOVE_MARKER = "[Map] Se eliminó un marcador";
export const EDIT_MARKER = "[Map] Se editó un marcador en base a los nuevos parametros";
export const SET_POINT_PLACE = "[Map] Se eligió el lugar de un punto";
export const DELETE_POINT_PLACE = "[Map] Se elimino el lugar de un punto";
export const REGION_CHANGE = "[Map] Se ha cambiado la región";
export const SET_ROUTES_COORDINATES =
  "[Map] Se eligió las coordenadas de la ruta";
export const SET_SELECTED_POINT="[Map] Se eligió el punto (Destino) para la entrega";
export const SET_ACTIVE_MAP= "[Map] Se eligió el mapa activo";

export const setSelectedPoint = (place_name, latitude, longitude) => {
  return {
    type: SET_SELECTED_POINT,
    place_name,
    latitude,
    longitude
  };
};

export const setDistance = distance => {
  return {
    type: SET_DISTANCE,
    distance: distance
  };
};

export const setPointName = (id, place_name) => {
  return {
    type: SET_POINT_PLACE,
    id,
    place_name
  };
};
export const deletePointName = id => {
  return {
    type: DELETE_POINT_PLACE,
    id
  };
};

export const setActiveMap= (mapId,resetState)=>{
  return {
    type:SET_ACTIVE_MAP,
    mapId,
    resetState
  }
}

export const setOrigen = place_name => {
  return {
    type: SET_ORIGEN,
    place_name
  };
};

export const setDestino = place_name => {
  return {
    type: SET_DESTINO,
    place_name
  };
};

export const setDestino1 = (id, place_name, latitud, longitud) => {
  return {
    type: SET_DESTINO1,
    id: id,
    nombre: place_name,
    latitud: latitud,
    longitud: longitud
  };
};
export const setDestino2 = (id, place_name, latitud, longitud) => {
  return {
    type: SET_DESTINO2,
    id: id,
    nombre: place_name,
    latitud: latitud,
    longitud: longitud
  };
};

export const deleteLocation = id => {
  return {
    type: DELETE_LOCATION,
    id: id
  };
};

export const setActualLocation = (latitude, longitude) => {
  return {
    type: SET_ACTUAL_LOCATION,
    latitude,
    longitude
  };
};
export const onRegionChange = region => {
  return {
    type: REGION_CHANGE,
    region
  };
};
export const setMarker = (id, coordinate) => {
  return {
    type: SET_MARKER,
    id,
    coordinate
  };
};

export const setFullMarker = (id,place_name,coordinate)=>{
  return {
    type: SET_FULL_MARKER,
    id,
    place_name,
    coordinate
  };
}


export const editMarker = (id, place_name,coordinate) => {
  return {
    type: EDIT_MARKER,
    id,
    place_name,
    coordinate
  };
};

export const removeMarker = id => {
  return {
    type: REMOVE_MARKER,
    id
  };
};


export const getActualLocation = () => {
  return dispatch => {
    getLocation().then(data => {
      dispatch(setActualLocation(data.latitude, data.longitude));
    });
  };
};

export const handleMapRoutes = () => {
  return (dispatch,getState) => {
    let state=getState();
    let routes=state.map.markers;
    let roundTrip=state.enviaralgo.roundTrip;
    let origen = routes.find(marker => marker.id == "origen");
    let destino = routes.find(marker => marker.id == "destino");
    let destino1 = routes.find(marker => marker.id == "destino1");
    let destino2 = routes.find(marker => marker.id == "destino2");
    if (routes.length == 2) {
      origen = origen.coordinate;
      destino = destino.coordinate;
      let url = `https://api.mapbox.com/optimized-trips/v1/mapbox/driving/${origen.longitude},${origen.latitude};${destino.longitude},${destino.latitude}?steps=true&roundtrip=${roundTrip}&source=first&destination=last&geometries=geojson&access_token=${REACT_APP_MAPBOX_TOKEN}`;
      axios
        .get(url)
        .then(function(res) {
          // handle success
          var data2 = res.data.trips[0];
          var routes2 = data2.geometry.coordinates.map(x => {
            return {
              latitude: x[1],
              longitude: x[0]
            };
          });
          dispatch(setRouteLineCoordinates(routes2,data2.distance,data2.duration));
          
        })
        .catch(function(error) {
          console.log(error);
        });
    } else {
      if (routes.length === 3) {
        origen = origen.coordinate;
        destino = destino.coordinate;
        destino1 = destino1.coordinate;
        let url = `https://api.mapbox.com/optimized-trips/v1/mapbox/driving/${origen.longitude},${origen.latitude};${destino.longitude},${destino.latitude};${destino1.longitude},${destino1.latitude}?steps=true&roundtrip=${roundTrip}&source=first&destination=last&geometries=geojson&access_token=${REACT_APP_MAPBOX_TOKEN}`;
        axios
          .get(url)
          .then(function(res) {
            // handle success
            var data2 = res.data.trips[0];
            var routes2 = data2.geometry.coordinates.map(x => {
              return {
                latitude: x[1],
                longitude: x[0]
              };
            });

            dispatch(setRouteLineCoordinates(routes2,data2.distance,data2.duration));
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
        if (routes.length === 4) {
          origen = origen.coordinate;
          destino = destino.coordinate;
          destino1 = destino1.coordinate;
          destino2 = destino2.coordinate;
          let url = `https://api.mapbox.com/optimized-trips/v1/mapbox/driving/${origen.longitude},${origen.latitude};${destino.longitude},${destino.latitude};${destino1.longitude},${destino1.latitude};${destino2.longitude},${destino2.latitude}?steps=true&roundtrip=${roundTrip}&source=first&destination=last&geometries=geojson&access_token=${REACT_APP_MAPBOX_TOKEN}`;
          axios
            .get(url)
            .then(function(res) {
              // handle success
              var data2 = res.data.trips[0];
              var routes2 = data2.geometry.coordinates.map(x => {
                return {
                  latitude: x[1],
                  longitude: x[0]
                };
              });
  
              dispatch(setRouteLineCoordinates(routes2,data2.distance,data2.duration));
            })
            .catch(function(error) {
              console.log(error);
            });
        }
      }
    }
  };
};

export const setRouteLineCoordinates = (coordinates,distance,duration) => {
  return {
    type: SET_ROUTES_COORDINATES,
    coordinates,
    distance,
    duration
  };
};