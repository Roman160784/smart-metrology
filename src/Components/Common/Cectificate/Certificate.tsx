import React, { useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import st from './Certificate.module.css'
import { CleanCertificate } from './CleanCertificate';
import { useReactToPrint } from 'react-to-print';
import { useSelector } from 'react-redux';
import { selectReportEso, selectReportMrp120 } from '../../../Redux/selectors/eso-report-selectors';
import { ReportMrp120Type } from '../../../Redux/Mrp120Reducer';
import { ReportEsoType } from '../../../Redux/EsoReducer';
import { pathSiteBarEnum } from '../../SideBar/SideBar';

export const Certificate = () => {

    const navigate = useNavigate()
    const componentRef = useRef()
    const params = useParams<'id'>();
    let reportId = params.id

    let report: ReportMrp120Type |  ReportEsoType | undefined

    let reportsEso = useSelector(selectReportEso)
    let reportsMrp120 =useSelector(selectReportMrp120)

    report = reportsEso.find(el => el.reportId === reportId)
    if (report === undefined) {
        report = reportsMrp120.find(el => el.reportId === reportId)
    } else {
        navigate(pathSiteBarEnum.mainAria)
    }

    let newStandards = report?.standard.slice(0, -2)
    if( report && report.standard && newStandards){
        report = {...report, standard: newStandards}
    }
    

    const pdfHandler = useReactToPrint({
        content: () => componentRef.current!,
        documentTitle: 'Certificate',
      })

    return (
        //  @ts-ignore >
        <div className={st.container} ref={componentRef} onDoubleClick={pdfHandler}>
            <CleanCertificate report={report!}/>
        </div>
    )
}