import { SET_PRODUCTS, SET_CATEGORYPRODUCTS, ADD_TO_CART, EMPTY_CART, REMOVE_FROM_CART, SEARCH_PRODUCTS } from '../../actions/conveniencia/carritoconveniencia';


const initialState = {
    cart: [],
    ivatotal: 0,
    totalsiniva: 0,
    total: 0,
    dataproducts: {},
    datacategoryproducts: {},
    dataproductcopy: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_TO_CART:
            precio = action.payload.product_price
            preciototal = parseFloat(precio.replace(',', ''));
            fee = parseFloat(action.payload.product_fee)
            iva = fee * preciototal / 100
            totalsiniva = preciototal - iva
            return {
                ...state,
                cart: [...state.cart, action.payload],
                total: (state.total + preciototal),
                ivatotal: (state.ivatotal + iva),
                totalsiniva: (state.totalsiniva + totalsiniva)
            }

        case REMOVE_FROM_CART:
        // console.log('actionrevisar:',action.payload.item.product_price)
        preciototalparcial = action.payload.item.product_price.replace(',', '');
        preciototal = parseFloat(preciototalparcial)
        fee = parseFloat(action.payload.item.product_fee)
        iva = fee*preciototal/100
        totalsiniva = preciototal - iva
        return {
            ...state,
            cart: state.cart.filter((item, i) => i !== action.payload.index),
            total: (state.total - preciototal),
            ivatotal:(state.ivatotal - iva),
            totalsiniva: (state.totalsiniva - totalsiniva)
        }

        case EMPTY_CART:
            return {
                ...state,
                cart: [],
                total: 0
            }

        case SEARCH_PRODUCTS: {
            if (action.textobuscar != "") {
                datos = [...state.dataproducts.filter(item => {
                    const itemData = `${item.product_name.toUpperCase()} ${item.product_group_name.toUpperCase()}`;
                    return itemData.includes(action.textobuscar);
                })]
                data = datos.slice()
                return {
                    ...state,
                    dataproducts: data
                };
            } else {
                datos = [...state.dataproductcopy].slice()
                return {
                    ...state,
                    dataproducts: datos
                };
            }
        }


        case SET_PRODUCTS:
            datos = action.dataproducts.slice()
            return {
                ...state,
                dataproducts: datos,
                dataproductcopy: datos
            }

        case SET_CATEGORYPRODUCTS:
            datos = action.datacategoryproducts.slice()
            return {
                ...state,
                datacategoryproducts: datos
            }
        default: return state
    }
}