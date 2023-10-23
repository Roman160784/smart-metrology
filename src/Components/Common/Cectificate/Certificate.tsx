import React, { useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import st from './Certificate.module.css'
import { CleanCertificate } from './CleanCertificate';
import { useReactToPrint } from 'react-to-print';
import { useSelector } from 'react-redux';
import { selectReportE6, selectReportEso, selectReportMrp120 } from '../../../Redux/selectors/eso-report-selectors';
import { ReportMrp120Type } from '../../../Redux/Mrp120Reducer';
import { ReportEsoType } from '../../../Redux/EsoReducer';
import { pathSiteBarEnum } from '../../SideBar/SideBar';
import { ReportE6Type } from '../../../Redux/E6Reducer';

export const Certificate = () => {
    const navigate = useNavigate()
    const componentRef = useRef()
    const params = useParams<'id'>();
    let reportId = params.id

    let report: ReportMrp120Type | ReportEsoType | ReportE6Type | undefined

    let reportsEso = useSelector(selectReportEso)
    let reportsMrp120 = useSelector(selectReportMrp120)
    let reportsE6 = useSelector(selectReportE6)

    // report = reportsEso.find(el => el.reportId === reportId);
    // if (!report) {
    //     report = reportsMrp120.find(el => el.reportId === reportId);
    //     if (!report) {
    //         report = reportsE6.find(el => el.reportId === reportId);
    //         if (!report) {
    //             navigate(pathSiteBarEnum.mainAria);
    //         }
    //     }
    // }

    switch (true) {
        case (reportsEso.find(el => el.reportId === reportId) !== undefined):
            report = reportsEso.find(el => el.reportId === reportId);
            break;
        case (reportsMrp120.find(el => el.reportId === reportId) !== undefined):
            report = reportsMrp120.find(el => el.reportId === reportId);
            break;
        case (reportsE6.find(el => el.reportId === reportId) !== undefined):
            report = reportsE6.find(el => el.reportId === reportId);
            break;
        default:
            navigate(pathSiteBarEnum.mainAria);
            break;
    }


    let newStandards = report?.standard.slice(0, -2)
    if (report && report.standard && newStandards) {
        report = { ...report, standard: newStandards }
    }


    const pdfHandler = useReactToPrint({
        content: () => componentRef.current!,
        documentTitle: 'Certificate',
    })

    return (
        //  @ts-ignore >
        <div className={st.container} ref={componentRef} onDoubleClick={pdfHandler}>
            <CleanCertificate report={report!} />
        </div>
    )
}