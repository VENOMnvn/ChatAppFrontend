import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import utilityReducer from './slices/utilitySlice';
import { persistReducer } from 'redux-persist';
import { combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key:"persist-key",
    storage
}

const reducer = combineReducers({ user:userReducer,utility:utilityReducer});
const persistedReducer = persistReducer(persistConfig,reducer); 
const appStore = configureStore({
    reducer: persistedReducer
});

export default appStore;