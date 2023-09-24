import React from 'react';
import { Button } from '../Button/Button';
import st from './AllReports.module.css'


export const AllReports = () => {
    

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
            <Button disabled={false} title={'Добавить протокол калибровки +'} onClick={() => {}}/>
            </span>
            </div>
        </div>
        
        
    )
}