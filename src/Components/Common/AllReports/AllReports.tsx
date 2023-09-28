import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addReportEsoTC, ReportEsoType } from '../../../Redux/EsoReducer';
import { selectReportEso } from '../../../Redux/selectors/eso-report-selectors';
import { useAppDispatch } from '../../../Redux/store';
import { ReportEso } from '../../Sectors/EMiR/EmirEso/ReportEso/ReportEso';
import { pathEmirEnum } from '../../Sectors/EMiR/EmirNavReports/EmirNavReports';
import { Button } from '../Button/Button';
import st from './AllReports.module.css'


export const AllReports = () => {


    let allReports: ReportEsoType[] = []
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const reportEso = useSelector(selectReportEso)
    //Ловим тип из URL
    const urlRef = useRef('');

    let typeSi = ''
    urlRef.current = window.location.href;
    typeSi = urlRef.current

    if (typeSi.split('/').includes('eso')) {
        allReports = reportEso
    }


    const onClickButtonHandler = () => {
        dispatch(addReportEsoTC({}))
    }


    return (

        <div >
            <div className={st.mainBlock}>
                <span className={st.title}>№ Протокола</span>
                <span className={st.title}>Дата калибровки</span>
                <span className={st.title}>Тип СИ</span>
                <span className={st.title}>Заводской номер</span>
                <span className={st.title}>Номер свидетельства о калибровке</span>
                <span className={st.title}>Заказчик</span>
                <span className={st.push}>
                    <Button disabled={false} title={'Добавить протокол +'} onClick={onClickButtonHandler} />
                </span>
            </div>
            <div>
                {
                   allReports.map((el) => {
                    return(
                        <div className={st.secondBlock} key={el.reportId}>
                            <span className={st.secondBlockTitle}>{el.reportNumber}</span>
                            <span className={st.secondBlockTitle}> {el.calibrationDate}</span>
                            <span className={st.secondBlockTitle}>{el.calibrationObjectType}</span>
                            <span className={st.secondBlockTitle}>{el.serialNumber}</span>
                            <span className={st.secondBlockTitle}>{el.stigma}</span>
                            <span className={st.secondBlockTitle}>{el.customer}</span>
                        </div>
                    )
                   }) 
                }
            </div>
        </div>


    )
}