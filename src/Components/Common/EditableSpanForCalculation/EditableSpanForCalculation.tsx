import React, { ChangeEvent, useState, KeyboardEvent  } from 'react';
import st from './EditableSpanForCalculation.module.css'

type EditableSpanForCalculationPropsType = {
    title: string
    changeTitle: (title: number, toFixedValue: number) => void
    }

export const EditableSpanForCalculation = ({title, changeTitle ,...props}: EditableSpanForCalculationPropsType) => {
    
 const [value, setValue] = useState(title)
 const [mode, setEditMode] = useState <boolean>(true)
 const regex = /^[0-9,]*$/

 const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let newValue: string = e.currentTarget.value 
    if (regex.test(newValue.trim())) {
        setValue(newValue);
      }
}

const onKeyPressHandler = (e: KeyboardEvent <HTMLInputElement>) => {
    
    if(e.key === 'Tab'){
        let toFixedValue: number = 0
        let valueForCount: number = 0
        if(value.includes(',')){
            toFixedValue = value.split(",")[1]?.length || 0;
            valueForCount = +value.replace(",", ".") 
        }else{
            toFixedValue = 0
            valueForCount = +value
        }
        
        changeTitle(valueForCount, toFixedValue)
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