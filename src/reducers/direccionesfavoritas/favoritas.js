import {
  ADD_ADDITIONAL_ADDRESS,
  REMOVE_ADDITIONAL_ADDRESS,
  SET_FAV_ADDRESSES,
  SET_ADDRESS_FIELD,
  SET_FAV_ADDRESS,
  RESET_SELECTED_FAV_ADDRESS
} from "../../actions/direccionesfavoritas/favoritas";
import { cloneDeep } from "lodash";
const initialState = {
  favAddresses: [],
  prevFavAddresses: [],
  selectedFavAddress:{},
  selectedFavAddressId:''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_ADDITIONAL_ADDRESS:
      return {
        ...state,
        favAddresses: [
          ...state.favAddresses,
          {
            id: action.id,
            name: "",
            longitude: "",
            latitude: "",
            favorite_addr:"",
            user_id:action.userId
          }
        ]
      };
    case REMOVE_ADDITIONAL_ADDRESS: {
      let { id } = action;
      let newFavs = state.favAddresses.filter(address => address.id != id);
      return {
        ...state,
        favAddresses: newFavs
      };
    }
    case SET_ADDRESS_FIELD: {
      let { id, name, longitude, latitude, favoriteAddress } = action;
      if (typeof name !== "undefined") {
        function editFavAddress(favAddresses, edits, id) {
          for (let index = 1; index <= favAddresses.length; index++) {
            Object.assign(
              favAddresses.find(o => o.id === id),
              edits
            );
          }
          return favAddresses;
        }
        var prevFavAddresses = state.favAddresses;
        let edits = {
          name
        };
        var newFavAddresses = editFavAddress(prevFavAddresses, edits, id);
        return {
          ...state,
          favAddresses: newFavAddresses.slice()
        };
      } else {
        if (
          typeof favoriteAddress !== "undefined" &&
          typeof latitude !== "undefined"
        ) {
          function editFavAddress(favAddresses, edits, id) {
            for (let index = 1; index <= favAddresses.length; index++) {
              Object.assign(
                favAddresses.find(o => o.id === id),
                edits
              );
            }
            return favAddresses;
          }
          var prevFavAddresses = state.favAddresses;
          let edits = {
            favorite_addr: favoriteAddress,
            latitude,
            longitude
          };
          var newFavAddresses = editFavAddress(prevFavAddresses, edits, id);
          return {
            ...state,
            favAddresses: newFavAddresses.slice()
          };
        }
      }
    }

    case SET_FAV_ADDRESSES:
      let newArray = cloneDeep(action.addresses);
      return {
        ...state,
        favAddresses: action.addresses,
        prevFavAddresses: newArray
      };
    case SET_FAV_ADDRESS:
      return {
        ...state,
        selectedFavAddress:action.favAddress,
        selectedFavAddressId:action.id
      };
    case RESET_SELECTED_FAV_ADDRESS:
      return {
        ...state,
        selectedFavAddress:{},
        selectedFavAddressId:''
      };

    default:
      return state;
  }
};
