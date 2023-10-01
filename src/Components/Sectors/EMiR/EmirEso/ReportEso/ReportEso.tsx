import React, { ChangeEvent, useRef, useState } from 'react';
import { ReportFirstPage } from '../../../../ReportFirstPage/ReportFrirstPage';
import { ReportHeader } from '../../../../ReportHeader/ReportHeder';
import { useReactToPrint } from 'react-to-print'
import { ReportSecondPage } from '../../../../ReportSecondPage/ReportSecondPage';
import { useSelector } from 'react-redux';
import st from './ReportEso.module.css'
import { useParams } from 'react-router-dom';
import { selectReportEso } from '../../../../../Redux/selectors/eso-report-selectors';
import { addNewCalibrationFieldTC, ReportEsoType, updateReportTitleTC, updateStandardsDateTC } from '../../../../../Redux/EsoReducer';
import { useAppDispatch } from '../../../../../Redux/store';
import { Input } from '../../../../Common/Input/Input';
import { v1 } from 'uuid';
import { CalculationEso } from '../CalculationEso/CalculatioEso';
import { Gym } from '../../../../Common/Gym/Gym';
import { EditableSpan } from '../../../../Common/EditableSpan/EditableSpan';
import {FiTrash} from "react-icons/fi"



export const ReportEso = () => {

  const componentRef = useRef()
  const dispatch = useAppDispatch()
  const [value, setValue] = useState<string>('')

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

  const changeReportTitleHandler = (id: string, key: string, parameter: string) => {
    dispatch(updateReportTitleTC({ reportId: id, key: key, parameter: parameter }))
  }

  const changeStandardDateHandler = (reportId: string, key: string, title: string) => {
    dispatch(updateStandardsDateTC({ reportId: reportId, key: key, parameter: title }))
  }

  const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value)
  }

  const onblurHandler = (reportId: string) => {
    if (value.trim() !== '') {
      dispatch(addNewCalibrationFieldTC({reportId: reportId, calculationId: v1(),  dot: +value,}))
    }
    setValue('')
  }


  return (
    //  @ts-ignore 
    <div className={st.container} onDoubleClick={pdfHandler} ref={componentRef} >

      <div className={st.page}>
        <ReportHeader />
        <ReportFirstPage report={report!} changeReportTitle={changeReportTitleHandler} />
      </div>
      <div className={st.page}>
        <ReportSecondPage report={report!} changeStandardDate={changeStandardDateHandler} />
        
      </div>
      {
        report!.calculation.map((el, i) => {
          return (
            <div key={i} className={st.page}>
               <div className={st.header}>
                <span className={st.headerTitle}>Протокол  {report.reportNumber}</span>
                <span className={st.headerTitle}>от {report.calibrationDate}</span>
                <span className={st.headerTitle}>страница {i+3} страниц 5</span>
            </div>
              <CalculationEso calculation={el}  />
              <div className={st.delete}>
              <FiTrash/>
              </div>
              
              
            </div>
          )
        })
      }
      <div className={st.page}>
      <div className={st.header}>
                <span className={st.headerTitle}>Протокол  {report!.reportNumber}</span>
                <span className={st.headerTitle}>от {report!.calibrationDate}</span>
                <span className={st.headerTitle}>страница {5} страниц 5</span>
            </div>
            <div className={st.inputBlock}><Input value={value} onChange={inputHandler} onBlur={()=>{onblurHandler(report.reportId)}} />
          <span className={st.spanInput}>Добавьте точку калибровки</span></div>
          <div className={st.gym}>
        <Gym/>
      </div>
      <div className={st.final}>
        <span>Заключение о соответствии:</span>
        <div className={st.final}>
          <span>{`${report!.calibrationObjectName} ${report!.calibrationObjectType} ${report!.serialNumber}` }</span>
        </div>
        <div className={st.final}>
          <span> в калибруемых точках соответствует обязательным метрологическим требованиям в соответствии с описанием типа при установлении соответствия применно правило принятия решения, основанное на простой приёмке в соответствии с СТБ ISO/IEC Guide 98-4-2019</span>
        </div>
        <div className={st.final}>
        
          <span>Калибровочное клеймо: </span>
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
      </div>

      

    </div>
  )
}


