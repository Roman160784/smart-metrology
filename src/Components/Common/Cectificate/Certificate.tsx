import React, { useRef } from 'react';
import { useParams } from 'react-router-dom';
import st from './Certificate.module.css'
import bgca from '../../../Pictures/bgca.jpg'
import certif from '../../../Pictures/certif.png'
import iso from '../../../Pictures/iso.png'
import { CleanCertificate } from './CleanCertificate';
import { useReactToPrint } from 'react-to-print';
import { useSelector } from 'react-redux';
import { selectReportEso } from '../../../Redux/selectors/eso-report-selectors';

export const Certificate = () => {

    const componentRef = useRef()
    const params = useParams<'id'>();
    let reportId = params.id

    let reportsEso = useSelector(selectReportEso)
    let report = reportsEso.find(el => el.reportId === reportId)
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