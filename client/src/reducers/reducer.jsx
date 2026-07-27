import {combineReducers} from "redux";//is this correct? I think it should be from 'redux' instead of '@redux-toolkit'
import authReducer from '../slices/authSlice';
import profileReducer from '../slices/profileSlice';
import cartReducer from '../slices/cartSlice';


const rootReducer = combineReducers({
    auth: authReducer   ,
    profile: profileReducer,
    cart: cartReducer
});

export default rootReducer;