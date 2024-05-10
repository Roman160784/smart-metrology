import React, { useState, ChangeEvent } from 'react';
import { FiTrash } from 'react-icons/fi';
import { CalculationEsoType } from '../../../../Redux/EsoReducer';
import { EditableSpanForCalculation } from '../../../Common/EditableSpanForCalculation/EditableSpanForCalculation';
import { ResultTableCommonHeader } from '../../../Common/ResultTableCommonHeader/ResultTableCommonHeader';
import st from '../EmirEso/CalculationEso/CalculationEso.module.css'

type CalculationMrp120PropsType = {
    calculation: CalculationEsoType
    removeCalculationField: (reportId: string, id: string) => void
    updateDataForCalculation: (reportId: string, calculationId: string, index: number, dot: number, toFixedValue: number) => void
    updateCalibrationValue: (reportId: string, calculationId: string, calibrationValue: string) => void
}

export const CalculationMrp120 = ({ calculation, removeCalculationField, updateDataForCalculation,
    updateCalibrationValue, ...props }: CalculationMrp120PropsType) => {

const [selectedValue, setSelectedValue] = useState<string>(calculation.calibrationValue)

const selectHandler = ( reportId: string, calculationId: string, event: ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    setSelectedValue(newValue);
    updateCalibrationValue(reportId, calculationId, newValue,)
}

    return(
        <>
<table className={st.arrayTable} border={1}>
                <tbody>
                    <tr>
                        <td>{`Калибруемая отметка `} 
                            <select value={selectedValue} onChange={(selectedValue)=>
                                {selectHandler( calculation.reportId, calculation.calculationId, selectedValue)}}>
                            <option value='B' selected={true}>В</option>
                            <option value='мА'>мА</option>
                            <option value='мс'>мс</option>
                            </select>
                          </td>
                        <td>{`Среднее значение (${calculation.calibrationValue})`}</td>
                        <td>{`Измеренное значени (${calculation.calibrationValue})`}</td>

                    </tr>
                    <tr>
                        <td rowSpan={11}>{calculation.calibrationDot}</td>
                        <td rowSpan={11}>{calculation.calibrationMiddleValue}</td>
                    </tr>

                    {
                        calculation.dataForCalibration.map((el, i) => {
                            return (
                                <tr key={i}>
                                    <td><EditableSpanForCalculation title={el.toString()} 
         changeTitle={(title, toFixedValue) => {updateDataForCalculation(calculation.reportId, calculation.calculationId, i, +title, toFixedValue)}}/></td>
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
                            <td className={st.CalculationTableRes}>{`Входная величина, ${calculation.calibrationValue}`}</td>
                            <td className={st.CalculationTableRes}>{`Значение оценки Xi, ${calculation.calibrationValue}`}</td>
                            <td className={st.CalculationTableRes}>{`Интервал, ±${calculation.calibrationValue}`}</td>
                            <td className={st.CalculationTableRes}>Тип неопре- делен- ностей</td>
                            <td className={st.CalculationTableRes}>Распре- деление вероятностей</td>
                            <td className={st.CalculationTableRes}>{`Стан- дартная неопре- деленность, ${calculation.calibrationValue}`}</td>
                            <td className={st.CalculationTableRes}>Коэф- фици- енты чувстви- тельнос- ти, Ci</td>
                            <td className={st.CalculationTableRes}>{`Вклад неопре- деленности, ${calculation.calibrationValue}`}</td>
                            <td className={st.CalculationTableRes}>Процентный вклад, %</td>
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
            <div >
                <span className={st.res}>   {`Результат калибровки в точке ${calculation.calibrationDot} ${calculation.calibrationValue}`}
                </span>
                <table className={st.calculationResultTable} border={1}>
                    <tbody>
                        <tr>
                           <ResultTableCommonHeader/>
                        </tr>
                        <tr>
                            <td className={''}>{`${calculation.calibrationDot} ${calculation.calibrationValue}`}</td>
                            <td className={''}>{`${calculation.calibrationMiddleValue}  ${calculation.calibrationValue}`}</td>
                            <td className={''}>{`${calculation.error}  ${calculation.calibrationValue}`}</td>
                            <td className={''}> {` ± ${calculation.permissibleValue}  ${calculation.calibrationValue}`}</td>
                            <td className={''}>{`${calculation.expandedUncertainty}  ${calculation.calibrationValue}`}</td>
                        </tr>
                    </tbody>
                </table>
                <div className={st.delete}>
              <FiTrash onClick={() => {removeCalculationField(calculation.reportId, calculation.calculationId)}}/>
              </div>
            </div>
        </>
    )
}