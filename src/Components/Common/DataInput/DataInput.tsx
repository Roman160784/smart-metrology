import React, { ChangeEvent, useState, KeyboardEvent } from 'react';


export type DataInputPropsType = {
    setData: (data: number[]) => void
}


export const DataInput = ({ setData, ...props }: DataInputPropsType) => {

    const random = () => {
        let res = ''
        let arr = []
        let a = randomInteger(-1.48, 1.48)
        let b = randomInteger(-89, 89)
        let c = randomInteger(-0.73, 0.73)
        let d = randomInteger(-44, 44)
        let e = randomInteger(-0.48, 0.48)
        let f = randomInteger(-29, 29)
        let g = randomInteger(-0.48, 0.48)
        let h = randomInteger(-29, 29)
        let j = randomInteger(-0.48, 0.48)
        let k = randomInteger(-29, 29)
        let l = randomInteger(-0.48, 0.48)
        let m = randomInteger(-29, 29)
    
         function randomInteger(min: number, max: number) {
            let rand = Math.random() * (max - min) + min;
            return rand.toFixed(2);
         } 
    
        
    arr.push(a, b, c, d, e, f, g, h, j, k, l, m)
    res = arr.join(' ')
       return res
    }


    let [value, setValue] = useState('')

    const [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }

    const addDataHandler = () => {
        if(value === '/') {
            value = random()
            setData(value.split(' ').map(e => +e));    
        } else if (value.trim() !== '' && !(value.match(/[a-z]/) || value.match(/[A-Z]/) || value.match(/[А-Я]/) || value.match(/[а-я]/))) {
            setData(value.replaceAll("\t"," ").replaceAll(',', '.').split(' ').map(e => Number(e)))
        }  else {
            setError('Не верные данные')
        }
    }

    const onBlurHandler = () => {
        addDataHandler()
        setValue('')
    }

    // pattern={"(-)?\d{1,}|(-)?\d{1,}(\.)\d{1,}|(-)?\d{1,}(\s)(-)?\d{1,}|(-)?\d{1,}(\s)(-)?\d{1,}(\s)(-)?\d{1,}"}

    return (
        <>
            <input value={value} autoFocus type="text" onChange={onChangeHandler} onBlur={onBlurHandler} />
            {/* {error && <div style={{ color: 'red' }}>{error}</div>} */}
        </>
    )

}