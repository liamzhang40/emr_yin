import {
  combineReducers
} from 'redux';
import users from './entity_user_reducer';
import patients from './entity_patient_reducer';
import columnHeads from './entity_column_head_reducer';
import visits from './entity_visit_reducer';

const entitiesReducer = combineReducers({
  users,
  patients,
  columnHeads,
  visits
});

export default entitiesReducer;