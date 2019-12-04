import axios from 'axios';
import stringify from 'qs-stringify'
import { BASE_URL } from "../../config/URLs";
export const SET_PRODUCTS = "[PRODUCTS] Se establecieron los productos";
export const SET_CATEGORYPRODUCTS = "[CATEGORYPRODUCTS] Se establecio las categorias de los productos";
export const FETCH_PRODUCTS = '[CarritoConveniencia] Se establecieron los productos';
export const ADD_TO_CART = '[CarritoConveniencia]  Agregado al carrito';
export const REMOVE_FROM_CART = '[CarritoConveniencia] Eliminado del carrito';
export const ADD_ORDER = '[CarritoConveniencia] Agregada la orden';
export const EMPTY_CART = '[CarritoConveniencia] Carrito vacio';
export const ADD_PRODUCTS_CART = "[PRODUCTS] Se agrego el producto al carrito";
export const SEARCH_PRODUCTS = "[PRODUCTS] Busqueda de productos"
export const SEARCH_PRODUCTS_CATEGORY = "[CATEGORY] Busqueda de productos por categorias"

export const addToCart = (item) => dispatch => {
  dispatch({
    type: ADD_TO_CART,
    payload: item
  })
}


export const removeItem = (item) => dispatch => {
  // console.log(item)
  dispatch({
    type: REMOVE_FROM_CART,
    payload: item
  })
}

export const emptyCart = () => dispatch => {
  dispatch({
    type: EMPTY_CART
  })
}


export const addOrder = (data) => dispatch => {
  dispatch({
    type: ADD_ORDER,
    payload: data
  })
}

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
        responseJson = response.data.data
        dispatch(setCategoryProducts(responseJson));
      } else {
        throw new Error("No se pudo actualizar la boleteria");
      }

    })
  }
}

export const getProducts = () => {
  return (dispatch, getState) => {
    let state = getState();

    return axios({
      method: 'post',
      url: `${BASE_URL}getalcoholproductsall`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    }).then(function (response) {
      if (response.data.status === true) {

        responseJson = response.data.data.map(item => {
          item.isSelect = false;
          item.selectedClass = null;
          return item;
        });
        dispatch(setProducts(responseJson));


        // if (state.carritoconveniencia.cart.length >= 1) {
        //     state.carritoconveniencia.cart.map((item) => {
        //       dispatch(agregarProductsLista(item))
        //     })
        // }


      } else {
        throw new Error("No se pudo actualizar la boleteria");
      }

    })
  }
}


export const agregarProductsLista = (item) => {
  return (dispatch, getState) => {
    let state = getState();
    item.isSelect = true;
    item.selectedClass = {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1.5,
      },
      shadowOpacity: 1.15,
      shadowRadius: 2.5,
      elevation: 3,
    };
    const index = state.carritoconveniencia.dataproducts.findIndex(
      i => item.product_id === i.product_id
    );
    state.carritoconveniencia.dataproducts[index] = item;
    dispatch(setProducts(state.carritoconveniencia.dataproducts));

  };
}

export const quitarProductsListaCart = (item) => {

  return (dispatch, getState) => {
    let state = getState();
    item.isSelect = false;
    item.selectedClass = null;
    const index = state.carritoconveniencia.dataproducts.findIndex(
      i => item.product_id === i.product_id
    );
    state.carritoconveniencia.dataproducts[index] = item;
    dispatch(setProducts(state.carritoconveniencia.dataproducts));

  };
}

export const buscarPalabra = (textobuscar) => dispatch => {
  dispatch({
    type: SEARCH_PRODUCTS,
    textobuscar
  })
}


export const buscarPorCategoria = (textobuscar) => dispatch => {
  dispatch({
    type: SEARCH_PRODUCTS_CATEGORY,
    textobuscar
  })
}
