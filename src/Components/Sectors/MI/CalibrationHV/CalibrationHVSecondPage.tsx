import React from "react";
import st from "./CalibrationHV.module.css";
import { StandardsTableHeader } from "../../../Common/StandardsTableHeader/StandardsTableHeader";
import { EditableSpan } from "../../../Common/EditableSpan/EditableSpan";
import { useSelector } from "react-redux";
import { selectReportHVequpment } from "../../../../Redux/selectors/eso-report-selectors";
import { useAppDispatch } from "../../../../Redux/store";
import { ReportHVType, StringKeys, changeReportTitleHVTC, changeStandartDateHVTC } from "../../../../Redux/HVeqipmentReducer";



export const CalibrationHVSecondPage = () => {

    let reportHVEqupment = useSelector(selectReportHVequpment)
    const dispatch = useAppDispatch()

    const changeReportTitleHandler = ( key: StringKeys<ReportHVType>, parameter: string) => { 
      dispatch(changeReportTitleHVTC({ key,parameter}))};

    const changeStandatrDate = ( id: string, title: string) => { 
      dispatch(changeStandartDateHVTC({ id, title}))};

    return (
        <div className={st.pageFirst}>
            <div className={st.header}>
                <span className={st.headerItem}>Протокол  {reportHVEqupment.reportNumber}</span>
                <span className={st.headerItem}>от {reportHVEqupment.calibrationDate}</span>
                <span className={st.headerItem}>страница 2 страниц 3</span>
            </div>
            <div>
                Эталоны, приеняемые при калибровке:
            </div>
            <div>
            <table border={1}>
                    <tbody>
                        <StandardsTableHeader />
                        {
                          reportHVEqupment.standard.map((el) => {
                            return(
                                        <tr style={{
                                            fontSize:'12pt'
                                        }} key={el.id}>
                                        <td >
                                            {el.standardName}
                                        </td>
                                        <td >
                                            {el.standardType}
                                        </td>
                                        <td >
                                            {el.standardNumber}
                                        </td>
                                        <td >
                                            {el.value}
                                        </td>
                                        <td ><EditableSpan title={el.calibrationDate} 
                                        changeTitle={(title)=> {changeStandatrDate(el.id, title)}}/>
                                        </td>
                                        </tr>
                            )
                          })  
                        }    
                    </tbody>
                </table>
            </div>
            <div>
               {reportHVEqupment.traceability}
            </div>
            <br />
            <div>
            Математическая модель: 
             <span>{reportHVEqupment.mathModel} </span>
             <EditableSpan title={reportHVEqupment.mathModelValue} 
             changeTitle={(title)=> {changeReportTitleHandler('mathModelValue', title)} }/>
            </div>
            <div>
                Где:
                {reportHVEqupment.mathModelData.map((el, i) => {
                    return(
                        <div key={i}>{el}</div>
                    )
                })}
            </div>
            <br />
            <div>
            Корреляция входных величин: отсутствует.
            </div>
            <br />
            <div>
            Результаты измерений и наблюдений:
            </div>
            <div>
            1 Внешний осмотр: соответствует {reportHVEqupment.method} 
            </div>
            <div>
            2 Опробование: соответствует {reportHVEqupment.method} 
            </div>
            <div>
            <EditableSpan title={reportHVEqupment.protectionI} 
            changeTitle={(title)=> {changeReportTitleHandler('protectionI', title)} }/>
            
            </div>
            <div>
            3 Определение значений в точках калибровки:
            </div>
        </div>
    )
}