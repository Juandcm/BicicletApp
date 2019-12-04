import axios from "axios";
import stringify from "qs-stringify";
import { BASE_URL } from "../../config/URLs";
import { isEmpty } from "lodash";
import { editMarker, handleMapRoutes, setFullMarker,setSelectedPoint} from "../map";
export const ADD_ADDITIONAL_ADDRESS =
  "[DireccionesForm] Se ha añadido  una dirección adicional";
export const REMOVE_ADDITIONAL_ADDRESS =
  "[DireccionesForm] Se ha removido  una dirección adicional";
export const FETCH_FAV_ADDRESS =
  "[DireccionesForm] Se ha buscado las direcciones favoritas";
export const SET_FAV_ADDRESSES =
  "[DireccionesForm] Se han setteado las direcciones favoritas";
export const SET_ADDRESS_FIELD =
  "[DireccionesForm] Se han setteado los campos de la dirección favorita";
("[DireccionesForm] Se han setteado las direcciones favoritas");
export const SET_FAV_ADDRESS =
  "[DireccionesForm] Se han setteado la dirección favorita";
export const RESET_SELECTED_FAV_ADDRESS =
  "[DireccionesForm] Se ha reseteado la dirección favorita seleccionada, es diferente a la direccion de destino";

export function setFieldValue(value, field) {
  return {
    type: SET_FIELD,
    value,
    field
  };
}

export function addAdditionalAddress(id, userId) {
  return {
    type: ADD_ADDITIONAL_ADDRESS,
    id,
    userId
  };
}
export function removeAdditionalAddress(id) {
  return {
    type: REMOVE_ADDITIONAL_ADDRESS,
    id
  };
}
export function setFavAddress(favAddress, id) {
  return {
    type: SET_FAV_ADDRESS,
    favAddress,
    id
  };
}

export function removeFavAddress(id) {
  return (dispatch, getState) => {
    let state = getState();
    let prevFavAddresses = state.direccionesfavoritas.prevFavAddresses;
    const foundAddress = prevFavAddresses.find(o => o.id === id);
    dispatch(removeAdditionalAddress(id));
    if (typeof foundAddress !== "undefined") {
      let data = {
        id: id
      };
      return axios({
        method: "post",
        url: `${BASE_URL}remove_fav_addr`,
        data: stringify(data),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
        }
      }).then(function(response, resolve) {
        if (response.data.status === true) {
        } else {
          throw new Error("Error");
        }
      });
    }
  };
}

export function resetSelectedFavAddress() {
  return {
    type: RESET_SELECTED_FAV_ADDRESS
  };
}

export function selectFavAddress(id) {
  return (dispatch, getState) => {
    let state = getState();
    let actualFavAddresess = state.direccionesfavoritas.favAddresses;
    let selectedFavAddress = state.direccionesfavoritas.selectedFavAddress;
    const selectedFavAddressObject = actualFavAddresess.find(o => o.id === id);
    if (selectedFavAddress.id !== selectedFavAddressObject.id) {
      dispatch(
        setFavAddress(selectedFavAddressObject, selectedFavAddressObject.id)
      );
    }
  };
}

export function updateFavAddress(id, mapType) {
  return (dispatch, getState) => {
    let state = getState();
    let prevFavAddresses = state.direccionesfavoritas.prevFavAddresses;
    let actualFavAddresess = state.direccionesfavoritas.favAddresses;
    let selectedFavAddress = state.direccionesfavoritas.selectedFavAddress;
    if (!isEmpty(selectedFavAddress)) {
      if (mapType == "markers") {
        let markers = state.map.markers;
        let actualMarker = markers.find(marker => marker.id === id);
        if (isEmpty(actualMarker)) {
          let place_name = selectedFavAddress.favorite_addr;
          let coordinate = {
            latitude: parseFloat(selectedFavAddress.latitude),
            longitude: parseFloat(selectedFavAddress.longitude)
          };
          dispatch(setFullMarker(id, place_name, coordinate));
          dispatch(handleMapRoutes());
        } else {
          if (!isEmpty(actualMarker)) {
            let place_name = selectedFavAddress.favorite_addr;
            let coordinate = {
              latitude: parseFloat(selectedFavAddress.latitude),
              longitude: parseFloat(selectedFavAddress.longitude)
            };
            dispatch(editMarker(id, place_name, coordinate));
            dispatch(handleMapRoutes());
          }
        }
      } else{
        if(mapType == 'point'){
          dispatch(setSelectedPoint(selectedFavAddress.favorite_addr,parseFloat(selectedFavAddress.latitude),parseFloat(selectedFavAddress.longitude)));
        }
      }
    }
    const newAddresses = actualFavAddresess.filter((element, index) =>
      typeof prevFavAddresses[index] !== "undefined"
        ? element.id !== prevFavAddresses[index].id
        : element
    );
    const modifiedAddresses = actualFavAddresess.filter((element, index) =>
      typeof prevFavAddresses[index] !== "undefined"
        ? element.name !== prevFavAddresses[index].name ||
          element.favorite_addr !== prevFavAddresses[index].favorite_addr
        : false
    );
    let data = {
      new_addresses: newAddresses,
      modified_addresses: modifiedAddresses
    };
    if (!isEmpty(newAddresses) || !isEmpty(modifiedAddresses)) {
      return axios({
        method: "post",
        url: `${BASE_URL}set_fav_addr`,
        data: stringify(data),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
        }
      }).then(function(response, resolve) {
        if (response.data.status === true) {
          return true;
        } else {
          throw new Error("Error");
        }
      });
    }
    return new Promise((resolve, reject) => {
      resolve(null);
    });

    // const newAddresses = actualFavAddresess.map((element,index) =>{
    //   let newArray=[]
    //   if(element.id !== prevFavAddresses[index].id){
    //     newArray=[...newArray,element];
    //   }
    //   return newArray;
    // }) ;
    // console.log(newAddresses[0]);

    // const intersection = actualFavAddresess.map((element,index) =>{
    //   let newArray=[]
    //   if(element.id !== prevFavAddresses[index].id || element.name !==revFavAddresses[index].name || element.latitude !==revFavAddresses[index].latitude || element.favorite_addr !==revFavAddresses[index].favorite_addr ){
    //     newArray=[...newArray,element];
    //   }
    //   return newArray;
    // }) ;
  };
}

export function setFavAddresses(addresses) {
  return {
    type: SET_FAV_ADDRESSES,
    addresses
  };
}
export function fetchFavAddress(id) {
  let data = {
    user_id: id
  };
  return dispatch => {
    return axios({
      method: "post",
      url: `${BASE_URL}getFavAddrs`,
      data: stringify(data),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
      }
    })
      .then(function(response) {
        if (response.data.status === true) {
          dispatch(setFavAddresses(response.data.data));
        } else {
          throw new Error("Error");
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
}
export function setFavAddressName(id, name) {
  return {
    type: SET_ADDRESS_FIELD,
    id,
    name
  };
}
export function setNewFavAddress(id, longitude, latitude, favoriteAddress) {
  return {
    type: SET_ADDRESS_FIELD,
    id,
    longitude,
    latitude,
    favoriteAddress
  };
}
