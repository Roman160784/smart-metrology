import React from 'react';
import { EditableSpan } from '../Common/EditableSpan/EditableSpan';
import st from './ReportFirstPage.module.css'


type ReportFirstPageType = {

changeReportTitle: (title: string) => void
}

export const ReportFirstPage = ({changeReportTitle, ...props} : ReportFirstPageType) => {

    return (
        <>
        <div>
        <div className={st.reportNumber}>ПРОТОКОЛ КАЛИБРОВКИ № {''} 
        <EditableSpan title={'11/23/2160к'} changeTitle={() => {}}/>
        </div >
        <table className={st.table} border={1}>
        <tbody>
            <tr>
                <td>Объект калибровки</td>
                <td><EditableSpan title={'Мегаомметр ЭС0202/2-Г'} changeTitle={() => {}}/></td>
            </tr>
            <tr>
                <td>Заводской номер</td>
                <td><EditableSpan title={'1111'} changeTitle={() => {}}/></td>
            </tr>
            <tr>
                <td>Основания для проведения калибровки</td>
                <td><EditableSpan title={'Заявка на калибровку № 001341 от 13.01.2023'} changeTitle={() => {}}/></td>
            </tr>
            <tr>
                <td>Наименование заказчика</td>
                <td><EditableSpan title={'РУП Гомельэнерго Ф-л Инженерный центр'} changeTitle={() => {}}/></td>
            </tr>
            <tr>
                <td>Адрес Заказчика</td>
                <td><EditableSpan title={'246028, г Гомель ул. Головацкого 19/212'} changeTitle={() => {}}/></td>
            </tr>
            <tr>
                <td>Место проведения калибровки</td>
                <td>госурарственное предприятие "Гомельский ЦСМС"</td>
            </tr>
            <tr>
                <td>Дата проведения калибровки</td>
                <td><EditableSpan title={'11.11.2023'} changeTitle={() => {}}/></td>
            </tr>
            <tr>
                <td>Метод, методика калибровки </td>
                <td><EditableSpan title={'МК.ГМ 1580 - 2013, Метод прямых измерений'} changeTitle={() => {}}/></td>
            </tr>
            <tr>
                <td>Условия проведения калибровки</td>
                <tr>
                    <td className={st.tempreture}> 
                    Температура воздуха: <EditableSpan title={'21.0'} changeTitle={() => {}}/> ºС</td>
                </tr>
                <tr>
                    <td className={st.tempreture}>
                        Относительная влажность воздуха: <EditableSpan title={'37.0'} changeTitle={() => {}}/> %</td>
                </tr>
                <tr>
                    <td className={st.tempreture}>
                        Атмосферное давление: <EditableSpan title={'100.0'} changeTitle={() => {}}/> кПа</td>
                </tr>
                <tr>
                    <td className={st.tempreture}>
                        Напряжение питающей сети: <EditableSpan title={'37.0'} changeTitle={() => {}}/> В</td>
                </tr>
                <tr>
                    <td className={st.tempreture}>
                        Частота питающей сети: <EditableSpan title={'37.0'} changeTitle={() => {}}/> Гц</td>
                </tr>
            </tr>
            </tbody>
        </table>
        </div>
        </>
    )
}