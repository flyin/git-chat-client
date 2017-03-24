import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import { reducer as appReducer } from './containers/App';

export default client => combineReducers({
  apollo: client.reducer(),
  app: appReducer,
  form: formReducer,
  router: routerReducer
});
