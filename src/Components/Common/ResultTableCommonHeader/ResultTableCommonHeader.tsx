import React from 'react';


export const ResultTableCommonHeader = () => {
    return (
        <>
            
                <td className={''}>Точка калибровки</td>
                <td className={''}>Измеренное значение</td>
                <td className={''}>Абсолютная погрешность</td>
                <td className={''}> {`Пределы допускаемой основной абсолютной погрешности измерений`} </td>
                <td className={''}>Расширенная неопределенность</td>
            
        </>
    )
}