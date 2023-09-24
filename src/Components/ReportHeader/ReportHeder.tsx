import React from 'react';
import st from './ReportHeader.module.css'
import bgca from '../../Pictures/bgca.jpg'
import iso from '../../Pictures/iso.png'


export const ReportHeader = () => {

    return (
        <>
        <div className={st.mainHeaderBlock}>
            <div className={st.title}>
                РЕСПУБЛИКАНСКОЕ УНИТАРНОЕ ПРЕДПРИЯТИЕ
                <br />
                «ГОМЕЛЬСКИЙ ЦЕНТР СТАНДАРТИЗАЦИИ, МЕТРОЛОГИИ И
                <br />
                СЕРТИФИКАЦИИ»
            </div>
            <div className={st.pictures}>
                Свидетельство об
                <br />
                уполномочивании №16
                <br />
                от 25.11.2022
                <br />
                <img className={st.pic} src={bgca} alt="bgca" />
                <img className={st.pic2} src={iso} alt="iso" />
            </div>
            
        </div>
        <div className={st.adress}>
                <div className={st.metr}>Отдел метрологии</div>
                <div className={st.adr}>246015, г.Гомель, ул.Лепешинского, 1</div>
                <div className={st.tel}>тел. +375 232 26-33-03      mail@gomelcsms.by        www.gomelcsms.by</div>
            </div>
        </>
    )
}