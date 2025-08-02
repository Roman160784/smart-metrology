import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { AllReports } from '../Common/AllReports/AllReports';
import { Certificate } from '../Common/Cectificate/Certificate';
import { CertificateIfn } from '../Common/Cectificate/CertificateIfn';
import { Header } from '../Header/Header';
import { MainAria } from '../MainAria/MainAria';
import { ReportE6andPsi } from '../Sectors/EMiR/EmirE6andPsi/ReportE6andPsi';
import { ReportEso } from '../Sectors/EMiR/EmirEso/ReportEso/ReportEso';
import { ReportIfn } from '../Sectors/EMiR/EmirIfn/ReportIfn';
import { ReportMrp120 } from '../Sectors/EMiR/EmirMrp120/ReportMrp120';
import { EmirNavReports, pathEmirEnum } from '../Sectors/EMiR/EmirNavReports/EmirNavReports';
import { Fhi } from '../Sectors/FHI/Fhi';
import { Gi } from '../Sectors/GI/Gi';
import { Ion } from '../Sectors/IonI/Ion';
import { Mi } from '../Sectors/MI/Mi';
import { Tti } from '../Sectors/TTI/Tti';
import { pathSiteBarEnum, SideBar } from '../SideBar/SideBar';
import st from './MainPage.module.css'
import { ReportHelper } from '../Sectors/ReportHelper/reportHelper';

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
                        <Route path={pathSiteBarEnum.mainAria} element={<MainAria />} />
                        <Route path={pathSiteBarEnum.helpReport} element={<ReportHelper />} />
                        <Route path={pathSiteBarEnum.elictric} element={<EmirNavReports />} />
                        <Route path={pathSiteBarEnum.chemists} element={<Fhi />} />
                        <Route path={pathSiteBarEnum.geometry} element={<Gi />} />
                        <Route path={pathSiteBarEnum.heating} element={<Tti />} />
                        <Route path={pathSiteBarEnum.mechanics} element={<Mi />} />
                        <Route path={pathSiteBarEnum.radiation} element={<Ion />} />
                        <Route path={pathEmirEnum.esoAll} element={<AllReports />} />
                        <Route path={pathEmirEnum.e6All} element={<AllReports />} />
                        <Route path={pathEmirEnum.mrpAll} element={<AllReports />} />
                        <Route path={pathEmirEnum.ifnAll} element={<AllReports />} />
                        <Route path={pathEmirEnum.reportEso} element={<ReportEso />} />
                        <Route path={pathEmirEnum.certificate} element={<Certificate />} />
                        <Route path={pathEmirEnum.reportMrp120} element={<ReportMrp120 />} />
                        <Route path={pathEmirEnum.reportE6andPsi} element={<ReportE6andPsi/>} />
                        <Route path={pathEmirEnum.reportIfn} element={<ReportIfn/>} />
                        <Route path={pathEmirEnum.certificateIfn} element={<CertificateIfn/>} />
                    </Routes>
                </div>

            </div>
        </div>
    )
}