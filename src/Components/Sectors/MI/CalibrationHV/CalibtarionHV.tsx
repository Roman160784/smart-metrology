import React, { useRef, useState } from "react";
import st from "./CalibrationHV.module.css";
import { useReactToPrint } from 'react-to-print';
import { CalibrationHVFirstPage } from "./CalibrationHVFirstPage";
import { CalibrationHVSecondPage } from "./CalibrationHVSecondPage";
import { Input } from "../../../Common/Input/Input";
import { FiPrinter } from "react-icons/fi";
import { useSelector } from "react-redux";
import { selectReportHVequpment } from "../../../../Redux/selectors/eso-report-selectors";
import { CalculationHV } from "./CalculationHV";
import { useAppDispatch } from "../../../../Redux/store";
import { EditableSpan } from "../../../Common/EditableSpan/EditableSpan";
import { ReportHVType, StringKeys, addNewCalibratonFieldHVTC, changeReportTitleHVTC, removeCalibratonFieldHVTC, updateCalibrationValueHVTC, updateCalibrationValueinArrayHVTC } from "../../../../Redux/HVeqipmentReducer";
import { useNavigate } from "react-router-dom";


export const CalibrationHV = () => {

    let reportHVEqupment = useSelector(selectReportHVequpment)
    const componentRef = useRef()
    const [lastPage, setLastPage] = useState<number>(3)
    const navigate = useNavigate()

    const dispatch = useAppDispatch()

    const changeReportTitleHandler = ( key: StringKeys<ReportHVType>, parameter: string) => { 
      dispatch(changeReportTitleHVTC({ key,parameter}))};
      
      const onblurHandler = (toFixedValue: number, dot: number) => {
       dispatch(addNewCalibratonFieldHVTC({toFixedValue, dot}))
      }
    
      const updateCalibrationValue = (id: string, calibrationValue: string) => {
        dispatch(updateCalibrationValueHVTC({id, calibrationValue}))
      }
      
      const removeCalibrationFieldHandler = (id: string) => {
        dispatch(removeCalibratonFieldHVTC({id}))
      }

      const updateCalibrationValueinArray = (id: string, i: number, value: number, toFixedValue: number) => {
        dispatch(updateCalibrationValueinArrayHVTC({id, i, value, toFixedValue}))
      }

      const pdfHandler = useReactToPrint({
        content: () => componentRef.current!,
        documentTitle: 'Report',
    })

    let pageCounter: number = 3

    const onSetLastPageHandler = ()=> {
      setLastPage(pageCounter)
    }

    const navigateToCertificate = () => {
      navigate(`/CertificatHV/`)
  }


  return (
    //  @ts-ignore >
    <div ref={componentRef}>
      <CalibrationHVFirstPage />
      <CalibrationHVSecondPage
       lastPage={lastPage}/>

        {
            reportHVEqupment.calculation.map((el,i) => {
              pageCounter++
                return(
                    <div key={i} className={st.pageFirst}>
                        <div className={st.header}>
                             <span className={st.headerItem}>Протокол {reportHVEqupment.reportNumber}</span>
                             <span className={st.headerItem}>от {reportHVEqupment.calibrationDate}</span>
                             <span className={st.headerItem}>страница {i + 3} страниц {lastPage}</span>
                    </div>
                    <CalculationHV calculation={el}
                    updateCalibrationValue={updateCalibrationValue}
                    removeCalibrationFieldHandler={removeCalibrationFieldHandler}
                    updateCalibrationValueinArray={updateCalibrationValueinArray}
                    />
                    </div>
                )
            })
        }

      <div className={st.pageFirst}>
        <div className={st.header}>
          <span className={st.headerItem}>Протокол {reportHVEqupment.reportNumber}</span>
          <span className={st.headerItem}>от {"11.11.2026"}</span>
          <span className={st.headerItem}>страница {lastPage} страниц {lastPage}</span>
        </div>
        <div>
          <div>
            <Input onBlur={(toFixedValue: number, valueForCount: number)=>{onblurHandler( toFixedValue, valueForCount)}}/>
            <span className={st.spanInput}>Добавьте точку калибровки</span>
          </div>
        </div>
        <div>
          Расширенная неопределённость получена путём умножения суммарной
          стандартной неопределённости на коэффициент охвата k = 2,
          соответствующий уровню доверия, приблизительно равному 95 % при
          допущении нормального распределения. Оценивание неопределённости
          проведено в соответствии с JCGM 100:2008 
        </div>
        <br />
     

<div 
  onClick={navigateToCertificate}
  onMouseEnter={(e) => e.currentTarget.style.color = 'green'}
  onMouseLeave={(e) => e.currentTarget.style.color = ''}
  style={{ cursor: 'pointer' }}>
  Выдано cвидетельство о калибровке: <span>{reportHVEqupment.reportNumber}</span>
</div>
        <br />
       

<div style={{ display: 'flex', alignItems: 'flex-start' }}>
  <div style={{ whiteSpace: 'nowrap', marginRight: '8px' }}>
    Калибровку выполнил:_________________
  </div>
  <div style={{ flex: 1 }}>
    <div style={{ 
      display: 'inline-block', 
      minWidth: '150px' 
    }}>
      <EditableSpan 
        title={reportHVEqupment.engineer}
        changeTitle={(title) => {changeReportTitleHandler('engineer', title)}}
      />
    </div>
  </div>
</div>
        <div className={st.printer} onClick={onSetLastPageHandler}>
      <FiPrinter onClick={pdfHandler}/>
      </div>
      </div>
    </div>
  );
};
