import React from 'react';
import { StandardsTableHeader } from '../Common/StandardsTableHeader/StandardsTableHeader';
import st from './ReportSecondPage.module.css'


type ReportSecondPagePropsType = {

}


export const ReportSecondPage = () => {

    return (
        <div>
            <div className={st.header}>
                <span className={st.headerTitle}>Протокол  №11/23/2160к</span>
                <span className={st.headerTitle}>от 11.11.2023</span>
                <span className={st.headerTitle}>страница 2 страниц 5</span>
            </div>
            <div className={st.standards}>
                Эталоны, применяемые при калибровке:
            </div>
            <div className={st.stansardsTable}>
                <table border={1}>
                    <tbody>
                        <StandardsTableHeader />
                        <tr>
                            <td>Мера-имитатор</td>
                            <td>Р40116</td>
                            <td>090</td>
                            <td>-</td>
                            <td>11.2022</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className={st.traceability}>
                <span>Обеспечивается прослеживаемость результатов измерений до Национального эталона электрического сопротивления - Ома НЭ РБ 29-16</span>
            </div>
            <div className={st.mathModel}>
                Математическая модель: Rx = Ri0 +ΔR0 +δind
                <div>
                    где:
                </div>
                <div>Rx – показания калибруемого устройства, Ом</div>
                <div> Ri0 – показания эталона, Ом</div>
                <div> ΔR0 – основная абсолютная погрешность эталона, Ом</div>
                <div> δind – поправка, обусловленная разрешающей способность, Ом</div>
            </div>
            <div className={st.mathModel}>
                <div >Корреляция входных величин: отсутствует.</div>
                <div >Результаты измерений и наблюдений:</div>
                <div > 1 Внешний осмотр: соответствует : МК.ГМ 1580 - 2013</div>
                <div > 2 Опробование: соответствует:  МК.ГМ 1580 - 2013</div>
                <div> 3 Определение значений  на калибруемых отметках:</div>
            </div>
            
        </div>
    )
}