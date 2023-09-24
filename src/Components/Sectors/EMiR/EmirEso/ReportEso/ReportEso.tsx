import React, {useRef} from 'react';
import { ReportFirstPage } from '../../../../ReportFirstPage/ReportFrirstPage';
import { ReportHeader } from '../../../../ReportHeader/ReportHeder';
import {useReactToPrint} from 'react-to-print'
import st from './ReportEso.module.css'




export const ReportEso = () => {

    const componentRef = useRef()

  const pdfHandler = useReactToPrint({
        content: () => componentRef.current!,
         documentTitle: 'Certificate',
    })

    return (
        //@ts-ignore
        <div onDoubleClick={pdfHandler} ref={componentRef} className={st.page}>
        <ReportHeader/>
        <ReportFirstPage/>
        </div>
        
    )
}