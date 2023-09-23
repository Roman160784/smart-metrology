import React from 'react';
import { NavLink } from 'react-router-dom';
import st from './SideBar.module.css'

export enum pathSiteBarEnum {
    mainAria = '/',
    elictric = '/elictric',
    mechanics = '/mechanics',
    chemists = '/chemists',
    geometry = '/geometry',
    heating = '/heating',
    radiation = '/radiation',

}



export const SideBar = () => {
    return (
        <nav>
            <div className={st.mainBlock}>
        <div className={st.block}>
            <NavLink className={st.navigation} to={pathSiteBarEnum.mainAria}>
            <span className={st.navigation}> Основное меню</span>
            </NavLink>
        </div>
        <div className={st.block}>
            <NavLink className={st.navigation} to={pathSiteBarEnum.elictric}>
            <span className={st.navigation}> Сектор ЭМиР</span>
            </NavLink>
        </div>
        <div className={st.block}>
            <NavLink className={st.navigation} to={pathSiteBarEnum.mechanics}>
            <span className={st.navigation}> Сектор МИ</span>
            </NavLink>
        </div>
        <div className={st.block}>
            <NavLink className={st.navigation} to={pathSiteBarEnum.chemists}>
            <span className={st.navigation}> Сектор ФХИ</span>
            </NavLink>
        </div>
        <div className={st.block}>
            <NavLink className={st.navigation} to={pathSiteBarEnum.geometry}>
            <span className={st.navigation}> Сектор ГИ</span>
            </NavLink>
        </div>
        <div className={st.block}>
            <NavLink className={st.navigation} to={pathSiteBarEnum.heating}>
            <span className={st.navigation}> Cектор ТТИ</span>
            </NavLink>
        </div>
        <div className={st.block}>
            <NavLink className={st.navigation} to={pathSiteBarEnum.radiation}>
            <span className={st.navigation}> Сектор ИИ</span>
            </NavLink>
        </div>
            </div>
        </nav>
    )
}