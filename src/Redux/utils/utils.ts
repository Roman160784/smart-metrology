import { E6CalibrationValue, } from "../E6Reducer"
import { CalculationEsoType } from "../EsoReducer"
import { calibrationObjectTypesEnum, modeEnum, NewCalculationIfnType, StandardValueEnum, StandardValueType, ValueIfnEnum } from "../IfnReducer"

// Ищем среднее значение из массива
export const findMiddleValueFromArray = (arr: number[]) => {
    let arrMiddleValue = arr.reduce((ak, el) => ak + el) / arr.length
    return +arrMiddleValue.toFixed(4)
}

//Ищем сумму в процентов процентного вклада 

const findValuesForUncertaintyResultPercent = (a: number, b: number, c: number) => {
    const roundedSum = Math.round(a * 100) / 100 + Math.round(b * 100) / 100 + Math.round(c * 100) / 100;
    let arr: number[] = [a, b, c];

    if (roundedSum === 100) {
        return arr;
    } else {
        const desiredSum = 100;
        const sum = arr.reduce((acc, num) => acc + num, 0);
        const roundedNumbers = arr.map(num => Math.round(num * 100) / 100);
        const difference = desiredSum - sum;
        const adjustedNumbers = roundedNumbers.map((num, index) => {
            if (index === roundedNumbers.length - 1) {
              return num + difference; // Добавляем разницу к последнему числу
            }
            return num; // Остальные числа остаются без изменений
        });
        return adjustedNumbers;
    }
};

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
export const findTotalUncertainty = (a: number, b: number, c: number,) => {
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
    if (calibrationValue === 'В') {
        if (dot <= 45) {
            standardErronInDot = 45 * standardCVCA8500Class / 100
        } else if (dot > 45 && dot <= 60) {
            standardErronInDot = 60 * standardCVCA8500Class / 100
        } else if (dot > 60 && dot <= 75) {
            standardErronInDot = 75 * standardCVCA8500Class / 100
        } else if (dot > 75 && dot <= 150) {
            standardErronInDot = 150 * standardCVCA8500Class / 100
        } else if (dot > 150 && dot <= 300) {
            standardErronInDot = 300 * standardCVCA8500Class / 100
        }
    } else if (calibrationValue === 'мА') {
        if (dot <= 100) {
            standardErronInDot = 100 * standardCVCA8500Class / 100
        } else if (dot > 100 && dot <= 250) {
            standardErronInDot = 250 * standardCVCA8500Class / 100
        } else if (dot > 250 && dot <= 500) {
            standardErronInDot = 500 * standardCVCA8500Class / 100
        }
    } else if (calibrationValue === 'мс') {
        if (dot <= 190) {
            standardErronInDot = 0.002 * dot + 0.2
        } else if (dot > 190 && dot <= 900) {
            standardErronInDot = 0.005 * dot + 0.2
        }
    }
    return +standardErronInDot.toFixed(3)
}

