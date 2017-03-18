import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

export default client => combineReducers({
  apollo: client.reducer(),
  form: formReducer,
  router: routerReducer
});
