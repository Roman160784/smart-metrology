import React from 'react';


export const ResultTableCommonHeader = () => {
    return (
        <>
            
                <td className={''}>Калибруемая точка</td>
                <td className={''}>Полученное значение</td>
                <td className={''}>Абсолютная погрешность</td>
                <td className={''}> {`Предел основной абсолютной погрешности `} </td>
                <td className={''}>Расширенная неопределенность</td>
            
        </>
    )
}