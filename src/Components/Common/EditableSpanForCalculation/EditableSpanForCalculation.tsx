import React, { ChangeEvent, useState, KeyboardEvent  } from 'react';
import st from './EditableSpanForCalculation.module.css'

type EditableSpanForCalculationPropsType = {
    title: string
    changeTitle: (title: string) => void
    }

export const EditableSpanForCalculation = ({title, changeTitle ,...props}: EditableSpanForCalculationPropsType) => {
    
 const [value, setValue] = useState(title)
 const [mode, setEditMode] = useState <boolean>(true)

 const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    // console.log(e.currentTarget.value);
    setValue(e.currentTarget.value)   
}

const onKeyPressHandler = (e: KeyboardEvent <HTMLInputElement>) => {
    if(value.trim() !== '' &&  e.key === 'Tab'){
        changeTitle(value)
        setEditMode(false)
    } 
}

// const onBlurHandler = () => {
//     if(value.trim() !== ''){
//         changeTitle(value)
//         setEditMode(false)
//     } 
// }

const onClickHandler = () => {
    setEditMode(true)
}
    return  mode
            ?<input className={st.inputSpan} type="text" value={value} 
            onChange={onChangeHandler} 
            // onBlur={onBlurHandler}
            onKeyDown={onKeyPressHandler} autoFocus/>
            : <span className={st.text} onClick={onClickHandler}>{title}</span>
}