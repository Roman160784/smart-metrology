import React from "react";
import st from "./CalibrationHV.module.css";
import { ReportHeaderTC } from "../Common/ReportHeaderTC";
import { EditableSpan } from "../../../Common/EditableSpan/EditableSpan";
import { useSelector } from "react-redux";
import { selectReportHVequpment } from "../../../../Redux/selectors/eso-report-selectors";
import { useAppDispatch } from "../../../../Redux/store";
import { ReportHVType, StringKeys, changeReportTitleHVTC } from "../../../../Redux/HVeqipmentReducer";






export const CalibrationHVFirstPage = () => {

    let reportHVEqupment = useSelector(selectReportHVequpment)
    const dispatch = useAppDispatch()

    const changeReportTitleHandler = ( key: StringKeys<ReportHVType>, parameter: string) => { 
      dispatch(changeReportTitleHVTC({ key,parameter}))};

    return (
        <div className={st.pageFirst}>
            <ReportHeaderTC/>
            <div className ={st.reportNumber}>{'ПРОТОКОЛ КАЛИБРОВКИ № '}  
            <EditableSpan title={reportHVEqupment.reportNumber}
                 changeTitle={(title)=>{changeReportTitleHandler('reportNumber', title)}}/>
            </div>
            <table className={st.table} border={1}>
        <tbody>
            <tr>
                <td>Объект калибровки</td>
                <td><EditableSpan title={reportHVEqupment.calibrationObjectType}
                 changeTitle={(title)=>{changeReportTitleHandler('calibrationObjectType', title)}}/></td>
            </tr>
            <tr>
                <td>Заводской номер</td>
                <td><EditableSpan title={reportHVEqupment.serialNumber} 
                changeTitle={(title)=>{changeReportTitleHandler('serialNumber', title)}}/></td>
            </tr>
            <tr>
                <td>Основания для проведения калибровки</td>
                <td><EditableSpan title={reportHVEqupment.application} 
                changeTitle={(title)=>{changeReportTitleHandler('application', title)}}/></td>
            </tr>
            <tr>
                <td>Наименование заказчика</td>
                <td>
                    {/* <input type="text" value={search} onChange={searchHandler}/> */}
                    <EditableSpan title={reportHVEqupment.customer} 
                changeTitle={(title)=>{changeReportTitleHandler('customer', title)}}/>
                </td>
            </tr>
            <tr>
                <td>Адрес Заказчика</td>
                <td><EditableSpan title={reportHVEqupment.adresCustumer} 
                changeTitle={(title)=>{changeReportTitleHandler('adresCustumer', title)}}/></td>
            </tr>
            <tr>
                <td>Место проведения калибровки</td>
                <td>государственное предприятие "Гомельский ЦСМС"</td>
            </tr>
            <tr>
                <td>Дата проведения калибровки</td>
                <td><EditableSpan title={reportHVEqupment.calibrationDate} 
                changeTitle={(title)=>{changeReportTitleHandler('calibrationDate', title)}}/></td>
            </tr>
            <tr>
                <td>Метод, методика калибровки </td>
                <td>
                    <EditableSpan title={reportHVEqupment.method} 
                changeTitle={(title)=>{changeReportTitleHandler('method', title)}}/>
                    <EditableSpan title={reportHVEqupment.methodType} 
                changeTitle={(title)=>{changeReportTitleHandler('methodType', title)}}/>
                </td>
            </tr>
            <tr>
                <td>Условия проведения калибровки</td>
                <tr>
                    <td className={st.tempreture}> 
                    Температура воздуха: <EditableSpan title={reportHVEqupment.temperature} 
                    changeTitle={(title)=>{changeReportTitleHandler('temperature', title)}}/> ºС</td>
                </tr>
                <tr>
                    <td className={st.tempreture}>
                        Относительная влажность воздуха: <EditableSpan title={reportHVEqupment.relativeHumidity} 
                        changeTitle={(title)=>{changeReportTitleHandler('relativeHumidity', title)}}/> %</td>
                </tr>
                <tr>
                    <td className={st.tempreture}>
                        Атмосферное давление: <EditableSpan title={reportHVEqupment.pressure} 
                       changeTitle={(title)=>{changeReportTitleHandler('pressure', title)}}/> кПа</td>
                </tr>
                <tr>
                    <td className={st.tempreture}>
                        Напряжение питающей сети: <EditableSpan title={reportHVEqupment.supplyVoltage} 
                        changeTitle={(title)=>{changeReportTitleHandler('supplyVoltage', title)}}/> В</td>
                </tr>
                <tr>
                    <td className={st.tempreture}>
                        Частота питающей сети: <EditableSpan title={reportHVEqupment.frequency} 
                        changeTitle={(title)=>{changeReportTitleHandler('frequency', title)}}/> Гц</td>
                </tr>
            </tr>
            </tbody>
        </table>
        </div>
    )
}