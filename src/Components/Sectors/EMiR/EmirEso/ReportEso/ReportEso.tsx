import React, { useRef } from 'react';
import { ReportFirstPage } from '../../../../ReportFirstPage/ReportFrirstPage';
import { ReportHeader } from '../../../../ReportHeader/ReportHeder';
import { useReactToPrint } from 'react-to-print'
import { ReportSecondPage } from '../../../../ReportSecondPage/ReportSecondPage';
import { useSelector } from 'react-redux';
import st from './ReportEso.module.css'
import { useParams } from 'react-router-dom';
import { selectReportEso } from '../../../../../Redux/selectors/eso-report-selectors';
import { ReportEsoType } from '../../../../../Redux/EsoReducer';



export const ReportEso = () => {

  const componentRef = useRef()

  const params = useParams<'id'>();
  const reportId = params.id
  
  const reportsEso = useSelector(selectReportEso)
 
  let report :ReportEsoType 

  let el = reportsEso.find(el => el.reportId === reportId)

  if(el) {
    report = el
  } else {
    alert("Протокол не найден")
  }
    
    const pdfHandler = useReactToPrint({
        content: () => componentRef.current!,
        documentTitle: 'Report',
    })

    const changeReportTitleHandler = (id: string, key: string, parameter: string) => {

    }









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
                <ReportFirstPage report={report!} changeReportTitle={()  => {}} />
            </div>
            <div className={st.page}>
                <ReportSecondPage />
            </div>
            {/* <div className={st.page2}>
      {Array.from({ length: pageCount }, (_, index) => renderPage(index))}
    </div> */}

        </div>
    )
}