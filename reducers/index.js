import { combineReducers } from 'redux'
import userReducer from './userReducer'
import TrajetReducer from './TrajetReducer';


export default combineReducers({
    User: userReducer,
    Trajet: TrajetReducer
})