import React, {useRef, useState } from 'react';
import { ReportFirstPage } from '../../../../ReportFirstPage/ReportFrirstPage';
import { ReportHeader } from '../../../../ReportHeader/ReportHeder';
import { useReactToPrint } from 'react-to-print'
import { ReportSecondPage } from '../../../../ReportSecondPage/ReportSecondPage';
import { useSelector } from 'react-redux';
import st from './ReportEso.module.css'
import { useNavigate, useParams } from 'react-router-dom';
import { selectReportEso } from '../../../../../Redux/selectors/eso-report-selectors';
import { addNewCalibrationFieldTC, removeCalculationFieldTC, ReportEsoType, updateCalculationDataTC, updateReportTitleTC, updateStandardsDateTC, updateTestVolageCalculationFieldTC } from '../../../../../Redux/EsoReducer';
import { useAppDispatch } from '../../../../../Redux/store';
import { Input } from '../../../../Common/Input/Input';
import { v1 } from 'uuid';
import { CalculationEso } from '../CalculationEso/CalculatioEso';
import { Gym } from '../../../../Common/Gym/Gym';
import { EditableSpan } from '../../../../Common/EditableSpan/EditableSpan';
import {FiPrinter} from "react-icons/fi"
import { ResultInDot } from '../../../../Common/ResultInDot/ResultInDot';



export const ReportEso = () => {

  const componentRef = useRef()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [lastPage, setLastPage] = useState<number>(3)
  let pageCounter: number = 3




  const params = useParams<'id'>();
  let reportId = params.id

  let reportsEso = useSelector(selectReportEso)

  let report: ReportEsoType

  let element = reportsEso.find(el => el.reportId === reportId)

  

  if (element) {
    report = element
  } else {
    console.log('err');
  }

  const pdfHandler = useReactToPrint({
    content: () => componentRef.current!,
    documentTitle: 'Report',

  })

  const onSetLastPageHandler = ()=> {
    setLastPage(pageCounter)
  }

  const changeReportTitleHandler = (id: string, key: string, parameter: string) => {
    dispatch(updateReportTitleTC({ reportId: id, key: key, parameter: parameter }))
  }

  const changeStandardDateHandler = (reportId: string, key: string, title: string, id: string) => {
    dispatch(updateStandardsDateTC({ reportId: reportId, key: key, parameter: title, id: id}))
  }

  const removeCalculationField = (reportId: string, id: string) => {
    dispatch(removeCalculationFieldTC({reportId: reportId, calculationId: id}))
  }

  const updateDataForCalculation = (reportId: string, calculationId: string, index: number, testVoltage: string, dot: number, toFixedValue: number) => {
    dispatch(updateCalculationDataTC({reportId: reportId, calculationId: calculationId, index: index, testVoltage: testVoltage, dot: dot, toFixedValue: toFixedValue}))
  }

  const updateTestVoltageHandler = (reportId: string, calculationId: string, testVoltage: string) => {
    dispatch(updateTestVolageCalculationFieldTC({reportId: reportId, calculationId: calculationId, testVoltage: testVoltage}))
  }


  const onblurHandler = (reportId: string, toFixedValue: number, valueForCount: number) => {
      dispatch(addNewCalibrationFieldTC({reportId: reportId, calculationId: v1(),  dot: valueForCount, toFixedValue: toFixedValue}))
  }

  const navigateToCertificate = (reportId: string) => {
    navigate(`/certificate/${reportId}`)
  }

  return (
    //  @ts-ignore 
    <div className={st.container}  ref={componentRef} >
      <div className={st.page}>
        <ReportHeader />
        <ReportFirstPage report={report!} changeReportTitle={changeReportTitleHandler} />
      </div>
      <div className={st.page}>
        <ReportSecondPage lastPage={lastPage} report={report!} changeStandardDate={changeStandardDateHandler} />
      </div>
      {
        report!.calculation.map((el, i) => {
          pageCounter++ 
          return (
            <div key={i} className={st.page}>
               <div className={st.header}>
                <span className={st.headerTitle}>Протокол  {report.reportNumber}</span>
                <span className={st.headerTitle}>от {report.calibrationDate}</span>
                <span className={st.headerTitle}>страница {i+3} страниц {lastPage} </span>
            </div>
              <CalculationEso calculation={el}
              updateDataForCalculation={updateDataForCalculation}
              removeCalculationField={removeCalculationField}
               updateTestVoltage={updateTestVoltageHandler}  />
            </div>
          )
        })
      }
      <div className={st.page}>
      <div className={st.header}>
                <span className={st.headerTitle}>Протокол  {report!.reportNumber}</span>
                <span className={st.headerTitle}>от {report!.calibrationDate}</span>
                <span className={st.headerTitle}>страница {lastPage} страниц {lastPage}</span>
            </div>
            <div className={st.inputBlock}><Input  onBlur={(toFixedValue: number, valueForCount: number)=>{onblurHandler(report.reportId, toFixedValue, valueForCount)}} />
          <span className={st.spanInput}>Добавьте точку калибровки</span></div>
          <div className={st.gym}>
        <Gym/>
      </div>
      <div className={st.final}>
        <span>Заключение о соответствии:</span>
        <div className={st.final}>
          <span>{`${report!.calibrationObjectName} ${report!.calibrationObjectType} № ${report!.serialNumber}` }</span>
        </div>
        <div className={st.final}>
        <span> <ResultInDot/> </span>
        </div>
        <div className={st.final}>
          <span className={st.certificate} onClick={() => {navigateToCertificate(report.reportId)}}>Свидетельство о калибровке </span>
          <EditableSpan title={report!.stigma} changeTitle={(title) => {changeReportTitleHandler( report.reportId, 'stigma', title)}}/>
        </div>
        <div className={st.final}>
        Калибровку выполнил: _____________________ 
        <EditableSpan title={report!.engineer} changeTitle={(title) => {changeReportTitleHandler( report.reportId, 'engineer', title)}}/>
        </div>
        <div className={st.final}>
        Проверил : _________________ 
        <EditableSpan title={report!.boss} changeTitle={(title) => {changeReportTitleHandler( report.reportId, 'boss', title)}}/>
        </div>
      </div>
      <div className={st.printer} onClick={onSetLastPageHandler}>
      <FiPrinter onClick={pdfHandler}/>
      </div>
      </div>
    </div>
  )
}


