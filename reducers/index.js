import { combineReducers } from 'redux'
import userReducer from './userReducer'
import TrajetReducer from './TrajetReducer';
import RouterReducer from './RouterReducer';


export default combineReducers({
    User: userReducer,
    Trajet: TrajetReducer,
    Router: RouterReducer
})