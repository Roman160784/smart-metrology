import React from 'react';
import { NavLink, Route, Routes } from 'react-router-dom'; 
import st from './EmirNavReports.module.css'

export enum pathEmirEnum {
    esoAll = '/eso',
    e6All = '/e6',
    mrpAll = '/mrp',
    ifnAll = '/ifn',
    reportEso = '/reportEso/:id',
    certificate = '/certificate/:id',
    reportMrp120 = '/reportMrp120/:id',
    reportE6andPsi = '/reportE6andPsi/:id',
    reportIfn = '/reportIfn/:id',
    certificateIfn = '/certificateIfn/:id'
}


export const EmirNavReports = () => {
    return (
        <nav className={st.mainBlock}>
            <div className={st.block}>
                <NavLink className={st.navigation} to={pathEmirEnum.esoAll}>
                    <span className={st.navigation}> Мегаомметры ЭС0202</span>
                </NavLink>
            </div>
            <div className={st.block}>
                <NavLink className={st.navigation} to={pathEmirEnum.e6All}>
                    <span className={st.navigation}> {`Мегаомметры E6 / ПСИ`} </span>
                </NavLink>
            </div>
            <div className={st.block}>
                <NavLink className={st.navigation} to={pathEmirEnum.mrpAll}>
                    <span className={st.navigation}> MRP</span>
                </NavLink>
            </div>
            <div className={st.block}>
                <NavLink className={st.navigation} to={pathEmirEnum.ifnAll}>
                    <span className={st.navigation}> ИФН</span>
                </NavLink>
            </div>
            
        </nav>
    )
}