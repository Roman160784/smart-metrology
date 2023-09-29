import React from 'react';
import { ReportEsoType } from '../../Redux/EsoReducer';
import { EditableSpan } from '../Common/EditableSpan/EditableSpan';
import st from './ReportFirstPage.module.css'


type ReportFirstPageType = {
report : ReportEsoType
changeReportTitle: (reportId: string, key: string, parameter: string) => void
}

export const ReportFirstPage = ({changeReportTitle, report,...props} : ReportFirstPageType) => {

    return (
        <>
        <div>
        <div className={st.reportNumber}>ПРОТОКОЛ КАЛИБРОВКИ № {''} 
        <EditableSpan title={report.reportNumber!} changeTitle={(title) => {changeReportTitle( report.reportId, 'reportNumber', title)}}/>
        </div >
        <table className={st.table} border={1}>
        <tbody>
            <tr>
                <td>Объект калибровки</td>
                <td><EditableSpan title={`${report.calibrationObjectName} ${report.calibrationObjectType}`} changeTitle={() => {}}/></td>
            </tr>
            <tr>
                <td>Заводской номер</td>
                <td><EditableSpan title={report.serialNumber} changeTitle={() => {}}/></td>
            </tr>
            <tr>
                <td>Основания для проведения калибровки</td>
                <td><EditableSpan title={report.application} changeTitle={() => {}}/></td>
            </tr>
            <tr>
                <td>Наименование заказчика</td>
                <td><EditableSpan title={report.customer} changeTitle={() => {}}/></td>
            </tr>
            <tr>
                <td>Адрес Заказчика</td>
                <td><EditableSpan title={report.adresCustumer} changeTitle={() => {}}/></td>
            </tr>
            <tr>
                <td>Место проведения калибровки</td>
                <td>госурарственное предприятие "Гомельский ЦСМС"</td>
            </tr>
            <tr>
                <td>Дата проведения калибровки</td>
                <td><EditableSpan title={report.calibrationDate} changeTitle={() => {}}/></td>
            </tr>
            <tr>
                <td>Метод, методика калибровки </td>
                <td><EditableSpan title={report.method} changeTitle={() => {}}/></td>
            </tr>
            <tr>
                <td>Условия проведения калибровки</td>
                <tr>
                    <td className={st.tempreture}> 
                    Температура воздуха: <EditableSpan title={report.calibrationConditions.temperature} 
                    changeTitle={() => {}}/> ºС</td>
                </tr>
                <tr>
                    <td className={st.tempreture}>
                        Относительная влажность воздуха: <EditableSpan title={report.calibrationConditions.relativeHumidity} 
                        changeTitle={() => {}}/> %</td>
                </tr>
                <tr>
                    <td className={st.tempreture}>
                        Атмосферное давление: <EditableSpan title={report.calibrationConditions.pressure} 
                        changeTitle={() => {}}/> кПа</td>
                </tr>
                <tr>
                    <td className={st.tempreture}>
                        Напряжение питающей сети: <EditableSpan title={report.calibrationConditions.supplyVoltage} 
                        changeTitle={() => {}}/> В</td>
                </tr>
                <tr>
                    <td className={st.tempreture}>
                        Частота питающей сети: <EditableSpan title={report.calibrationConditions.frequency} 
                        changeTitle={() => {}}/> Гц</td>
                </tr>
            </tr>
            </tbody>
        </table>
        </div>
        </>
    )
}