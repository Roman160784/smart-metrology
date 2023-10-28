import { RootReducerType } from "../store";

export const selectReportEso = (state: RootReducerType) => state.reportEso
export const selectReportMrp120 = (state: RootReducerType) => state.reportMrp120
export const selectReportE6 = (state: RootReducerType) => state.reportE6
export const selectReportIfn = (state: RootReducerType) => state.reportIfn