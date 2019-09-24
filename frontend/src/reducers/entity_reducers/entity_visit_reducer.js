import { merge } from 'lodash';
import {
  RECEIVE_ALL_VISITS,
  RECEIVE_VISIT,
  REMOVE_VISIT,
} from '../../actions/visit_actions';

const entityVisitsReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_ALL_VISITS:
      return action.payload.rows;
    case RECEIVE_VISIT:
      return merge({}, state, { [action.payload.visit.id]: action.payload.visit }); 
    case REMOVE_VISIT:
      let newState = merge({}, state);
      action.visitIds.forEach(id => {
        delete newState[id];
      });
      return newState;
    default:
      return state;
  }
};

export default entityVisitsReducer;