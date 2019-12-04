import axios from 'axios';
import stringify from 'qs-stringify'
import { BASE_URL } from "../config/URLs";
export const SET_PRODUCTS = "[PRODUCTS] Se establecieron los productos";
export const SET_CATEGORYPRODUCTS = "[CATEGORYPRODUCTS] Se establecio las categorias de los productos";
// export const LOADING_BOLETERIA = "[Boleteria] Se esta cargando la boleteria";

export const setProducts = (dataproducts) => {
  return ({
    type: SET_PRODUCTS,
    isLoading: false,
    dataproducts
  })
}

export const setCategoryProducts = (datacategoryproducts) => {
  return ({
    type: SET_CATEGORYPRODUCTS,
    isLoading: false,
    datacategoryproducts
  })
}

// Esto es para las categorias de los productos
// http://localhost/dito/index.php/Apis/getalcohollist

// Esto es para los productos
// getalcoholproductsall

export const getCategoryProducts = () => {
  return (dispatch) => {
    // dispatch(boleteriaRequest());
    return axios({
      method: 'post',
      url: `${BASE_URL}getalcohollist`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    }).then(function (response) {
      if (response.data.status === true) {
        // console.log("respuesta desde el action: "+response.data);
        dispatch(setCategoryProducts(response.data));
      } else {
        throw new Error("No se pudo actualizar la boleteria");
      }

    })
  }
}

export const getProducts = () => {
  return (dispatch) => {
    // dispatch(boleteriaRequest());
    return axios({
      method: 'post',
      url: `${BASE_URL}getalcoholproductsall`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    }).then(function (response) {
      // console.log('response: ',response)
      if (response.data.status === true) {
        responseJson = response.data.data.map(item => {
          item.isSelect = false;
          item.selectedClass = null;
          return item;
        });
        dispatch(setProducts(responseJson));
      } else {
        throw new Error("No se pudo actualizar la boleteria");
      }

    })
  }
}