import React from 'react';
import { ReportEsoType } from '../../Redux/EsoReducer';
import { ReportMrp120Type } from '../../Redux/Mrp120Reducer';
import { EditableSpan } from '../Common/EditableSpan/EditableSpan';
import { StandardsTableHeader } from '../Common/StandardsTableHeader/StandardsTableHeader';
import st from './ReportSecondPage.module.css'


type ReportSecondPagePropsType = {
    report : ReportEsoType | ReportMrp120Type
    changeStandardDate: (reportId: string, key: string, title: string, id: string) => void
    lastPage: number
}


export const ReportSecondPage = ({report, changeStandardDate, lastPage, ...props}: ReportSecondPagePropsType) => {

    return (
        <div>
            <div className={st.header}>
                <span className={st.headerTitle}>Протокол  {report.reportNumber}</span>
                <span className={st.headerTitle}>от {report.calibrationDate}</span>
                <span className={st.headerTitle}>страница 2 страниц {lastPage}</span>
            </div>
            <div className={st.standards}>
                Эталоны, применяемые при калибровке:
            </div>
            <div className={st.stansardsTable}>
                <table border={1}>
                    <tbody>
                        <StandardsTableHeader />
                        
                            {
                                report.standard.map((el, i) => {
                                    return (
                                        <tr key={i}>
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
                                        changeTitle={(title) => {changeStandardDate(report.reportId, 'calibrationDate', title, el.id)}}/>
                                        </td>
                                        </tr>
                                    )
                                    
                                })
                            }
                          
                    </tbody>
                </table>
            </div>
            <div className={st.traceability}>
                <span>{report.traceability}</span>
            </div>
            <div className={st.mathModel}>
                {report.mathModel}
                <div>
                    где:
                </div>
              {
                report.mathModelData.map((el, i) => {
                    return(
                        <div key={i}>{el}</div>
                    )
                })
              }
            </div>
            <div className={st.mathModel}>
                <div >Корреляция входных величин: отсутствует.</div>
                <div >Результаты измерений и наблюдений:</div>
                <div > 1 Внешний осмотр: соответствует : {report.method}</div>
                <div > 2 Опробование: соответствует:  {report.method}</div>
                <div> 3 Определение значений  на калибруемых отметках:</div>
            </div>
            
        </div>
    )
}