import React, { useRef } from 'react';
import { ReportFirstPage } from '../../../../ReportFirstPage/ReportFrirstPage';
import { ReportHeader } from '../../../../ReportHeader/ReportHeder';
import { useReactToPrint } from 'react-to-print'
import { ReportSecondPage } from '../../../../ReportSecondPage/ReportSecondPage';
import st from './ReportEso.module.css'



export const ReportEso = () => {

    const componentRef = useRef()

    const pdfHandler = useReactToPrint({
        content: () => componentRef.current!,
        documentTitle: 'Certificate',
    })

    const data = [<div>fggfsd  </div> , <span>dvsvsd</span>]

    const itemsPerPage = 1
    console.log(data.length);
    
    const pageCount = Math.ceil(data.length / itemsPerPage); 

    const renderPage = (pageIndex: number) => {
        const startIndex = pageIndex * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const pageData = data.slice(startIndex, endIndex);
    
        return (
          <div className="page" style={{ width: "210mm", height: "297mm" }}>
            {pageData.map((item, index) => (
              <div key={index} className="item">
                {item}
              </div>
            ))}
          </div>
        );
      };
    

    return (
        //  @ts-ignore 
        <div className={st.container} onDoubleClick={pdfHandler} ref={componentRef} >

            <div className={st.page}>
                <ReportHeader />
                <ReportFirstPage />
            </div>
            <div className={st.page2}>
                <ReportSecondPage />
            </div>
            <div className={st.page2}>
      {Array.from({ length: pageCount }, (_, index) => renderPage(index))}
    </div>

        </div>
    )
}