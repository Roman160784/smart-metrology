import { CalculationHVType, ValueHVEnum } from "../HVeqipmentReducer";
import { findInterestDeposit, findMiddleValueFromArray, findSKO, findTotalUncertainty, findUncertainty, findValuesForUncertaintyResultPercent, stringArrayHelper, stringHelper } from "./utils";

//ошибка оператора
const userErrorTectCentreHV = (toFixedValue: number) => {
    if (toFixedValue < 0 || !Number.isInteger(toFixedValue)) {
        return
      }
      return 0.5 * Math.pow(10, -toFixedValue);
}

//погрешность эталона
const standardError = (dot: number, paramp: string) => {
    let staydardError = 0
    if (paramp === ValueHVEnum.ACV) {
        staydardError = dot * 0.25 / 100
    }else if (paramp === ValueHVEnum.DCV) {
        staydardError = dot * 0.05 / 100
    }else if (paramp === ValueHVEnum.ACA){
        if (dot >= 1 && dot <= 19.999){
            staydardError = dot * 0.008 + 30 * 0.001
        }else if (dot >= 20 && dot <= 199.99) {
            staydardError = dot * 0.008 + 30 * 0.01
        }
    }else if (paramp === ValueHVEnum.DCA) {
        if (dot >= 1 && dot <= 19.999){
            staydardError = dot * 0.002 + 10 * 0.001
        }else if (dot >= 20 && dot <= 199.99) {
            staydardError = dot * 0.002 + 10 * 0.01
        }
    }else if (paramp === ValueHVEnum.DCmkA) {
        if (dot >= 0.01 && dot <= 199.99){
            staydardError = dot * 0.002 + 20 * 0.01
        }else if (dot >= 200 && dot <= 1999.9) {
            staydardError = dot * 0.002 + 10 * 0.1
        }
    }else if (paramp === ValueHVEnum.ACmkA) {
        if (dot >= 0.01 && dot <= 199.99){
            staydardError = dot * 0.008 + 30 * 0.01
        }else if (dot >= 200 && dot <= 1999.9) {
            staydardError = dot * 0.008 + 30 * 0.1
        }
    }

    return staydardError
}


export const createNewCalibrationFieldHV = (dot: number, calculationId: string, dataForCalibration: number[], 
     calibrationValue: string, toFixedValue: number, modeSelect: string[], reportId: string) => {
        let calibrationMiddleValue = findMiddleValueFromArray(dataForCalibration)
        let uncertaintyMiddle = findSKO(dataForCalibration)
        let satadardError = standardError(dot, calibrationValue)
        let userError = userErrorTectCentreHV(toFixedValue)
        let coefficient = 2
        let uncertaintyStnadardError = findUncertainty(satadardError)

    let uncertaintyUserError = findUncertainty(userError!)
    let uncertaintyResult = findTotalUncertainty(uncertaintyMiddle, uncertaintyStnadardError, uncertaintyUserError)
    let uncertaintyMiddlePercent = findInterestDeposit(uncertaintyMiddle, uncertaintyResult)
    let uncertaintyStanadardErrorPercent = findInterestDeposit(uncertaintyStnadardError, uncertaintyResult)
    let uncertaintyUserErrorPercent = findInterestDeposit(uncertaintyUserError, uncertaintyResult)
    // let uncertaintyResultPercent = uncertaintyMiddlePercent + uncertaintyUserErrorPercent + uncertaintyStanadardErrorPercent
    let resPercent = findValuesForUncertaintyResultPercent(uncertaintyMiddlePercent, uncertaintyUserErrorPercent, uncertaintyStanadardErrorPercent)
    
    let expandedUncertainty = coefficient * uncertaintyResult
    let error = calibrationMiddleValue - dot

    let newCalvulation: CalculationHVType = {
        toFixedValue: toFixedValue,
        calculationId: calculationId,
        calibrationDot: stringHelper(dot, toFixedValue!),
        calibrationMiddleValue: stringHelper(calibrationMiddleValue, toFixedValue!),
        calibrationValue: calibrationValue,
        dataForCalibration: stringArrayHelper(dataForCalibration, toFixedValue!),
        expandedUncertainty: stringHelper(expandedUncertainty, toFixedValue! + 2),
        mode: calibrationValue,
        modeSelect: modeSelect,
        reportId: reportId,
        satadardError: stringHelper(satadardError, toFixedValue! + 3),
        // standardValueInDot: +dot.toFixed(4), 
        // standardValue: standardValue,
        uncertaintyMiddle: stringHelper(uncertaintyMiddle, toFixedValue! + 2),
        uncertaintyMiddlePercent: stringHelper(resPercent[0], 2),
        uncertaintyResult: stringHelper(uncertaintyResult, toFixedValue! + 2),
        // uncertaintyResultPercent: +uncertaintyResultPercent.toFixed(4),
        uncertaintyResultPercent: '100',
        uncertaintyStnadardError: stringHelper(uncertaintyStnadardError, toFixedValue! + 2),
        uncertaintyStanadardErrorPercent: stringHelper(resPercent[2], 3),
        uncertaintyUserError: stringHelper(uncertaintyUserError, toFixedValue! + 3),
        uncertaintyUserErrorPercent: stringHelper(resPercent[1], 3),
        userError: stringHelper(userError!, toFixedValue! + 2),
        error: stringHelper(error, toFixedValue!),
        permissibleValue: ""
    }
    return newCalvulation

}

export {};