import { TOGGLE_ROUND } from "../actions/round";

const round = (state = false, action) => {
  switch (action.type) {
    case TOGGLE_ROUND:
        return (
            !state
        );
    default:
      return state;
  }
};

export default round;
