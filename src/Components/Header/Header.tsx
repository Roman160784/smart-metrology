import React from 'react';
import gomelCSMS from '../../Pictures/gcscms-headimg.png'
import st from './header.module.css'

export const Header = () => {
    return (

        <>
            <img className={st.headerBlock} src={gomelCSMS} alt="Gomel CSMS" />
        </>


    )
}