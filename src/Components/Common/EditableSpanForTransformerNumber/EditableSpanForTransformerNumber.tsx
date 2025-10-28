import React, { ChangeEvent, useState, KeyboardEvent } from 'react';
// import classes from './editableSpan.module.css'

type EditableSpanPropsType = {
    title: string
    changeTitle: (title: string) => void
}

export const EditableSpanForTransformersNumber = ({ title, changeTitle, ...props }: EditableSpanPropsType) => {

   

    const [value, setValue] = useState<string>('')
    const [mode, setMode] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
        setError(null)
       
    }

    const onBlurHandler = () => {
         if (value.trim() !== '') {
            changeTitle(value)
            setValue('')
            setMode(false)
        }
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter') {
            onBlurHandler()
            setValue('')
        }
    }

    return (
        <>
            {mode
                ? <input type="text" value={value} onChange={onChangeHandler}
                        onBlur={onBlurHandler}  autoFocus   onKeyDown={onKeyDownHandler}/>
                        // onBlur={onBlurHandler}  autoFocus  className={classes.inputName} onKeyDown={onKeyDownHandler}/>
                : <span style={{color: 'blue'}} onDoubleClick={() => {setMode(true)}}>{title}</span>}
            
            {/* <div className={classes.inputClick}>Кликни дважды для изменения названия</div> */}
            {/* {error && <div className={classes.error}>{error}</div>} */}
        </>

    )

}