import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Header } from '../Header/Header';
import { MainAria } from '../MainAria/MainAria';
import { Emir } from '../Sectors/EMiR/Emir';
import { Fhi } from '../Sectors/FHI/Fhi';
import { Gi } from '../Sectors/GI/Gi';
import { Ion } from '../Sectors/IonI/Ion';
import { Mi } from '../Sectors/MI/Mi';
import { Tti } from '../Sectors/TTI/Tti';
import { pathSiteBarEnum, SideBar } from '../SideBar/SideBar';
import st from './MainPage.module.css'

export const MainPage = () => {
    return (
        <div>
            <Header />
            <div className={st.mainBlock}>
                <div className={st.child1}>
                    <SideBar />
                </div>
                <div className={st.child2}>
                    <Routes>
                    <Route path={pathSiteBarEnum.mainAria} element={<MainAria/>} />
                        <Route path={pathSiteBarEnum.elictric} element={<Emir/>} />
                        <Route path={pathSiteBarEnum.chemists} element={<Fhi/>} />
                        <Route path={pathSiteBarEnum.geometry} element={<Gi/>} />
                        <Route path={pathSiteBarEnum.heating} element={<Tti/>} />
                        <Route path={pathSiteBarEnum.mechanics} element={<Mi/>} />
                        <Route path={pathSiteBarEnum.radiation} element={<Ion/>} />
                    </Routes>
                </div>

            </div>
        </div>
    )
}