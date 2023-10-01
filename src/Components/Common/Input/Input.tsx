import React, { ChangeEvent, KeyboardEvent } from 'react';

type InputType = {
    value: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    onClick?: (e: KeyboardEvent<HTMLInputElement>) => void
    onBlur?: () => void
}

export const Input = ({ value, onChange, onClick, onBlur, ...props }: InputType) => {
    return (
        <input value={value}
            type="text"
            onChange={onChange}
            onKeyPress={onClick}
            onBlur={onBlur}
        />
    )
}