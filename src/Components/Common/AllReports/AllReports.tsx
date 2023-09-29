import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addReportEsoTC, removeReportTC, ReportEsoType } from '../../../Redux/EsoReducer';
import { selectReportEso } from '../../../Redux/selectors/eso-report-selectors';
import { useAppDispatch } from '../../../Redux/store';
import {FiTrash} from "react-icons/fi"
import { Button } from '../Button/Button';
import st from './AllReports.module.css'
import { pathEmirEnum } from '../../Sectors/EMiR/EmirNavReports/EmirNavReports';


export const AllReports = () => {


    let allReports: ReportEsoType[] = []
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const reportsEso = useSelector(selectReportEso)
    //Ловим тип из URL
    const urlRef = useRef('');

    let typeSi = ''
    urlRef.current = window.location.href;
    typeSi = urlRef.current

    if (typeSi.split('/').includes('eso')) {
        allReports = reportsEso
    }

    const addReportHandler = () => {
        dispatch(addReportEsoTC({}))
    }

    const removeReportHandler = (reportId: string) => {
        dispatch(removeReportTC({reportId: reportId}))
    }

    const updateReport = (reportId: string) => {
        if (typeSi.split('/').includes('eso')) {
            navigate(`/reportEso/${reportId}`)
            // navigate('/reportEso/:id')
        }
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
                    <Button disabled={false} title={'Добавить протокол +'} onClick={addReportHandler} />
                </span>
            </div>
            <div>
                {
                   allReports.map((el) => {
                    return(
                        <div className={st.secondBlock} key={el.reportId}>
                            <span onClick={() => {updateReport(el.reportId)}} className={st.secondBlockTitle}>{el.reportNumber}</span>
                            <span className={st.calibrationDate}> {el.calibrationDate}</span>
                            <span className={st.calibrationObjectType}>{el.calibrationObjectType}</span>
                            <span className={st.serialNumber}>{el.serialNumber}</span>
                            <span className={st.stigma}>{el.stigma}</span>
                            <span className={st.customer}>{el.customer}</span>
                            <span onClick={()=> {removeReportHandler(el.reportId)}} className={st.delete}>{<FiTrash/>}</span>
                        </div>
                    )
                   }) 
                }
            </div>
        </div>


    )
}