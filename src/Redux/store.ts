import { combineReducers, configureStore, Middleware } from "@reduxjs/toolkit";
import { ReportEsoReducer } from "./EsoReducer";
import thunkMiddleware from "redux-thunk";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";



const rootReducer = combineReducers({
    reportEso: ReportEsoReducer,
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