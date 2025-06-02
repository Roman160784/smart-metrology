import React from 'react';


export const ResultTableEsoHeader = () => {
    return (
        <>
            
                <td className={''}>Точка калибровки</td>
                <td className={''}>Испытательное напряжение или режим измерений</td>
                <td className={''}>Измеренное значение</td>
                <td className={''}>Абсолютная погрешность</td>
                <td className={''}> {`Пределы допускаемой основной абсолютной погрешности измерений`} </td>
                <td className={''}>Расширенная неопределенность</td>
            
        </>
    )
}