import { CalculationEsoType } from "../EsoReducer"

// Ищем среднее значение из массива
export const findMiddleValueFromArray = (arr: number[]) => {
    let arrMiddleValue = arr.reduce((ak, el) => ak + el) / arr.length
    return +arrMiddleValue.toFixed(4)
}

//Ищем погрешность эталона для ЭС0202/2
export const findStandardErrorForEso = (value: number) => {
    let errorStandardInDot = 0
    let error = 0
    if (value < 10) {
        error = value * 0.02 / 100
        errorStandardInDot = +error.toFixed(5)
    } else if (value > 10 || value < 100) {
        error = value * 0.05 / 100
        errorStandardInDot = +error.toFixed(5)
    } else if (value > 100) {
        error = value * 0.1 / 100
        errorStandardInDot = +error.toFixed(5)
    }
    return errorStandardInDot
}

//Ищем ошибку оператора для ЭС0202/2
export const findUserErrorInDotForEso = (value: number) => {
    let err = value * 5 / 100
    return +err.toFixed(5)
}

//Расчет СКО
export const findSKO = (arr: number[]) => {
    let goodArr = arr.map(el => +el.toFixed(4))
    let middle = goodArr.reduce((el, ak) => el + ak) / arr.length
    let newArr = goodArr.map(el => +el.toFixed(4) - +middle.toFixed(4))
    let moduleArr = newArr.map(el => Math.abs(el) * Math.abs(el))
    let sumModuleArrMiddleValue = moduleArr.reduce((el, ac) => el + ac) / arr.length
    let sko = Math.sqrt(sumModuleArrMiddleValue)
    let res = sko / Math.sqrt(arr.length)
    return +res.toFixed(5)
}

//Расчёт неопределённости 
export const findUncertainty = (value: number) => {
    let uncertainty = value / Math.sqrt(3)
    return +uncertainty.toFixed(5)
}

//Расчёт сумарной неопределённости
export const findTotalUncertainty = (a: number, b: number, c: number, ) => {
    let sum = Math.pow(a, 2) + Math.pow(b, 2) + Math.pow(c, 2)
    let res = Math.sqrt(sum)
    return +res.toFixed(5)
}

//Расчёт процентного вклада
export const findInterestDeposit = (a: number, b: number) => {
    let res = (Math.pow(a, 2) / Math.pow(b, 2)) * 100
    return +res.toFixed(2)
}

//Расчёт допускаемого значения 
export const findPermissibleValue = (dot: number, value: number) => {
    let result = dot * value / 100
    return +result.toFixed(2)
}
//Расчёт погрешность эталона для MRP120
export const findStandardErrorForMrp120 = (dot: number, calibrationValue: string) => {
    let standardErronInDot = 0
    let standardCVCA8500Class = 0.1
    if(calibrationValue === 'В') {
        if (dot <= 45) {
            standardErronInDot = 45 * standardCVCA8500Class / 100
        }else if (dot > 45 && dot <= 60) {
            standardErronInDot = 60 * standardCVCA8500Class / 100
        } else if (dot > 60 && dot <= 75) {
            standardErronInDot = 75 * standardCVCA8500Class / 100
        }else if (dot > 75 && dot <= 150) {
            standardErronInDot = 150 * standardCVCA8500Class / 100
        }else if (dot > 150 && dot <= 300) {
            standardErronInDot = 300 * standardCVCA8500Class / 100
        }
    }else if(calibrationValue === 'мА') {
        if (dot <= 100) {
            standardErronInDot = 100 * standardCVCA8500Class / 100
        }else if (dot > 100 && dot <= 250) {
            standardErronInDot = 250 * standardCVCA8500Class / 100
        } else if (dot > 250 && dot <= 500) {
            standardErronInDot = 500 * standardCVCA8500Class / 100
        }
    } else if(calibrationValue === 'мс') {
        if (dot <= 190) {
            standardErronInDot = 0.002 * dot + 0.2
        }else if (dot > 190 && dot <=  900) {
            standardErronInDot = 0.005 * dot + 0.2
        } 
    }
 return +standardErronInDot.toFixed(3)
}

