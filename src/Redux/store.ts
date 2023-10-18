import { combineReducers, configureStore, Middleware } from "@reduxjs/toolkit";
import { ReportEsoReducer } from "./EsoReducer";
import thunkMiddleware from "redux-thunk";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { ReportMrp120Reducer } from "./Mrp120Reducer";
import { ReportE6Reducer } from "./E6Reducer";



const rootReducer = combineReducers({
    reportEso: ReportEsoReducer,
    reportMrp120: ReportMrp120Reducer,
    reportE6: ReportE6Reducer,
})

export type RootReducerType = ReturnType<typeof rootReducer>

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware)
})


export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

// @ts-ignore
window.store = store;