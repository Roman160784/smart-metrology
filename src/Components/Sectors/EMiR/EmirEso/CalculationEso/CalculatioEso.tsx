import React, { ChangeEvent, useRef, useState } from 'react';
import { CalculationEsoType } from '../../../../../Redux/EsoReducer';
import st from './CalculationEso.module.css'
import {FiTrash} from "react-icons/fi"
import { EditableSpanForCalculation } from '../../../../Common/EditableSpanForCalculation/EditableSpanForCalculation';
import { EditableSpan } from '../../../../Common/EditableSpan/EditableSpan';
import { ResultTableEsoHeader } from '../../../../Common/ResultTableEsoHeader/ResultTableEsoHeader';

type CalculationEsoTropsType = {
    calculation: CalculationEsoType
    removeCalculationField: (reportId: string, id: string) => void
    updateDataForCalculation: (reportId: string, calculationId: string, index: number, testVoltage: string, dot: number) => void
    updateTestVoltage: (reportId: string, calculationId: string,  testVoltage: string) => void
}

export const CalculationEso = ({ calculation, removeCalculationField, updateDataForCalculation,
    updateTestVoltage, ...props }: CalculationEsoTropsType) => {
    return (
        <>
            <table className={st.arrayTable} border={1}>
                <tbody>
                    <tr>
                        <td>{`Калибруемая отметка (${calculation.calibrationValue}) при напряжении `} 
                        
                         <EditableSpan title={calculation.testVoltage} changeTitle={(title) => 
                            {updateTestVoltage(calculation.reportId, calculation.calculationId, title)}}/> </td>
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
         changeTitle={(title) => {updateDataForCalculation(calculation.reportId, calculation.calculationId, i, calculation.testVoltage, +title)}}/></td>
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
                <span className={st.res}>   {`Результат калибровки в точке ${calculation.calibrationDot} ${calculation.calibrationValue}  
                при напяжении ${calculation.testVoltage}`}
                
                </span>
                <table className={st.calculationResultTable} border={1}>
                    <tbody>
                        <tr>
                           <ResultTableEsoHeader/>
                        </tr>
                        <tr>
                            <td className={''}>{`${calculation.calibrationDot} ${calculation.calibrationValue}`}</td>
                            <td className={''}>{calculation.testVoltage}</td>
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