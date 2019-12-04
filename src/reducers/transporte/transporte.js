import { SET_ACTIVE_KEYBOARD,REMOVE_ACTIVE_KEYBOARD,VALIDATE_FORM,SET_FORMIK_PROPS} from '../../actions/transporte/transporte';
import { cloneDeep } from "lodash";
const initialState = {
 
  tabIndex: 0,
  formValidation: false,
  formikProps:{},
  activeKeyboard:false,
  keyboardHeight:''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case VALIDATE_FORM:
      return {
        ...state,
        formValidation: action.value
      }
    case SET_FORMIK_PROPS:
      return {
        ...state,
        formikProps: action.props
      }
    case REMOVE_ACTIVE_KEYBOARD:
      return {
        ...state,
        activeKeyboard: false,
        keyboardHeight:''
      }
    case SET_ACTIVE_KEYBOARD:
        return {
          ...state,
          activeKeyboard: true,
          keyboardHeight:action.keyboardHeight
        }

    default: return state
  }
}