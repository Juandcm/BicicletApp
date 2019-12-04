import { SET_BOLETERIA } from "../actions/boleteria";
const initialState = {
	databoleteria: {}
};

export default (state = initialState, action) => {
	switch (action.type) {
		case SET_BOLETERIA:
			return {
				databoleteria:action.databoleteria
			};

		default:
			return state;
	}
};
