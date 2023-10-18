import React, { ChangeEvent, useRef, useState } from 'react';
import { FiPrinter } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import { v1 } from 'uuid';
import { addNewCalibrationFielMrp120dTC, changeReportMrp120TitleTC, changeStandardCalibrationDateTC, removeCalculationMrp120FieldTC, ReportMrp120Type, updateCalibrationValueMrp120TC, updateDaraForCalculationCalibrationMrp120TC } from '../../../../Redux/Mrp120Reducer';
import { selectReportMrp120 } from '../../../../Redux/selectors/eso-report-selectors';
import { useAppDispatch } from '../../../../Redux/store';
import { EditableSpan } from '../../../Common/EditableSpan/EditableSpan';
import { Gym } from '../../../Common/Gym/Gym';
import { Input } from '../../../Common/Input/Input';
import { ReportFirstPage } from '../../../ReportFirstPage/ReportFrirstPage';
import { ReportHeader } from '../../../ReportHeader/ReportHeder';
import { ReportSecondPage } from '../../../ReportSecondPage/ReportSecondPage';
import st from '../EmirEso/ReportEso/ReportEso.module.css'
import { CalculationMrp120 } from './CalculationMrp120';

export const ReportMrp120 = () => {

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const componentRef = useRef()
  const params = useParams<'id'>();
  const [value, setValue] = useState<string>('')
  let reportId = params.id
  let reportsMrp120 = useSelector(selectReportMrp120)
  let report: ReportMrp120Type
  let lastPage: number = 3

  let element = reportsMrp120.find(el => el.reportId === reportId)
  if (element) {
    report = element
  } else {
    console.log('err');
  }
  const pdfHandler = useReactToPrint({
    content: () => componentRef.current!,
    documentTitle: 'Report',
  })

  const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let newValue = e.currentTarget.value
    setValue(newValue)
  }

  const onblurHandler = (reportId: string) => {
    if (value.trim() !== '') {
      dispatch(addNewCalibrationFielMrp120dTC({ reportId: reportId, calculationId: v1(), dot: +value, }))
    }
    setValue('')
  }
  const changeReportTitleHandler = (id: string, key: string, parameter: string) => {
    dispatch(changeReportMrp120TitleTC({reportId: id, key: key, parameter: parameter }))
  }
  const changeStandardDateHandler = (reportId: string, key: string, title: string, id: string) => {
    dispatch(changeStandardCalibrationDateTC({reportId: reportId, key: key, parameter: title, id: id}))
  }

  const updateDataForCalculation = (reportId: string, calculationId: string, index: number, dot: number) => {
      dispatch(updateDaraForCalculationCalibrationMrp120TC({reportId: reportId, calculationId: calculationId, index: index, dot: dot}))
      
  }
  const removeCalculationField = (reportId: string, id: string) => {
    dispatch(removeCalculationMrp120FieldTC({reportId: reportId, calculationId: id}))
  }
  
  const updateCalibrationValueHandler = (reportId: string, calculationId: string, calibrationValue: string) => {
    dispatch(updateCalibrationValueMrp120TC({reportId: reportId, calculationId: calculationId, calibrationValue: calibrationValue}))
  }

  const navigateToCertificate = (reportId: string) => {
    navigate(`/certificate/${reportId}`)
  }

  return (
    //  @ts-ignore >
    <div className={st.container} ref={componentRef} >
      <div className={st.page}>
        <ReportHeader />
        <ReportFirstPage report={report!} changeReportTitle={changeReportTitleHandler} />
      </div>
      <div className={st.page}>
        <ReportSecondPage lastPage={lastPage} report={report!} changeStandardDate={changeStandardDateHandler} />
      </div>
      {
        report!.calculation.map((el, i) => {
          return (
            <div key={i} className={st.page}>
              <div className={st.header}>
                <span className={st.headerTitle}>Протокол  {report.reportNumber}</span>
                <span className={st.headerTitle}>от {report.calibrationDate}</span>
                <span className={st.headerTitle}>страница {i + 3} страниц {lastPage} </span>
              </div>
              <CalculationMrp120 calculation={el}
                updateDataForCalculation={updateDataForCalculation}
                removeCalculationField={removeCalculationField}
                updateCalibrationValue={updateCalibrationValueHandler} />
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
        <div className={st.inputBlock}><Input value={value} onChange={inputHandler} onBlur={() => { onblurHandler(report.reportId) }} />
          <span className={st.spanInput}>Добавьте точку калибровки</span></div>
        <div className={st.gym}>
          <Gym />
        </div>
        <div className={st.final}>
          <span>Заключение о соответствии:</span>
          <div className={st.final}>
            <span>{`${report!.calibrationObjectName} ${report!.calibrationObjectType} № ${report!.serialNumber}`}</span>
          </div>
          <div className={st.final}>
            <span> {`в калибруемых точках соответствует обязательным метрологическим требованиям в соответствии с описанием типа (при установлении соответствия применно правило принятия решения, основанное на простой приёмке в соответствии с СТБ ISO/IEC Guide 98-4-2019)`}</span>
          </div>
          <div className={st.final}>

            <span>Калибровочное клеймо: </span>
            <EditableSpan title={report!.stigma} changeTitle={(title) => { changeReportTitleHandler(report.reportId, 'stigma', title) }} />
          </div>
          <div className={st.final}>
            Калибровку выполнил: _____________________
            <EditableSpan title={report!.engineer} changeTitle={(title) => { changeReportTitleHandler(report.reportId, 'engineer', title) }} />
          </div>
          <div className={st.final}>
            Проверил : _________________
            <EditableSpan title={report!.boss} changeTitle={(title) => { changeReportTitleHandler(report.reportId, 'boss', title) }} />
          </div>
        </div>
        <div className={st.printer}>
          <FiPrinter onClick={pdfHandler} />
          <span onClick={() => { navigateToCertificate(report.reportId) }} className={st.certificate}>{'Cоздать свидетельство'}</span>
        </div>
      </div>
    </div>
  )
}