//Ищем единицу младшего разряда для MRP120 
export const findUserErrorInDotForMrp120 = (dot: number, calibrationValue: string) => {
    let userError = 0
    if (calibrationValue === 'мс' || calibrationValue === 'В') {
        userError = 0.5
    } else if (calibrationValue === 'мА') {
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
    if (calibrationValue === 'В') {
        permissibleValue = 0.02 * dot + 2
    } else if (calibrationValue === 'мс') {
        permissibleValue = 0.02 * dot + 1
    } else if (calibrationValue === 'мА') {
        permissibleValue = 0.05 * dot
    }
    return +permissibleValue.toFixed(3)
}

// Cоздание нового объекта с расчитанными значениями для MRP-120 
export const createNewCalibrationFieldMRP120 = (dataForCalibration: number[], calibrationValue: string, calibrationDot: number, reportId: string, calculationId: string, toFixedValue?: number) => {
    let calibrationMiddleValue = findMiddleValueFromArray(dataForCalibration)
    let satadardError = findStandardErrorForMrp120(calibrationDot, calibrationValue)
    let userError = findUserErrorInDotForMrp120(calibrationMiddleValue, calibrationValue)
    let uncertaintyMiddle = findSKO(dataForCalibration)
    let uncertaintyStnadardError = findUncertainty(satadardError)
    let uncertaintyUserError = findUncertainty(userError)
    let uncertaintyResult = findTotalUncertainty(uncertaintyMiddle, uncertaintyStnadardError, uncertaintyUserError)
    let uncertaintyMiddlePercent = findInterestDeposit(uncertaintyMiddle, uncertaintyResult)
    let uncertaintyStanadardErrorPercent = findInterestDeposit(uncertaintyStnadardError, uncertaintyResult)
    let uncertaintyUserErrorPercent = findInterestDeposit(uncertaintyUserError, uncertaintyResult)
    let resPercent = findValuesForUncertaintyResultPercent(uncertaintyMiddlePercent, uncertaintyUserErrorPercent, uncertaintyStanadardErrorPercent)
    // let uncertaintyResultPercent = uncertaintyMiddlePercent + uncertaintyUserErrorPercent + uncertaintyStanadardErrorPercent
    let error = calibrationMiddleValue - calibrationDot
    let permissibleValue = findPermissibleValueForMrp120(calibrationDot, calibrationValue)
    let coefficient = 2
    let expandedUncertainty = coefficient * uncertaintyResult

    let newCalibrationField: CalculationEsoType = {
        reportId: reportId,
        calculationId: calculationId,
        calibrationDot: stringHelper(calibrationDot, toFixedValue!),
        testVoltage: '-',
        dataForCalibration: stringArrayHelper(dataForCalibration, toFixedValue!),
        calibrationMiddleValue: stringHelper(calibrationMiddleValue, toFixedValue!),
        satadardError: stringHelper(satadardError, toFixedValue!+2),
        userError: stringHelper(userError, toFixedValue!+2),
        uncertaintyMiddle: stringHelper(uncertaintyMiddle, toFixedValue!+2),
        uncertaintyStnadardError: stringHelper(uncertaintyStnadardError, toFixedValue!+2),
        uncertaintyUserError: stringHelper(uncertaintyUserError, toFixedValue!+2),
        uncertaintyResult: stringHelper(uncertaintyResult, toFixedValue!+2),
        // uncertaintyMiddlePercent: +uncertaintyMiddlePercent.toFixed(3),
        // uncertaintyStanadardErrorPercent: +uncertaintyStanadardErrorPercent.toFixed(3),
        // uncertaintyUserErrorPercent: +uncertaintyUserErrorPercent.toFixed(3),
        uncertaintyMiddlePercent: stringHelper(resPercent[0], 2),
        uncertaintyStanadardErrorPercent: stringHelper(resPercent[1], 2),
        uncertaintyUserErrorPercent: stringHelper(resPercent[2], 2),
        // uncertaintyResultPercent: +uncertaintyResultPercent.toFixed(3),
        uncertaintyResultPercent: stringHelper(100, 0),
        error: stringHelper(error, toFixedValue!),
        permissibleValue: stringHelper(permissibleValue, toFixedValue!),
        expandedUncertainty: stringHelper(expandedUncertainty, toFixedValue!+1),
        calibrationValue: calibrationValue,
    }

    return newCalibrationField

}

//Расчёт погрешности эталона для вольтметра ЦВ8500/3

export const findStandardErrorForVoltmetrCV8500 = (calibrationDot: number) => {
    let standardErronInDot = 0
    let standardCVCA8500Class = 0.1
    if (calibrationDot <= 45) {
        standardErronInDot = 45 * standardCVCA8500Class / 100
    } else if (calibrationDot > 45 && calibrationDot <= 60) {
        standardErronInDot = 60 * standardCVCA8500Class / 100
    } else if (calibrationDot > 60 && calibrationDot <= 75) {
        standardErronInDot = 75 * standardCVCA8500Class / 100
    } else if (calibrationDot > 75 && calibrationDot <= 150) {
        standardErronInDot = 150 * standardCVCA8500Class / 100
    } else if (calibrationDot > 150 && calibrationDot <= 300) {
        standardErronInDot = 300 * standardCVCA8500Class / 100
    } else if (calibrationDot > 300 && calibrationDot <= 450) {
        standardErronInDot = 450 * standardCVCA8500Class / 100
    } else if (calibrationDot > 450 && calibrationDot <= 600) {
        standardErronInDot = 600 * standardCVCA8500Class / 100
    }
    return +standardErronInDot.toFixed(3)
}

//Расчёт погрешности эталона для мера-иммитатора Р40116

export const findStandardErrorForP40116 = (calibrationDot: number, calibrationValue: string) => {
    let standardErronInDot = 0
    if (calibrationValue === E6CalibrationValue.kom) {
        if (calibrationDot <= 100) {
            standardErronInDot = calibrationDot * 0.05 / 100
        } else if (calibrationDot > 100 && calibrationDot <= 1000) {
            standardErronInDot = calibrationDot * 0.02 / 100
        }
    } else if (calibrationValue === E6CalibrationValue.mom) {
        if (calibrationDot <= 1) {
            standardErronInDot = calibrationDot * 0.05 / 100
        } else if (calibrationDot > 1 && calibrationDot <= 10) {
            standardErronInDot = calibrationDot * 0.02 / 100
        } else if (calibrationDot > 10 && calibrationDot <= 100) {
            standardErronInDot = calibrationDot * 0.05 / 100
        } else if (calibrationDot > 100 && calibrationDot <= 10000) {
            standardErronInDot = calibrationDot * 0.1 / 100
        }
    } else if (calibrationValue === E6CalibrationValue.gom) {
        if (calibrationDot <= 1) {
            standardErronInDot = calibrationDot * 0.05 / 100
        } else if (calibrationDot > 1 && calibrationDot <= 10) {
            standardErronInDot = calibrationDot * 0.1 / 100
        } else if (calibrationDot > 10) {
            standardErronInDot = calibrationDot * 0.2 / 100
        }
    } else if (calibrationValue === E6CalibrationValue.om) {
        standardErronInDot = calibrationDot * 0.02 / 100
    }

    return +standardErronInDot.toFixed(9)
}

// Расчёт допускаемых значений для Е6-24
let findPermissibleValueForE6_24 = (calibrationDot: number, calibrationValue: string) => {
    let permissibleValue = 0
    if (calibrationValue === E6CalibrationValue.volts) {
        permissibleValue = calibrationDot * 5 / 100 + 3
    } else if (calibrationValue === E6CalibrationValue.om) {
        permissibleValue = 0
    } else if (calibrationValue === E6CalibrationValue.kom) {
        permissibleValue = 0
    } else if (calibrationValue === E6CalibrationValue.mom) {
        if (calibrationDot >= 1 && calibrationDot <= 9.99) {
            permissibleValue = calibrationDot * 3 / 100 + 0.03
        } else if (calibrationDot >= 10 && calibrationDot <= 99.9) {
            permissibleValue = calibrationDot * 3 / 100 + 0.3
        } else if (calibrationDot >= 100 && calibrationDot <= 999) {
            permissibleValue = calibrationDot * 3 / 100 + 3
        }
    } else if (calibrationValue === E6CalibrationValue.gom) {
        if (calibrationDot <= 1) {
            permissibleValue = calibrationDot * 3 / 100 + 0.03
        } else if (calibrationDot > 1 && calibrationDot <= 9.99) {
            permissibleValue = calibrationDot * 3 / 100 + 0.03
        } else if (calibrationDot >= 10 && calibrationDot <= 99.9) {
            permissibleValue = calibrationDot * 5 / 100 + 0.5
        } else if (calibrationDot >= 100) {
            permissibleValue = calibrationDot * 15 / 100 + 10
        }
    }
    return +permissibleValue.toFixed(4)
}

//Находим ошибку емр для мегаомметров Е6-24, Е6-24/1

const findEmrForE6_24 = (calibrationDot: number, calibrationValue: string) => {
    let userError = 0
    if (calibrationValue === E6CalibrationValue.kom) {
        userError = 0.5
    } else if (calibrationValue === E6CalibrationValue.mom) {
        if (calibrationDot > 0.01 && calibrationDot <= 9.99) {
            userError = 0.005
        } else if (calibrationDot >= 10 && calibrationDot <= 99.9) {
            userError = 0.05
        } else if (calibrationDot >= 100 && calibrationDot <= 999) {
            userError = 0.5
        }
    } else if (calibrationValue === E6CalibrationValue.gom) {
        if (calibrationDot > 0.01 && calibrationDot <= 9.99) {
            userError = 0.005
        } else if (calibrationDot >= 10 && calibrationDot <= 99.9) {
            userError = 0.05
        } else if (calibrationDot >= 100 && calibrationDot <= 999) {
            userError = 0.5
        }
    } else if (calibrationValue === E6CalibrationValue.om) {
        if (calibrationDot > 0.01 && calibrationDot <= 9.99) {
            userError = 0.005
        } else if (calibrationDot >= 10 && calibrationDot <= 99.9) {
            userError = 0.05
        } else if (calibrationDot >= 100 && calibrationDot <= 999) {
            userError = 0.5
        }

    }
    return +userError.toFixed(4)
}


// ищем допускаемое значение для Е6-24/1 Е624/2
const findPermissibleValueForE6_24_1 = (calibrationDot: number, calibrationValue: string) => {
    let permissibleValue = 0
    if (calibrationValue === E6CalibrationValue.volts) {
        permissibleValue = calibrationDot * 5 / 100 + 3
    } else if (calibrationValue === E6CalibrationValue.om) {
        permissibleValue = 0
    } else if (calibrationValue === E6CalibrationValue.kom) {
        permissibleValue = 0
    } else if (calibrationValue === E6CalibrationValue.mom) {
        if (calibrationDot > 0.01 && calibrationDot <= 9.99) {
            permissibleValue = calibrationDot * 3 / 100 + 0.03
        } else if (calibrationDot >= 10 && calibrationDot <= 99.9) {
            permissibleValue = calibrationDot * 3 / 100 + 0.3
        } else if (calibrationDot >= 100 && calibrationDot <= 999) {
            permissibleValue = calibrationDot * 3 / 100 + 3
        }
    } else if (calibrationValue === E6CalibrationValue.gom) {
        if (calibrationDot <= 1) {
            permissibleValue = calibrationDot * 3 / 100 + 0.03
        } else if (calibrationDot > 1 && calibrationDot <= 9.99) {
            permissibleValue = calibrationDot * 5 / 100 + 0.03
        } else if (calibrationDot >= 10 && calibrationDot <= 99.9) {
            permissibleValue = calibrationDot * 5 / 100 + 0.5
        } else if (calibrationDot >= 100) {
            permissibleValue = calibrationDot * 15 / 100 + 10
        }
    }
    return +permissibleValue.toFixed(4)
}
// Ищем допускаемое значение для Е6-31, 31, 31/1
const findPermissibleValueForE6_30 = (calibrationDot: number, calibrationValue: string) => {
    let permissibleValue = 0
    if (calibrationValue === E6CalibrationValue.volts) {
        permissibleValue = 0.05 * calibrationDot + 3
    } else if (calibrationValue === E6CalibrationValue.kom) {
        permissibleValue = 0.03 * calibrationDot + 3
    } else if (calibrationValue === E6CalibrationValue.mom) {
        if (calibrationDot > 0.01 && calibrationDot <= 9.99) {
            permissibleValue = calibrationDot * 3 / 100 + 0.03
        } else if (calibrationDot >= 10 && calibrationDot <= 99.9) {
            permissibleValue = calibrationDot * 3 / 100 + 0.3
        } else if (calibrationDot >= 100 && calibrationDot <= 999) {
            permissibleValue = calibrationDot * 3 / 100 + 3
        }
    } else if (calibrationValue === E6CalibrationValue.gom) {
        if (calibrationDot <= 1) {
            permissibleValue = calibrationDot * 3 / 100 + 0.03
        } else if (calibrationDot > 0.01 && calibrationDot <= 9.99) {
            permissibleValue = calibrationDot * 5 / 100 + 0.03
        } else if (calibrationDot >= 10 && calibrationDot <= 99.9) {
            permissibleValue = calibrationDot * 5 / 100 + 0.5
        } else if (calibrationDot >= 100) {
            permissibleValue = calibrationDot * 15 / 100 + 10
        }
    } else if (calibrationValue === E6CalibrationValue.om) {
        if (calibrationDot > 0 && calibrationDot <= 9.99){
            permissibleValue = 0.03 * calibrationDot + 0.03 
        }else if(calibrationDot >= 10 && calibrationDot <= 99.9){
            permissibleValue = 0.03 * calibrationDot + 0.3
        }else if(calibrationDot >= 100 && calibrationDot <= 999){
            permissibleValue = 0.03 * calibrationDot + 3
        }
        
    }
    return +permissibleValue.toFixed(4)
}

//Ищем допускаемое значене для ПСИ-2500

const findPermissibleValueForPSI2500 = (calibrationDot: number, calibrationValue: string) => {
    let permissibleValue = 0
    if (calibrationValue === E6CalibrationValue.volts) {
        permissibleValue = 0.05 * calibrationDot + 3
    } else if (calibrationValue === E6CalibrationValue.om) {
        permissibleValue = 0
    } else if (calibrationValue === E6CalibrationValue.kom) {
        permissibleValue = 0
    } else if (calibrationValue === E6CalibrationValue.mom) {
        if (calibrationDot > 0.01 && calibrationDot <= 9.99) {
            permissibleValue = 0.03 * calibrationDot + 0.03
        } else if (calibrationDot >= 10 && calibrationDot <= 99.9) {
            permissibleValue = calibrationDot * 0.03 + 0.3
        } else if (calibrationDot >= 100 && calibrationDot <= 999) {
            permissibleValue = calibrationDot * 0.03 + 3
        }
    } else if (calibrationValue === E6CalibrationValue.gom) {
        if (calibrationDot > 0.01 && calibrationDot <= 9.99) {
            permissibleValue = 0.05 * calibrationDot + 0.05
        } else if (calibrationDot > 10) {
            permissibleValue = 0
        }
    }

    return +permissibleValue.toFixed(3)
}

//Ищем допускаемое значене для ПСИ-2510 ПСИ-2530
const findPermissibleValueForPSI2510 = (calibrationDot: number, calibrationValue: string) => {
    let permissibleValue = 0
    if (calibrationValue === E6CalibrationValue.volts) {
        permissibleValue = 0.05 * calibrationDot + 3
    } else if (calibrationValue === E6CalibrationValue.om) {
        permissibleValue = 0
    } else if (calibrationValue === E6CalibrationValue.kom) {
        permissibleValue = 0.025 * calibrationDot + 3
    } else if (calibrationValue === E6CalibrationValue.mom) {
        if (calibrationDot > 0.01 && calibrationDot <= 9.99) {
            permissibleValue = 0.025 * calibrationDot + 0.03
        } else if (calibrationDot >= 10 && calibrationDot <= 99.9) {
            permissibleValue = calibrationDot * 0.025 + 0.3
        } else if (calibrationDot >= 100 && calibrationDot <= 999) {
            permissibleValue = calibrationDot * 0.025 + 3
        }
    } else if (calibrationValue === E6CalibrationValue.gom) {
        if (calibrationDot > 0.01 && calibrationDot <= 9.99) {
            permissibleValue = 0.05 * calibrationDot + 0.05
        } else if (calibrationDot > 10 && calibrationDot <= 99.9) {
            permissibleValue = 0.05 * calibrationDot + 0.5
        } else if (calibrationDot >= 100 && calibrationDot <= 999) {
            permissibleValue = calibrationDot * 0.05 + 5
        }
    }

    return +permissibleValue.toFixed(3)
}

//ищем емр для ис
const findUserErrorIS = (calibrationMiddleValue : number, calibrationValue : string) => {
    let userError = 0
    if(calibrationValue === E6CalibrationValue.miom && calibrationMiddleValue >= 1 &&  calibrationMiddleValue <= 999) {
        userError = 0.5
    }else if (calibrationValue === E6CalibrationValue.om && calibrationMiddleValue >= 0.01 &&  calibrationMiddleValue <= 9.99) {
        userError = 0.005
    }else if (calibrationValue === E6CalibrationValue.om && calibrationMiddleValue >= 10 &&  calibrationMiddleValue <= 99.9) {
        userError = 0.05
    }else if (calibrationValue === E6CalibrationValue.om && calibrationMiddleValue >= 100 &&  calibrationMiddleValue <= 999) {
        userError = 0.5
    }else if (calibrationValue === E6CalibrationValue.kom && calibrationMiddleValue >= 0.01 &&  calibrationMiddleValue <= 9.99) {
        userError = 0.005
    }

    return +userError.toFixed(4)
}

//ищем погрешность эталона Р4834 
const findStandardErrorIsP4834 = (calibrationMiddleValue: number) => {
    let absoluteTolerance = 0.05 * calibrationMiddleValue / 100;
  return +absoluteTolerance.toFixed(7);
}

//Ищем допускаемые значения для ИС
const findPermissibleValueIS = (calibrationDot: number, calibrationValue: string) => {
    let permissibleValue = 0
    if (calibrationValue === E6CalibrationValue.miom) {
        permissibleValue = 0.03 * calibrationDot + 3
    }else if (calibrationValue === E6CalibrationValue.om) {
            if (calibrationDot >= 0.01 &&  calibrationDot <= 9.99 ){
                permissibleValue = 0.03 * calibrationDot + 0.03
            }else if(calibrationDot >= 10 &&  calibrationDot <= 99.9){
                permissibleValue = 0.03 * calibrationDot + 0.3
            } else if(calibrationDot >= 100 &&  calibrationDot <= 999){
                permissibleValue = 0.03 * calibrationDot + 3
            }
    } else if(calibrationValue === E6CalibrationValue.kom) {
        permissibleValue = 0.03 * calibrationDot + 0.03
    }

    return +permissibleValue.toFixed(4)
}

//Cоздание нового объекта с расчитанными значениями для мегомметров E6

export const createNewCalibrationFieldE6 = (dataForCalibration: number[], calibrationObjectType: string, testVoltage: string = '-', calibrationValue: string = E6CalibrationValue.volts, calibrationDot: number, reportId: string, calculationId: string, toFixedValue: number) => {



    let calibrationMiddleValue = findMiddleValueFromArray(dataForCalibration)
    let uncertaintyMiddle = findSKO(dataForCalibration)
    let satadardError = 0
    let userError = 0
    let permissibleValue = 0
    let coefficient = 2

    if (calibrationObjectType === "Мегаомметр Е6-24") {
        if (calibrationValue === E6CalibrationValue.volts) {
            satadardError = findStandardErrorForVoltmetrCV8500(calibrationDot)
            userError = 0.5
        } else if (calibrationValue !== E6CalibrationValue.volts) {
            satadardError = findStandardErrorForP40116(calibrationDot, calibrationValue)
            userError = findEmrForE6_24(calibrationMiddleValue, calibrationValue)
        }
        permissibleValue = findPermissibleValueForE6_24(calibrationDot, calibrationValue)

    } else if (calibrationObjectType === "Мегаомметр Е6-24/1" || calibrationObjectType === "Мегаомметр Е6-24/2") {
        if (calibrationValue === E6CalibrationValue.volts) {
            satadardError = findStandardErrorForVoltmetrCV8500(calibrationDot)
            userError = 0.5
        } else if (calibrationValue !== E6CalibrationValue.volts) {
            satadardError = findStandardErrorForP40116(calibrationDot, calibrationValue)
            userError = findEmrForE6_24(calibrationMiddleValue, calibrationValue)
        }
        permissibleValue = findPermissibleValueForE6_24_1(calibrationDot, calibrationValue)

    } else if (calibrationObjectType === "Мегаомметр Е6-31" || calibrationObjectType === "Мегаомметр Е6-31/1" || calibrationObjectType === "Мегаомметр Е6-32") {
        if (calibrationValue === E6CalibrationValue.volts) {
            satadardError = findStandardErrorForVoltmetrCV8500(calibrationDot)
            userError = 0.5
        } else if (calibrationValue !== E6CalibrationValue.volts) {
            satadardError = findStandardErrorForP40116(calibrationDot, calibrationValue)
            userError = findEmrForE6_24(calibrationMiddleValue, calibrationValue)
        }
        permissibleValue = findPermissibleValueForE6_30(calibrationDot, calibrationValue)

    } else if (calibrationObjectType === "Мегаомметр ПСИ-2500" || calibrationObjectType === "Мегаомметр ПСИ-2510" || calibrationObjectType === "Мегаомметр ПСИ-2530") {
        if (calibrationValue === E6CalibrationValue.volts) {
            satadardError = findStandardErrorForVoltmetrCV8500(calibrationDot)
            userError = 0.5
        } else if (calibrationValue !== E6CalibrationValue.volts) {
            satadardError = findStandardErrorForP40116(calibrationDot, calibrationValue)
            userError = findEmrForE6_24(calibrationMiddleValue, calibrationValue)
        }

        if (calibrationObjectType === "Мегаомметр ПСИ-2500") {
            permissibleValue = findPermissibleValueForPSI2500(calibrationDot, calibrationValue)
        } else if (calibrationObjectType === "Мегаомметр ПСИ-2510" || calibrationObjectType === "Мегаомметр ПСИ-2530") {
            permissibleValue = findPermissibleValueForPSI2510(calibrationDot, calibrationValue)
        }

    } else if (calibrationObjectType === "Измеритель сопротивления заземления ИС-10" || calibrationObjectType === "Измеритель сопротивления заземления ИС-10/1" || calibrationObjectType === "Измеритель сопротивления заземления ИС-20" || calibrationObjectType === "Измеритель сопротивления заземления ИС-20/1") {
        userError = findUserErrorIS(calibrationMiddleValue, calibrationValue)
        satadardError = findStandardErrorIsP4834(calibrationMiddleValue)
        permissibleValue = findPermissibleValueIS(calibrationDot, calibrationValue)
    }
    let uncertaintyStnadardError = findUncertainty(satadardError)
    let uncertaintyUserError = findUncertainty(userError)
    let uncertaintyResult = findTotalUncertainty(uncertaintyMiddle, uncertaintyStnadardError, uncertaintyUserError)
    let uncertaintyMiddlePercent = findInterestDeposit(uncertaintyMiddle, uncertaintyResult)
    let uncertaintyStanadardErrorPercent = findInterestDeposit(uncertaintyStnadardError, uncertaintyResult)
    let uncertaintyUserErrorPercent = findInterestDeposit(uncertaintyUserError, uncertaintyResult)
    let resPercent = findValuesForUncertaintyResultPercent(uncertaintyMiddlePercent, uncertaintyUserErrorPercent, uncertaintyStanadardErrorPercent)
    // let uncertaintyResultPercent = uncertaintyMiddlePercent + uncertaintyUserErrorPercent + uncertaintyStanadardErrorPercent
    let error = calibrationMiddleValue - calibrationDot
    let expandedUncertainty = coefficient * uncertaintyResult
    let newCalibrationField: CalculationEsoType = {
        reportId: reportId,
        calculationId: calculationId,
        calibrationDot: stringHelper(calibrationDot, toFixedValue),
        testVoltage: testVoltage,
        dataForCalibration: stringArrayHelper(dataForCalibration, toFixedValue),
        calibrationMiddleValue: stringHelper(calibrationMiddleValue, toFixedValue),
        satadardError: stringHelper(satadardError, 5),
        userError: stringHelper(userError, toFixedValue + 1),
        uncertaintyMiddle: stringHelper(uncertaintyMiddle, 4),
        uncertaintyStnadardError: stringHelper(uncertaintyStnadardError, 4),
        uncertaintyUserError: stringHelper(uncertaintyUserError, 4),
        uncertaintyResult: stringHelper(uncertaintyResult, 4),
        uncertaintyMiddlePercent: stringHelper(resPercent[0], 3),
        uncertaintyStanadardErrorPercent: stringHelper(resPercent[2], 3),
        uncertaintyUserErrorPercent: stringHelper(resPercent[1], 3),
        // uncertaintyResultPercent: +uncertaintyResultPercent.toFixed(3),
        uncertaintyResultPercent: '100',
        error: stringHelper(error, toFixedValue),
        permissibleValue: stringHelper(permissibleValue, toFixedValue),
        expandedUncertainty: stringHelper(expandedUncertainty, toFixedValue+1),
        calibrationValue: calibrationValue,
    }
    return newCalibrationField
}

//Ищем емр для ифн-200, 300 300/1 при измернии сопротивления

const findUserErrorIfnOm = (calibrationDot: number) => {
    let userError = 0
    if (calibrationDot > 0 && calibrationDot <= 9.99) {
        userError = 0.005
    } else if (calibrationDot >= 10 && calibrationDot <= 99.9) {
        userError = 0.05
    } else if (calibrationDot >= 100 && calibrationDot <= 1000) {
        userError = 0.5
    }

    return +userError.toFixed(4)
}

//неопределённость катушек индуктиыности ИИ1 ИИ2 для активного сопротивления
const uncertaintyStnadardErrorRactiv_Reactiv = (calibrationDot: number) => {
    let uncertaintyStnadardError = 0
    if (calibrationDot > 100) {
        uncertaintyStnadardError = 1 / 2
    } else {
        uncertaintyStnadardError = 0.01 / 2
    }

    return +uncertaintyStnadardError.toFixed(3)
}

// Ищем допускаемые значения для ифн200

const findPermissibleValueForIfn_200 = (calibrationDot: number, calibrationValue: string) => {
    let permissibleValue = 0
    let a = 0
    if (calibrationValue === ValueIfnEnum.voltsAC) {
        a = 2 + 0.01 * (280 / calibrationDot - 1)
        permissibleValue = calibrationDot * a / 100 + 2
    } else if (calibrationValue === ValueIfnEnum.om) {
        if (calibrationDot >= 0.01 && calibrationDot <= 9.99) {
            a = 2 + 0.001 * (10 / calibrationDot - 1)
            permissibleValue = calibrationDot * a / 100 + 0.02
        } else if (calibrationDot >= 10 && calibrationDot <= 99.9) {
            a = 2 + 0.001 * (100 / calibrationDot - 1)
            permissibleValue = calibrationDot * a / 100 + 0.2
        } else if (calibrationDot >= 100 && calibrationDot <= 999) {
            a = 2 + 4 * calibrationDot / 1000
            permissibleValue = calibrationDot * a / 100 + 2
        }
    } else if (calibrationValue === ValueIfnEnum.omActiv || calibrationValue === ValueIfnEnum.omReact) {
        if (calibrationDot === StandardValueEnum.omReact_0_27) {
            permissibleValue = 0.04
        } else if (calibrationDot === StandardValueEnum.omActiv_0_33) {
            permissibleValue = 0.05
        } else if (calibrationDot === StandardValueEnum.omActiv_1_07) {
            permissibleValue = 0.07
        } else if (calibrationDot === StandardValueEnum.omReact_2_89) {
            permissibleValue = 0.13
        } else if (calibrationDot === StandardValueEnum.omActiv_140) {
            permissibleValue = 6.22
        } else if (calibrationDot === StandardValueEnum.omReact_162) {
            permissibleValue = 6.86
        }
    } 


    return +permissibleValue.toFixed(3)
}

// ищем допускаемые значения для ифн-300 и ифн300/1
const findPermissibleValueForIfn_300 = (calibrationDot: number, calibrationValue: string) => {
    let permissibleValue = 0
    
    if (calibrationValue === ValueIfnEnum.voltsAC) {
        permissibleValue = 0.025 * calibrationDot + 3
    } else if (calibrationValue === ValueIfnEnum.om) {
        if (calibrationDot >= 0.01 && calibrationDot <= 9.99) {
            permissibleValue = 0.03 * calibrationDot + 0.03
        } else if (calibrationDot >= 10 && calibrationDot <= 99.9) {
            permissibleValue = 0.03 * calibrationDot + 0.2
        } else if (calibrationDot >= 100 && calibrationDot <= 999) {
            permissibleValue = 0.03 * calibrationDot + 3
        }
    } else if (calibrationValue === ValueIfnEnum.omActiv || calibrationValue === ValueIfnEnum.omReact) {
        if (calibrationDot === StandardValueEnum.omReact_0_27) {
            permissibleValue = 0.04
        } else if (calibrationDot === StandardValueEnum.omActiv_0_33) {
            permissibleValue = 0.05
        } else if (calibrationDot === StandardValueEnum.omActiv_1_07) {
            permissibleValue = 0.07
        } else if (calibrationDot === StandardValueEnum.omReact_2_89) {
            permissibleValue = 0.13
        } else if (calibrationDot === StandardValueEnum.omActiv_140) {
            permissibleValue = 6.22
        } else if (calibrationDot === StandardValueEnum.omReact_162) {
            permissibleValue = 6.86
        }
    } 


    return +permissibleValue.toFixed(3)
}

//Cоздание нового объекта с расчитанными значениями для ИФН

export const createNewCalibrationFieldIfn = (calibrationDot: number, reportId: string, calculationId: string, dataForCalibration: number[], calibrationObjectType: string = calibrationObjectTypesEnum.ifn200, calibrationValue: string = ValueIfnEnum.om, calibrationValueSelect: string[], mode: string = modeEnum.om, modeSelect: string[], standardValue: StandardValueType[], toFixedValue?: number) => {

    let calibrationMiddleValue = findMiddleValueFromArray(dataForCalibration)
    let uncertaintyMiddle = findSKO(dataForCalibration)
    let satadardError = 0
    let userError = 0
    let permissibleValue = 0
    let coefficient = 2
    let uncertaintyStnadardError = 0
    


    if (calibrationObjectType === calibrationObjectTypesEnum.ifn200) {
        if (calibrationValue === ValueIfnEnum.voltsAC) {
            satadardError = findStandardErrorForVoltmetrCV8500(calibrationDot)
            userError = 0.5
            uncertaintyStnadardError = findUncertainty(satadardError)
        } else if (calibrationValue === ValueIfnEnum.om) {
            satadardError = calibrationDot * 0.02 / 100
            userError = findUserErrorIfnOm(calibrationMiddleValue)
            uncertaintyStnadardError = findUncertainty(satadardError)
        } else if (calibrationValue === ValueIfnEnum.omActiv || calibrationValue === ValueIfnEnum.omReact) {
            if(calibrationDot > 10) {
                userError = 0.5
            }else {
                userError = 0.005 
            }
            satadardError = 0
            uncertaintyStnadardError = uncertaintyStnadardErrorRactiv_Reactiv(calibrationDot) 
        }
        permissibleValue = findPermissibleValueForIfn_200(calibrationDot, calibrationValue)

    } else if (calibrationObjectType === calibrationObjectTypesEnum.ifn300 || calibrationObjectType ===  calibrationObjectTypesEnum.ifn300_1){
        if (calibrationValue === ValueIfnEnum.voltsAC) {
            satadardError = findStandardErrorForVoltmetrCV8500(calibrationDot)
            userError = 0.5
            uncertaintyStnadardError = findUncertainty(satadardError)
        }else if (calibrationValue === ValueIfnEnum.om) {
            satadardError = calibrationDot * 0.02 / 100
            userError = findUserErrorIfnOm(calibrationMiddleValue)
            uncertaintyStnadardError = findUncertainty(satadardError)
        }else if (calibrationValue === ValueIfnEnum.omActiv || calibrationValue === ValueIfnEnum.omReact) {
            if(calibrationDot > 10) {
                userError = 0.5
            }else {
                userError = 0.005 
            }
            satadardError = 0
            uncertaintyStnadardError = uncertaintyStnadardErrorRactiv_Reactiv(calibrationDot)
        }
        permissibleValue = findPermissibleValueForIfn_300(calibrationDot, calibrationValue)
    }
     
    let uncertaintyUserError = findUncertainty(userError)
    let uncertaintyResult = findTotalUncertainty(uncertaintyMiddle, uncertaintyStnadardError, uncertaintyUserError)
    let uncertaintyMiddlePercent = findInterestDeposit(uncertaintyMiddle, uncertaintyResult)
    let uncertaintyStanadardErrorPercent = findInterestDeposit(uncertaintyStnadardError, uncertaintyResult)
    let uncertaintyUserErrorPercent = findInterestDeposit(uncertaintyUserError, uncertaintyResult)
    // let uncertaintyResultPercent = uncertaintyMiddlePercent + uncertaintyUserErrorPercent + uncertaintyStanadardErrorPercent
    let resPercent = findValuesForUncertaintyResultPercent(uncertaintyMiddlePercent, uncertaintyUserErrorPercent, uncertaintyStanadardErrorPercent)
    let error = calibrationMiddleValue - calibrationDot
    let expandedUncertainty = coefficient * uncertaintyResult

    let newCalvulation: NewCalculationIfnType = {
        calculationId: calculationId,
        calibrationDot: stringHelper(calibrationDot, toFixedValue!),
        calibrationMiddleValue: stringHelper(calibrationMiddleValue, toFixedValue!),
        calibrationValue: calibrationValue,
        calibrationValueSelect: calibrationValueSelect,
        dataForCalibration: stringArrayHelper(dataForCalibration, toFixedValue!),
        error: stringHelper(error, toFixedValue!),
        expandedUncertainty: stringHelper(expandedUncertainty, toFixedValue! + 2),
        mode: mode,
        modeSelect: modeSelect,
        permissibleValue: stringHelper(permissibleValue, toFixedValue!),
        reportId: reportId,
        satadardError: stringHelper(satadardError, toFixedValue! + 3),
        standardValueInDot: +calibrationDot.toFixed(4), 
        standardValue: standardValue,
        uncertaintyMiddle: stringHelper(uncertaintyMiddle, toFixedValue! + 2),
        uncertaintyMiddlePercent: stringHelper(resPercent[0], 2),
        uncertaintyResult: stringHelper(uncertaintyResult, toFixedValue! + 2),
        // uncertaintyResultPercent: +uncertaintyResultPercent.toFixed(4),
        uncertaintyResultPercent: '100',
        uncertaintyStnadardError: stringHelper(uncertaintyStnadardError, toFixedValue! + 2),
        uncertaintyStanadardErrorPercent: stringHelper(resPercent[2], 2),
        uncertaintyUserError: stringHelper(uncertaintyUserError, toFixedValue! + 2),
        uncertaintyUserErrorPercent: stringHelper(resPercent[1], 2),
        userError: stringHelper(userError, toFixedValue! + 2),
    }

    return newCalvulation
}

//функции которая принимает число или массив чисел и значение округления приобразует в строку или массив строк и обратно
export const stringHelper = (value: number, toFixedValue: number) => {
    let newValue: string = ''
        newValue = value.toFixed(toFixedValue).replace('.', ',')
    return newValue   
}
export const stringArrayHelper = (arr: number[], toFixedValue: number) => {
    let newArr: string[] = []
    newArr = arr.map(el => el.toFixed(toFixedValue).replace('.', ','))
    return newArr   
}
export const numberHelper = (value: string) => { 
    let valueForCount: number = 0
   if(value.includes(',')){
    valueForCount = +value.replace(',', '.');
   }else{
    valueForCount = +value
   }
      return valueForCount
}
export const numberArrHelper = (arr: string[]) => {
    let numberArrValue: number[] = [];
    numberArrValue = arr.map((el) => {
      if (el.includes(',')) {
        return +el.replace(',', '.');
      } else {
        return +el;
      }
    });
    return numberArrValue;
  };
// .......................................................................................
numberHelper('10')