import React, { ChangeEvent, KeyboardEvent, useState } from 'react';

type InputType = {
    value?: string
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
    onClick?: (e: KeyboardEvent<HTMLInputElement>) => void
    onBlur: (toFixedValue: number, valueForCount: number) => void
}

export const Input = ({ value, onChange, onClick, onBlur, ...props }: InputType) => {

    const [inputValue, setInputValue] = useState<string>('')
    const regex = /^[0-9,]*$/

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newValue: string = e.currentTarget.value 
        if (regex.test(newValue.trim())) {
            setInputValue(newValue);
          }
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
          e.preventDefault(); // Предотвращаем действие по умолчанию (например, отправку формы)
          let toFixedValue: number = 0;
          let valueForCount: number = 0;
          if (inputValue.includes(',')) {
            toFixedValue = inputValue.split(',')[1]?.length || 0;
            valueForCount = +inputValue.replace(',', '.');
          } else {
            toFixedValue = 0;
            valueForCount = +inputValue;
          }
          onBlur(toFixedValue, valueForCount);
          setInputValue('');
        }
      };


    return (
        <input value={inputValue} 
            type="text"
            onChange={onChangeInputHandler}
            onKeyDown={onKeyDownHandler}
        />
    )
}