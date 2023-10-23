import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addReportEsoTC, removeReportTC, ReportEsoType } from '../../../Redux/EsoReducer';
import { selectReportE6, selectReportEso, selectReportMrp120 } from '../../../Redux/selectors/eso-report-selectors';
import { useAppDispatch } from '../../../Redux/store';
import {FiTrash} from "react-icons/fi"
import { Button } from '../Button/Button';
import st from './AllReports.module.css'
import { pathEmirEnum } from '../../Sectors/EMiR/EmirNavReports/EmirNavReports';
import { addNewReportMrp120TC, removeReportMrp120TC, ReportMrp120Type } from '../../../Redux/Mrp120Reducer';
import { v1 } from 'uuid';
import { addNewReportE6TC, removeReportE6TC, ReportE6Type } from '../../../Redux/E6Reducer';


export const AllReports = () => {


    let allReports: ReportEsoType[] | ReportMrp120Type[] | ReportE6Type[] = []
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const reportsEso = useSelector(selectReportEso)
    const reportsMrp120 = useSelector(selectReportMrp120)
    const reportE6 = useSelector(selectReportE6)
    //Ловим тип из URL
    const urlRef = useRef('');

    let typeSi = ''
    urlRef.current = window.location.href;
    typeSi = urlRef.current

    if (typeSi.split('/').includes('eso')) {
        allReports = reportsEso
    } else if (typeSi.split('/').includes('mrp')) {
        allReports = reportsMrp120
    }else if (typeSi.split('/').includes('e6')) {
        allReports = reportE6
    }

    const addReportHandler = () => {
        if (typeSi.split('/').includes('eso')){
            dispatch(addReportEsoTC({}))
        } else if(typeSi.split('/').includes('mrp')){
            dispatch(addNewReportMrp120TC({reportId: v1()}))
        }else if(typeSi.split('/').includes('e6')){
            dispatch(addNewReportE6TC({reportId: v1()}))
        }
    }

    const removeReportHandler = (reportId: string) => {
        if (typeSi.split('/').includes('eso')){
        dispatch(removeReportTC({reportId: reportId}))
        }else if(typeSi.split('/').includes('mrp')){
            dispatch(removeReportMrp120TC({reportId: reportId}))
        }else if(typeSi.split('/').includes('e6')){
            dispatch(removeReportE6TC({reportId: reportId}))
        }
    }

    const updateReport = (reportId: string) => {
        if (typeSi.split('/').includes('eso')) {
            navigate(`/reportEso/${reportId}`)
        }else if (typeSi.split('/').includes('mrp')) {
            navigate(`/reportMrp120/${reportId}`)
        }else if(typeSi.split('/').includes('e6')){
            navigate(`/reportE6andPsi/${reportId}`)
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
                   allReports.map((el, i) => {
                    return(
                        <div className={st.secondBlock} key={i}>
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