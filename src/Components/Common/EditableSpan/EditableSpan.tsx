import React, { ChangeEvent, useState } from 'react';
import st from './EditableSpan.module.css'


type EditableSpanPropsType = {
title: string
changeTitle: (title: string) => void
}

export const EditableSpan = ({title, changeTitle ,...props}: EditableSpanPropsType) => {

 const [value, setValue] = useState(title)
 const [mode, setEditMode] = useState <boolean>(false)

 const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.currentTarget.value);
    setValue(e.currentTarget.value)   
}

const onBlurHandler = () => {
    if(value.trim() !== ''){
        changeTitle(value)
        setEditMode(false)
    } 
}

const onClickHandler = () => {
    setEditMode(true)
}
    return  mode
            ?<input className={st.inputSpan} type="text" value={value} onChange={onChangeHandler} onBlur={onBlurHandler} autoFocus/>
            : <span className={st.text} onClick={onClickHandler}>{title}</span>
            
}