//Ищем единицу младшего разряда для MRP120 
export const findUserErrorInDotForMrp120 = (dot: number, calibrationValue: string) => {
    let userError = 0
    if (calibrationValue === 'мс' || calibrationValue === 'В' ){
        userError = 0.5
    }else if (calibrationValue === 'мА') {
        if (dot <= 30) {
            userError = 0.05
        } else if (dot > 30 && dot <= 500) {
            userError = 0.5
        }
    }
    return +userError.toFixed(2)
}

//Расчёт допускаемого значения в точке для MRP 120 
export const findPermissibleValueForMrp120 = (dot: number, calibrationValue: string) => {
    let permissibleValue = 0
    if(calibrationValue === 'В') {
        permissibleValue = 0.02 * dot + 2
    } else if (calibrationValue === 'мс') {
        permissibleValue = 0.02 * dot + 1
    } else if (calibrationValue === 'мА') {
        permissibleValue = 0.05 * dot
    }
    return +permissibleValue.toFixed(3)
}

//Cоздание нового объекта с расчитанными значениями для MRP-120 
export const createNewCalibrationFieldMRP120 = (dataForCalibration: number[], calibrationValue: string, calibrationDot: number, reportId: string, calculationId: string) => {
            let calibrationMiddleValue = findMiddleValueFromArray(dataForCalibration)
            let satadardError = findStandardErrorForMrp120(calibrationDot, calibrationValue)
            let userError = findUserErrorInDotForMrp120(calibrationDot, calibrationValue)
            let uncertaintyMiddle = findSKO(dataForCalibration)
            let uncertaintyStnadardError = findUncertainty(satadardError)
            let uncertaintyUserError = findUncertainty(userError)
            let uncertaintyResult = findTotalUncertainty(uncertaintyMiddle, uncertaintyStnadardError, uncertaintyUserError)
            let uncertaintyMiddlePercent = findInterestDeposit(uncertaintyMiddle, uncertaintyResult)
            let uncertaintyStanadardErrorPercent = findInterestDeposit(uncertaintyStnadardError, uncertaintyResult)
            let uncertaintyUserErrorPercent = findInterestDeposit(uncertaintyUserError, uncertaintyResult)
            let uncertaintyResultPercent = uncertaintyMiddlePercent + uncertaintyUserErrorPercent + uncertaintyStanadardErrorPercent
            let error = calibrationMiddleValue - calibrationDot
            let permissibleValue = findPermissibleValueForMrp120(calibrationDot, calibrationValue)
            let coefficient = 2
            let expandedUncertainty = coefficient * uncertaintyResult

            let newCalibrationField : CalculationEsoType = {
                reportId: reportId,
                calculationId: calculationId,
                calibrationDot: calibrationDot,
                testVoltage: '-',
                dataForCalibration: dataForCalibration,
                calibrationMiddleValue: +calibrationMiddleValue.toFixed(3),
                satadardError: +satadardError.toFixed(3),
                userError: +userError.toFixed(3),
                uncertaintyMiddle: +uncertaintyMiddle.toFixed(3),
                uncertaintyStnadardError: +uncertaintyStnadardError.toFixed(3),
                uncertaintyUserError: +uncertaintyUserError.toFixed(3),
                uncertaintyResult: +uncertaintyResult.toFixed(3),
                uncertaintyMiddlePercent: +uncertaintyMiddlePercent.toFixed(3),
                uncertaintyStanadardErrorPercent: +uncertaintyStanadardErrorPercent.toFixed(3),
                uncertaintyUserErrorPercent: +uncertaintyUserErrorPercent.toFixed(3),
                uncertaintyResultPercent: +uncertaintyResultPercent.toFixed(3),
                error: +error.toFixed(3),
                permissibleValue: +permissibleValue.toFixed(3),
                expandedUncertainty: +expandedUncertainty.toFixed(2),
                calibrationValue: calibrationValue,
            }

            return newCalibrationField

}