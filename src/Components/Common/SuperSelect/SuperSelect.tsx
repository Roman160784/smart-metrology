import React, {SelectHTMLAttributes, DetailedHTMLProps, ChangeEvent, HtmlHTMLAttributes} from 'react'

type DefaultSelectPropsType = DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>

type SuperSelectPropsType = DefaultSelectPropsType & {
    options?: string[]
    onChangeOption?: (option: string) => void
}


export const SuperSelect = ({options, onChange, onChangeOption, ...props}: SuperSelectPropsType ) => {

    const mappedOptions = options ? options.map((o, i) => {
        return <option key={o + '-' + i} value={o}>{o}</option>
    }) : [];

    const onChangeCallback = (e: ChangeEvent<HTMLSelectElement>) => {
        onChange && onChange(e)
        onChangeOption && onChangeOption(e.currentTarget.value)
    }

    return (
        <select onChange={onChangeCallback} {...props}>
            {mappedOptions}
        </select>
    )

}