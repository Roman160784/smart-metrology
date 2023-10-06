import React, { useRef } from 'react';
import { useParams } from 'react-router-dom';
import st from './Certificate.module.css'
import bgca from '../../../Pictures/bgca.jpg'
import certif from '../../../Pictures/certif.png'
import iso from '../../../Pictures/iso.png'
import { CleanCertificate } from './CleanCertificate';
import { useReactToPrint } from 'react-to-print';

export const Certificate = () => {

    const componentRef = useRef()
    const params = useParams<'id'>();
    let reportId = params.id

    const pdfHandler = useReactToPrint({
        content: () => componentRef.current!,
        documentTitle: 'Certificate',
      })

    return (
        //  @ts-ignore >
        <div className={st.container} ref={componentRef} onDoubleClick={pdfHandler}>
            <CleanCertificate/>
        </div>
    )
}