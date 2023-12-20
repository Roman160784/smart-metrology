import React, { ChangeEvent, useEffect, useState } from 'react';
import useDebounce from '../../Hooks/useDebounce';
import { ReportEsoType } from '../../Redux/EsoReducer';
import { ReportMrp120Type } from '../../Redux/Mrp120Reducer';
import { useAppDispatch } from '../../Redux/store';
import { EditableSpan } from '../Common/EditableSpan/EditableSpan';
import st from './ReportFirstPage.module.css'


type ReportFirstPageType = {
report : ReportEsoType | ReportMrp120Type 
changeReportTitle: (reportId: string, key: string, parameter: string) => void
}

export const ReportFirstPage = ({changeReportTitle, report,...props} : ReportFirstPageType) => {

    // const dispatch = useAppDispatch()
    // const [search, setSearch] = useState<string>('')

    // const debonsedSerchValue = useDebounce( search, 1000)

    // useEffect(() => {
    //     dispatch(findCustomerTC({search: debonsedSerchValue}))
    // }, [debonsedSerchValue])

    // const searchHandler = (e: ChangeEvent <HTMLInputElement>) => {
    //     setSearch(e.currentTarget.value) 
    // }

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
                <td><EditableSpan title={`${report.calibrationObjectName} ${report.calibrationObjectType}`}
                 changeTitle={(title) => {changeReportTitle( report.reportId, 'calibrationObjectType', title)}}/></td>
            </tr>
            <tr>
                <td>Заводской номер</td>
                <td><EditableSpan title={report.serialNumber} 
                changeTitle={(title) => {changeReportTitle( report.reportId, 'serialNumber', title)}}/></td>
            </tr>
            <tr>
                <td>Основания для проведения калибровки</td>
                <td><EditableSpan title={report.application} 
                changeTitle={(title) => {changeReportTitle( report.reportId, 'application', title)}}/></td>
            </tr>
            <tr>
                <td>Наименование заказчика</td>
                <td>
                    {/* <input type="text" value={search} onChange={searchHandler}/> */}
                    <EditableSpan title={report.customer} 
                changeTitle={(title) => {changeReportTitle( report.reportId, 'customer', title)}}/>
                </td>
            </tr>
            <tr>
                <td>Адрес Заказчика</td>
                <td><EditableSpan title={report.adresCustumer} 
                changeTitle={(title) => {changeReportTitle( report.reportId, 'adresCustumer', title)}}/></td>
            </tr>
            <tr>
                <td>Место проведения калибровки</td>
                <td>государственное предприятие "Гомельский ЦСМС"</td>
            </tr>
            <tr>
                <td>Дата проведения калибровки</td>
                <td><EditableSpan title={report.calibrationDate} 
                changeTitle={(title) => {changeReportTitle( report.reportId, 'calibrationDate', title)}}/></td>
            </tr>
            <tr>
                <td>Метод, методика калибровки </td>
                <td><EditableSpan title={report.method} 
                changeTitle={(title) => {changeReportTitle( report.reportId, 'method', title)}}/></td>
            </tr>
            <tr>
                <td>Условия проведения калибровки</td>
                <tr>
                    <td className={st.tempreture}> 
                    Температура воздуха: <EditableSpan title={report.temperature} 
                    changeTitle={(title) => {changeReportTitle( report.reportId, 'temperature', title)}}/> ºС</td>
                </tr>
                <tr>
                    <td className={st.tempreture}>
                        Относительная влажность воздуха: <EditableSpan title={report.relativeHumidity} 
                        changeTitle={(title) => {changeReportTitle( report.reportId, 'relativeHumidity', title)}}/> %</td>
                </tr>
                <tr>
                    <td className={st.tempreture}>
                        Атмосферное давление: <EditableSpan title={report.pressure} 
                        changeTitle={(title) => {changeReportTitle( report.reportId, 'pressure', title)}}/> кПа</td>
                </tr>
                <tr>
                    <td className={st.tempreture}>
                        Напряжение питающей сети: <EditableSpan title={report.supplyVoltage} 
                        changeTitle={(title) => {changeReportTitle( report.reportId, 'supplyVoltage', title)}}/> В</td>
                </tr>
                <tr>
                    <td className={st.tempreture}>
                        Частота питающей сети: <EditableSpan title={report.frequency} 
                        changeTitle={(title) => {changeReportTitle( report.reportId, 'frequency', title)}}/> Гц</td>
                </tr>
            </tr>
            </tbody>
        </table>
        </div>
        </>
    )
}