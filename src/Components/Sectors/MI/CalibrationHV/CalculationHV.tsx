import React, { ChangeEvent } from "react";
import { FiTrash } from "react-icons/fi";
import { CalculationHVType } from "../../../../Redux/HVeqipmentReducer";
import { SuperSelect } from "../../../Common/SuperSelect/SuperSelect";
import { ResultTableEsoHeaderTC } from "./ResultTableHeaderTC";
import { EditableSpanForCalculation } from "../../../Common/EditableSpanForCalculation/EditableSpanForCalculation";
import st from "./CalibrationHV.module.css";

type CalculationHVPropsType = {
    calculation: CalculationHVType
    updateCalibrationValue: (calculationId: string, calibrationValue: string) => void
    removeCalibrationFieldHandler: (id: string) => void
    updateCalibrationValueinArray: (id: string, i: number, value: number, toFixedValue: number) => void
}

export const CalculationHV = ({calculation, updateCalibrationValue,
     removeCalibrationFieldHandler, updateCalibrationValueinArray, ...props}: CalculationHVPropsType) => {

return(
<>
<table className={st.arrayTable} border={1}>
                    <tbody>
                        <tr>
                            <td>
                            {`Точка калибровки  `}
              <SuperSelect
                onChangeOption={(option) => {
                  updateCalibrationValue(
                    calculation.calculationId,
                    option as string
                  );
                }}
                options={calculation.modeSelect}
              />
                              </td>
                            <td >{`Среднее значение (${calculation.calibrationValue})`}</td>
                            <td>{`Измеренное значение (${calculation.calibrationValue})`}</td>
    
                        </tr>
                        <tr>
                            <td className={st.arrayTableTd} rowSpan={11}>{calculation.calibrationDot}</td>
                            <td className={st.arrayTableTd} rowSpan={11}>{calculation.calibrationMiddleValue}</td>
                        </tr>

                        {
                            calculation.dataForCalibration.map((el, i) => {
                                return (
                                    <tr key={i}>
                                        <td className={st.arrayTableTdArr}> <EditableSpanForCalculation title={el.toString()} 
            //  changeTitle={(title, toFixedValue) => {updateDataForCalculation(calculation.reportId, calculation.calculationId, i, +title, toFixedValue)}}/>
             changeTitle={(title, toFixedValue) => {updateCalibrationValueinArray(calculation.calculationId, i, title, toFixedValue)}}/>
             
             </td>
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
                                <td className={''}>0</td>
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
                                <td className={''}>0</td>
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
                                <td className={''}>-</td>
                                <td className={''}>-</td>
                                <td className={''}>-</td>
                                <td className={''}>{calculation.uncertaintyResult}</td>
                                <td className={''}>-</td>
                                <td className={''}>{calculation.uncertaintyResult}</td>
                                <td className={''}>{calculation.uncertaintyResultPercent}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div >
                    <span className={st.res}>   {`Результат калибровки в точке ${calculation.calibrationDot} ${calculation.calibrationValue}`}
                    </span>
                    <table className={st.calculationTable} border={1}>
                    <tbody>
                        <tr>
                           <ResultTableEsoHeaderTC/>
                        </tr>
                        <tr>
                            <td className={''}>{`${calculation.calibrationDot} ${calculation.calibrationValue}`}</td>
                            <td className={''}>{calculation.mode}</td>
                            <td className={''}>{`${calculation.calibrationMiddleValue}  ${calculation.calibrationValue}`}</td>
                            <td className={''}>{`${calculation.error}  ${calculation.calibrationValue}`}</td>
                            <td className={''}>{`${calculation.expandedUncertainty}  ${calculation.calibrationValue}`}</td>
                        </tr>
                    </tbody>
                    </table>
                    <div className={st.delete}>
                  <FiTrash onClick={() => {removeCalibrationFieldHandler(calculation.calculationId)}}/>
                  </div>
                </div>

</>
)

}