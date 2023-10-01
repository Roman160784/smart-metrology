
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
export const findUserErrorInDot = (value: number) => {
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
