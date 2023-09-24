import React from 'react';
import { EditableSpan } from '../Common/EditableSpan/EditableSpan';
import st from './ReportFirstPage.module.css'


export const ReportFirstPage = () => {

    return (
        <>
        <div>
        <div className={st.reportNumber}>ПРОТОКОЛ КАЛИБРОВКИ № {''} 
        <EditableSpan title={'11/23/2160к'} changeTitle={() => {}}/>
        </div>
        <table border={1}>
        <tbody>
            <tr>
                <td>Объект калибровки</td>
                <td>Объект калибровки:</td>
            </tr>
            <tr>
                <td>Заводской номер</td>
                <td>Заводской номер</td>
            </tr>
            <tr>
                <td>Основания для проведения калибровки</td>
                <td>Основания для проведения калибровки</td>
            </tr>
            <tr>
                <td>Наименование заказчика</td>
                <td>Наименование заказчика</td>
            </tr>
            <tr>
                <td>Адрес Заказчика</td>
                <td>Адрес Заказчика</td>
            </tr>
            <tr>
                <td>Место проведения калибровки</td>
                <td>Место проведения калибровки</td>
            </tr>
            <tr>
                <td>Место проведения калибровки</td>
                <td>Место проведения калибровки</td>
            </tr>
            <tr>
                <td>Дата проведения калибровки</td>
                <td>11.11.2023</td>
            </tr>
            <tr>
                <td>Метод, методика калибровки </td>
                <td>МК.ГМ 1580 - 2013, Метод прямых измерений</td>
            </tr>
            <tr>
                <td>Условия проведения калибровки</td>
                <tr>
                    <td>Температура воздуха: <EditableSpan title={'21.0'} changeTitle={() => {}}/> ºС</td>
                </tr>
                <tr>
                    <td>Относительная влажность воздуха: <EditableSpan title={'37.0'} changeTitle={() => {}}/> %</td>
                </tr>
                <tr>
                    <td>Атмосферное давление: <EditableSpan title={'100.0'} changeTitle={() => {}}/> кПа</td>
                </tr>
                <tr>
                    <td>Напряжение питающей сети: <EditableSpan title={'37.0'} changeTitle={() => {}}/> В</td>
                </tr>
                <tr>
                    <td>Частота питающей сети: <EditableSpan title={'37.0'} changeTitle={() => {}}/> Гц</td>
                </tr>
            </tr>
            </tbody>
        </table>
        </div>
        </>
    )
}