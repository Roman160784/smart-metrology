import React from 'react';
import st from './Button.module.css'

type ButtonPropsType = {
    disabled: boolean
    title: string
    onClick: () => void

}

export const Button = ({ disabled, title, onClick, ...props }: ButtonPropsType) => {
    return (
        <button className={st.push} disabled={disabled}  onClick={onClick}>{title}</button>
)
}