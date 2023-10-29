import React, { ChangeEvent, useRef, useState } from 'react';
import { FiTrash } from 'react-icons/fi';
import { NewCalculationIfnType, StandardValueType, ValueIfnEnum } from '../../../../Redux/IfnReducer';
import { EditableSpanForCalculation } from '../../../Common/EditableSpanForCalculation/EditableSpanForCalculation';
import { SuperSelect } from '../../../Common/SuperSelect/SuperSelect';
import st from './CalculationIfn.module.css'

type CalculatonIfnPropsType = {
    calculation: NewCalculationIfnType
    removeCalculationField: (reportId: string, id: string) => void
    updateDataForCalculation: (reportId: string, calculationId: string, index: number, dot: number) => void
    updateCalibrationValue: (reportId: string, calculationId: string, calibrationValue: string) => void
    updateCalculationMode: (reportId: string, calculationId: string, mode: string) => void
    changeStatus: (reportId: string, calculationId: string, id: string, standardValue: number, checked: boolean) => void
}



export const CalculatonIfn = ({ calculation, removeCalculationField, updateDataForCalculation,
    updateCalibrationValue, updateCalculationMode, changeStatus, ...props }: CalculatonIfnPropsType) => {

    const changeStatusHandler = ( reportId: string, calculationId: string, id: string, standardValue: number,  e: ChangeEvent<HTMLInputElement>, ) => {
        let newIsDoneValue = e.currentTarget.checked
        changeStatus(reportId, calculationId, id, standardValue, newIsDoneValue)

    }

    return (
        <>
            <table className={st.arrayTable} border={1}>
                <tbody>
                    <tr >
                        <td>
                            {`Калибруемая отметка`}
                            <SuperSelect 
                            onChangeOption={(option) =>
                                {updateCalibrationValue(calculation!.reportId, calculation.calculationId, option as string )}}
                            options={calculation.calibrationValueSelect} />
                        </td>
                        <td>
                            {`Режим измерений`}
                            <SuperSelect options={calculation.modeSelect}
                            onChangeOption={(option) =>
                                {updateCalculationMode(calculation!.reportId, calculation.calculationId, option as string )}}
                              />
                        </td>
                        <td>
                            {`Значение эталона в калибруемой отметке (${calculation.calibrationValue})`}
                        </td>
                        <td>{`Среднее значение (${calculation.calibrationValue})`}</td>
                        <td>{`Измеренное значени (${calculation.calibrationValue})`}</td>
                    </tr>
                    <tr>
                        <td rowSpan={11}>{calculation.calibrationDot}</td>
                        <td rowSpan={11}>{calculation.mode}</td>
                        <td rowSpan={11}>
                            {calculation.calibrationValue === ValueIfnEnum.omActiv && (
                                <>
                                    {calculation.standardValue
                                        .filter(el => el.title === ValueIfnEnum.omActiv)
                                        .map(el => (
                                            <li className={el.checked  ? st.checked : st.li} key={el.id}>
                                                <input type='checkbox' checked={el.checked}
                                                onChange={(checked) => {changeStatusHandler(calculation!.reportId,
                                                     calculation!.calculationId, el.id,  el.value, checked)}}
                                                />
                                                <span>{el.value}</span>
                                            </li>
                                        ))}
                                </>
                            )}

                            {calculation.calibrationValue === ValueIfnEnum.omReact && (
                                <>
                                    {calculation.standardValue
                                        .filter(el => el.title === ValueIfnEnum.omReact)
                                        .map(el => (
                                            <li className={el.checked  ? st.checked : st.li} key={el.id}>
                                                <input type='checkbox' checked={el.checked}
                                                onChange={(checked) => {changeStatusHandler(calculation!.reportId,
                                                    calculation!.calculationId, el.id,  el.value, checked)}}
                                                />
                                                <span>{el.value}</span>
                                            </li>
                                        ))}
                                </>
                            )}
                            {calculation.calibrationValue === ValueIfnEnum.om || calculation.calibrationValue === ValueIfnEnum.voltsAC && (
                                <>
                                    ---
                                </>
                            )}
                        </td>
                        <td rowSpan={11}>{calculation.calibrationMiddleValue}</td>
                    </tr>
                    {
                        calculation.dataForCalibration.map((el, i) => {
                            return (
                                <tr key={i}>
                                    <td><EditableSpanForCalculation title={el.toString()}
                                        changeTitle={(title) => { updateDataForCalculation(calculation.reportId, calculation.calculationId, i, +title) }} /></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <div>
                <table className={st.calculationTable} border={1}>
                    <tbody>
                        <tr>
                            <td className={''}>{`Входная величина, ${calculation.calibrationValue}`}</td>
                            <td className={''}>{`Значение оценки Xi, ${calculation.calibrationValue}`}</td>
                            <td className={''}>{`Интервал, ±${calculation.calibrationValue}`}</td>
                            <td className={''}>Тип неопре- делен- ностей</td>
                            <td className={''}>Распре- деление вероятностей</td>
                            <td className={''}>{`Стан- дартная неопре- деленность, ${calculation.calibrationValue}`}</td>
                            <td className={''}>Коэф- фици- енты чувстви- тельнос- ти, Ci</td>
                            <td className={''}>{`Вклад неопре- деленности, ${calculation.calibrationValue}`}</td>
                            <td className={''}>Процентный вклад, %</td>
                        </tr>
                        <tr>
                            <td className={''}>1</td>
                            <td className={''}>2</td>
                            <td className={''}>3</td>
                            <td className={''}>4</td>
                            <td className={''}>5</td>
                            <td className={''}>6</td>
                            <td className={''}>7</td>
                            <td className={''}>8</td>
                            <td className={''}>9</td>
                        </tr>
                        <tr>
                            <td className={''}>Ri0</td>
                            <td className={''}>{calculation.calibrationMiddleValue}</td>
                            <td className={''}>-</td>
                            <td className={''}>A</td>
                            <td className={''}>нормальное</td>
                            <td className={''}>{calculation.uncertaintyMiddle}</td>
                            <td className={''}>1</td>
                            <td className={''}>{calculation.uncertaintyMiddle}</td>
                            <td className={''}>{calculation.uncertaintyMiddlePercent}</td>
                        </tr>
                        <tr>
                            <td className={''}>ΔR0</td>
                            <td className={''}>-</td>
                            <td className={''}>{calculation.satadardError}</td>
                            <td className={''}>B</td>
                            <td className={''}>прямоугольное</td>
                            <td className={''}>{calculation.uncertaintyStnadardError}</td>
                            <td className={''}>1</td>
                            <td className={''}>{calculation.uncertaintyStnadardError}</td>
                            <td className={''}>{calculation.uncertaintyStanadardErrorPercent}</td>
                        </tr>

                        <tr>
                            <td className={''}>δind</td>
                            <td className={''}>-</td>
                            <td className={''}>{calculation.userError}</td>
                            <td className={''}>B</td>
                            <td className={''}>прямоугольное</td>
                            <td className={''}>{calculation.uncertaintyUserError}</td>
                            <td className={''}>1</td>
                            <td className={''}>{calculation.uncertaintyUserError}</td>
                            <td className={''}>{calculation.uncertaintyUserErrorPercent}</td>
                        </tr>
                        <tr>
                            <td className={''}>Rx</td>
                            <td className={''}>{calculation.calibrationMiddleValue}</td>
                            <td className={''}>   </td>
                            <td className={''}>    </td>
                            <td className={''}>  </td>
                            <td className={''}>  </td>
                            <td className={''}>   </td>
                            <td className={''}>{calculation.uncertaintyResult}</td>
                            <td className={''}>{calculation.uncertaintyResultPercent}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div>
            <span className={st.res}>   {`Результат калибровки в точке ${calculation.calibrationDot} ${calculation.calibrationValue}`}
                    </span>
            </div>
            <div>
                <table border={1} className={st.calculationResultTable}>
                    <tbody>
                        <tr>
                            <td className={''}>Калибруемая точка</td>
                            <td className={''}>Режим измерений</td>
                            <td className={''}>Полученное значение</td>
                            <td className={''}>Абсолютная погрешность</td>
                            <td className={''}> {`Предел основной абсолютной погрешности `} </td>
                            <td className={''}>Расширенная неопределенность</td>
                        </tr>
                        <tr>
                            <td className={''}>{`${calculation.calibrationDot} ${calculation.calibrationValue}`}</td>
                            <td className={''}>{calculation.mode}</td>
                            <td className={''}>{`${calculation.calibrationMiddleValue}  ${calculation.calibrationValue}`}</td>
                            <td className={''}>{`${calculation.error}  ${calculation.calibrationValue}`}</td>
                            <td className={''}> {` ± ${calculation.permissibleValue}  ${calculation.calibrationValue}`}</td>
                            <td className={''}>{`${calculation.expandedUncertainty}  ${calculation.calibrationValue}`}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className={st.delete}>
                  <FiTrash onClick={() => {removeCalculationField(calculation.reportId, calculation.calculationId)}}/>
                  </div>
        </>
    )
}