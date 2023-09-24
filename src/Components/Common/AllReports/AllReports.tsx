import React , { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReportEso } from '../../ReportEso/ReportEso';
import { pathEmirEnum } from '../../Sectors/EMiR/EmirNavReports/EmirNavReports';
import { Button } from '../Button/Button';
import st from './AllReports.module.css'


export const AllReports = () => {

    const navigate = useNavigate() 

    //Ловим тип из URL
    const urlRef = useRef('');
    let typeSi = ''
    urlRef.current = window.location.href; 
    typeSi = urlRef.current
     
    const onClickButtonHandler = () => {
        if (typeSi.split('/').includes('eso')){
            navigate(pathEmirEnum.reportEso)
            
        }else (
            navigate(pathEmirEnum.esoAll)
        )
    }
    

    return (
        
        <div className={st.mainBlock}>
            <div>
            <span className={st.title}>№ Протокола</span>
            <span className={st.title}>Дата калибровки</span>
            <span className={st.title}>Тип СИ</span>
            <span className={st.title}>Заводской номер</span>
            <span className={st.title}>Номер свидетельства о калибровке</span>
            <span className={st.title}>Заказчик</span>
            <span className={st.push}> 
            <Button disabled={false} title={'Добавить протокол калибровки +'} onClick={onClickButtonHandler}/>
            </span>
            </div>
        </div>
        
        
    )
}