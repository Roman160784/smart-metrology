import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { v1 } from 'uuid';
import { RootState } from "./store";
import { findInterestDeposit, findMiddleValueFromArray, findPermissibleValue, findSKO, findStandardErrorForEso, findTotalUncertainty, findUncertainty, findUserErrorInDotForEso } from "./utils/utils";

export type CalculationEsoType = {
    reportId: string
    calculationId: string
    calibrationDot: number
    testVoltage: string
    dataForCalibration: number[]
    calibrationMiddleValue: number
    satadardError: number
    userError: number
    uncertaintyMiddle: number
    uncertaintyStnadardError: number
    uncertaintyUserError: number
    uncertaintyResult: number
    uncertaintyMiddlePercent: number
    uncertaintyStanadardErrorPercent: number
    uncertaintyUserErrorPercent: number
    uncertaintyResultPercent: number
    error: number
    permissibleValue: number
    expandedUncertainty: number
    calibrationValue: string
}

export type ResultEsoType = {
    reportId: string
    calibrationDot: number
    testVoltage: string
    calibrationMiddleValue: number
    error: number
    permissibleValue: number
    expandedUncertainty: number
}

type StandardType = {
    id: string
    reportId: string
    standardName: string
    standardType: string
    standardNumber: string
    value: string
    calibrationDate: string
}



export type ReportEsoType = {
    sectorEmirId: string
    typeEsoId: string
    reportId: string
    reportNumber: string
    calibrationObjectName: string
    calibrationObjectType: string
    serialNumber: string
    application: string
    customer: string
    adresCustumer: string
    calibrarionPlace: string
    calibrationDate: string
    method: string
    temperature: string
    relativeHumidity: string
    pressure: string
    supplyVoltage: string
    frequency: string
    standard: StandardType[]
    calculation: CalculationEsoType[]
    stigma: string
    boss: string
    engineer: string
    traceability: string
    mathModel: string
    mathModelData: string[]
}

let traceability = 'Обеспечивается прослеживаемость результатов измерений до Национального эталона электрического сопротивления - НЭ РБ 29-16'
let mathModel = 'Математическая модель: Rx = Ri0 +ΔR0 +δind'
let mathModelData = [
    'Rx – показания калибруемого устройства, Ом',
    'Ri0 – показания эталона, Ом',
    'ΔR0 – основная абсолютная погрешность эталона, Ом',
    'δind – поправка, обусловленная разрешающей способность, Ом',
]


export let sectorEmirId = '11111' 
  
export const typeEsoId = v1()

export const updateCalculationDataTC = createAsyncThunk(
    'esoReport/updateCalculationData',
    async (param: { reportId: string, calculationId: string, index: number, testVoltage: string, dot: number },
        { dispatch, getState, rejectWithValue }) => {
        try {
            let state = getState() as RootState
            let report = state.reportEso.find(r => r.reportId === param.reportId)
            let newCalculation = report?.calculation.find(el => el.calculationId === param.calculationId)
            let calibrationDot = newCalculation?.calibrationDot
            let newDataForCalculation = newCalculation?.dataForCalibration.map((el, i) => i === param.index ? el = param.dot : el)
            let calibrationMiddleValue = findMiddleValueFromArray(newDataForCalculation!)
            let satadardError = findStandardErrorForEso(calibrationDot!)
            let userError = findUserErrorInDotForEso(calibrationDot!)
            let uncertaintyMiddle = findSKO(newDataForCalculation!)
            let uncertaintyStnadardError = findUncertainty(satadardError)
            let uncertaintyUserError = findUncertainty(userError)
            let uncertaintyResult = findTotalUncertainty(uncertaintyMiddle, uncertaintyStnadardError, uncertaintyUserError)
            let uncertaintyMiddlePercent = findInterestDeposit(uncertaintyMiddle, uncertaintyResult)
            let uncertaintyStanadardErrorPercent = findInterestDeposit(uncertaintyStnadardError, uncertaintyResult)
            let uncertaintyUserErrorPercent = findInterestDeposit(uncertaintyUserError, uncertaintyResult)
            let uncertaintyResultPercent = uncertaintyMiddlePercent + uncertaintyUserErrorPercent + uncertaintyStanadardErrorPercent
            let error = calibrationMiddleValue - calibrationDot!
            let permissibleValue = findPermissibleValue(calibrationDot!, 15)
            let coefficient = 2
            let expandedUncertainty = coefficient * uncertaintyResult

            let newCalibrationField: CalculationEsoType = {
                reportId: param.reportId,
                calculationId: param.calculationId,
                calibrationDot: calibrationDot!,
                testVoltage: param.testVoltage,
                dataForCalibration: newDataForCalculation!,
                calibrationMiddleValue: calibrationMiddleValue,
                satadardError: satadardError,
                userError: userError,
                uncertaintyMiddle: uncertaintyMiddle,
                uncertaintyStnadardError: uncertaintyStnadardError,
                uncertaintyUserError: uncertaintyUserError,
                uncertaintyResult: uncertaintyResult,
                uncertaintyMiddlePercent: uncertaintyMiddlePercent,
                uncertaintyStanadardErrorPercent: uncertaintyStanadardErrorPercent,
                uncertaintyUserErrorPercent: uncertaintyUserErrorPercent,
                uncertaintyResultPercent: +uncertaintyResultPercent.toFixed(3),
                error: +error.toFixed(3),
                permissibleValue: permissibleValue,
                expandedUncertainty: +expandedUncertainty.toFixed(2),
                calibrationValue: 'MOм',
            }

            return { reportId: param.reportId, calculationId: param.calculationId, newCalibrationField }
        }
        catch (e: any) {

        }
        finally {

        }
    }
)

export const addNewCalibrationFieldTC = createAsyncThunk(
    'esoReport/addNewCalibrationField',
    async (param: { reportId: string, calculationId: string, dot: number }, { dispatch, rejectWithValue, }) => {
        try {

            //Заполняем массив значениями для вычисления
            let dataForCalibration: number[] = []
            for (let index = 0; index < 10; index++) {
                dataForCalibration.push(param.dot)
            }
            // Ищем среднее значение из массива
            let calibrationMiddleValue = findMiddleValueFromArray(dataForCalibration)
            // Ищем погрешность эталона в точке
            let satadardError = findStandardErrorForEso(param.dot)
            // Ищем погрешность оператора
            let userError = findUserErrorInDotForEso(param.dot)
            //срасчёт СКО
            let uncertaintyMiddle = findSKO(dataForCalibration)
            //Ищем неопpеделённость Эталона
            let uncertaintyStnadardError = findUncertainty(satadardError)
            //Ищем неопpеделённость ошибки оператора
            let uncertaintyUserError = findUncertainty(userError)
            // расчёт сумарной неопределённости
            let uncertaintyResult = findTotalUncertainty(uncertaintyMiddle, uncertaintyStnadardError, uncertaintyUserError)
            //Расчёт процентного вклада
            let uncertaintyMiddlePercent = findInterestDeposit(uncertaintyMiddle, uncertaintyResult)
            let uncertaintyStanadardErrorPercent = findInterestDeposit(uncertaintyStnadardError, uncertaintyResult)
            let uncertaintyUserErrorPercent = findInterestDeposit(uncertaintyUserError, uncertaintyResult)
            let uncertaintyResultPercent = uncertaintyMiddlePercent + uncertaintyUserErrorPercent + uncertaintyStanadardErrorPercent
            //Расчёт погрешности в точке
            let error = calibrationMiddleValue - param.dot
            // Расчёт допускаемого значения 
            let permissibleValue = findPermissibleValue(param.dot, 15)
            //Расчёт расширенной неопределённости
            let coefficient = 2
            let expandedUncertainty = coefficient * uncertaintyResult

            let newCalibrationField: CalculationEsoType = {
                reportId: param.reportId,
                calculationId: param.calculationId,
                calibrationDot: param.dot,
                testVoltage: '500 В',
                dataForCalibration: dataForCalibration,
                calibrationMiddleValue: calibrationMiddleValue,
                satadardError: satadardError,
                userError: userError,
                uncertaintyMiddle: uncertaintyMiddle,
                uncertaintyStnadardError: uncertaintyStnadardError,
                uncertaintyUserError: uncertaintyUserError,
                uncertaintyResult: uncertaintyResult,
                uncertaintyMiddlePercent: uncertaintyMiddlePercent,
                uncertaintyStanadardErrorPercent: uncertaintyStanadardErrorPercent,
                uncertaintyUserErrorPercent: uncertaintyUserErrorPercent,
                uncertaintyResultPercent: +uncertaintyResultPercent.toFixed(3),
                error: +error.toFixed(3),
                permissibleValue: permissibleValue,
                expandedUncertainty: +expandedUncertainty.toFixed(2),
                calibrationValue: 'MOм',
            }
            return { reportId: param.reportId, calculationId: param.calculationId, newCalibrationField }
        }
        catch (e: any) {

        }
        finally {

        }
    }
)

export const updateTestVolageCalculationFieldTC = createAsyncThunk(
    'esoReport/updateTestVolageCalculationField',
    async (param: { reportId: string, calculationId: string, testVoltage: string }, { dispatch, rejectWithValue }) => {
        try {
            return { reportId: param.reportId, calculationId: param.calculationId, testVoltage: param.testVoltage }
        }
        catch (e: any) {

        }
        finally {

        }
    }
)


export const removeCalculationFieldTC = createAsyncThunk(
    'esoReport/removeCalculationField',
    async (param: { reportId: string, calculationId: string }, { dispatch, rejectWithValue }) => {
        try {
            return { reportId: param.reportId, calculationId: param.calculationId }
        }
        catch (e: any) {

        }
        finally {

        }
    }
)

export const updateReportTitleTC = createAsyncThunk(
    'esoReport/updateReportTitle',
    async (param: { reportId: string, key: string, parameter: string }, { dispatch, rejectWithValue }) => {
        try {
            return { reportId: param.reportId, key: param.key, parameter: param.parameter }
        }
        catch (e: any) {

        }
        finally {

        }
    }
)

export const updateStandardsDateTC = createAsyncThunk(
    'esoReport/updateStandardsDate',
    async (param: { reportId: string, key: string, parameter: string, id: string }, { dispatch, rejectWithValue }) => {
        try {
            return { reportId: param.reportId, key: param.key, parameter: param.parameter, id: param.id }
        }
        catch (e: any) {

        }
        finally {

        }
    }
)

export const removeReportTC = createAsyncThunk(
    'esoReport/removeReport',
    async (param: { reportId: string }, { dispatch, rejectWithValue }) => {
        try {
            return { reportId: param.reportId, }
        }
        catch (e: any) {

        }
        finally {

        }
    }
)

export const addReportEsoTC = createAsyncThunk(
    'esoReport/addReport',
    async (param: {}, { dispatch, rejectWithValue }) => {
        try {
            let id = v1()
            let newReportEso = {
                sectorEmirId: sectorEmirId,
                typeEsoId: typeEsoId,
                reportId: id,
                reportNumber: '0000/23/2160к',
                calibrationObjectName: 'Мегаомметр',
                calibrationObjectType: ' ЭС0202/2-Г',
                serialNumber: '1111',
                application: 'Заявка на калибровку № 001341 от 13.01.2023',
                customer: 'РУП "Гомельэнерго',
                adresCustumer: '246028, г Гомель ул. Головацкого 19/212',
                calibrarionPlace: 'государственное предприятие "Гомельский ЦСМС"',
                calibrationDate: '11.11.2023',
                method: 'МК.ГМ 1580 - 2013, Метод прямых измерений',
                temperature: '21,0',
                relativeHumidity: '31,8',
                pressure: '100,1',
                supplyVoltage: '228',
                frequency: '50',
                traceability: traceability,
                mathModel: mathModel,
                mathModelData: mathModelData,
                standard: [
                    {
                        reportId: id,
                        id: v1(),
                        standardName: 'Мера-имитатор',
                        standardType: 'Р40116',
                        standardNumber: '090',
                        value: '---',
                        calibrationDate: '11.2023'
                    },
                    {reportId: id,
                        id: v1(),
                        standardName: 'Прибор комбинированный цифровой',
                        standardType: 'Testo 511',
                        standardNumber: '39113412/607',
                        value: '---',
                        calibrationDate: '11.2023'},
                    {reportId: id,
                        id: v1(),
                        standardName: 'Прибор комбинированный цифровой',
                        standardType: 'Testo 605-H1',
                        standardNumber: '41110955/406',
                        value: '---',
                        calibrationDate: '01.2024'},
                ],
                
                calculation: [
                   
                ],
                stigma: 'BY00045',
                boss: 'Д. В. Миранович: Начальник сектора ЭМиР ',
                engineer: " Р. С. Матвеенко: Инженер по метрологии I к",
            }

            return newReportEso
        } catch (e: any) {
            //return rejectedWithValue({Error: что то описать})
        } finally {

        }
    }
)


// export const findCustomerTC = createAsyncThunk(
//     'esoReport/findCustomer',
//     async (param: { search: string }, { dispatch, rejectWithValue }) => {
//         try {
//             const res = await customerAPI.findCustomer(param.search)
//             console.log(res);
            
//             return {  }
//         }
//         catch (e: any) {

//         }
//         finally {

//         }
//     }
// )


const initialState: ReportEsoType[] = [
    {
        sectorEmirId: sectorEmirId,
        typeEsoId: typeEsoId,
        reportId: '88131ea2-5f79-11ee-8918-e3627ebad504',
        reportNumber: '83/23/2160к',
        calibrationObjectName: 'Мегаомметр',
        calibrationObjectType: ' ЭС0202/2-Г',
        serialNumber: '1111',
        application: 'Заявка на калибровку № 001341 от 13.01.2023',
        customer: 'РУП "Гомельэнерго"',
        adresCustumer: '246028, г Гомель ул. Головацкого 19/212',
        calibrarionPlace: 'государственное предприятие "Гомельский ЦСМС"',
        calibrationDate: '11.11.2023',
        method: 'МК.ГМ 1580 - 2013, Метод прямых измерений',
        temperature: '21,0',
        relativeHumidity: '31,8',
        pressure: '100,1',
        supplyVoltage: '228',
        frequency: '50',
        traceability: traceability,
        mathModel: mathModel,
        mathModelData: mathModelData,
        standard: [
            {
                reportId: '88131ea2-5f79-11ee-8918-e3627ebad504',
                id: '3',
                standardName: 'Мера-имитатор',
                standardType: 'Р40116',
                standardNumber: '090',
                value: '---',
                calibrationDate: '11.2023'
            }, 
            {
                reportId: '88131ea2-5f79-11ee-8918-e3627ebad504',
                id: '4',
                standardName: 'Прибор комбинированный цифровой',
                standardType: 'Testo 511',
                standardNumber: '39113412/607',
                value: '---',
                calibrationDate: '11.2023'
            },
            {
                reportId: '88131ea2-5f79-11ee-8918-e3627ebad504',
                id: '5',
                standardName: 'Прибор комбинированный цифровой',
                standardType: 'Testo 605-H1',
                standardNumber: '41110955/406',
                value: '---',
                calibrationDate: '01.2024'
            },
        ],
        
        calculation: [
            {
                calculationId: '1',
                reportId: '88131ea2-5f79-11ee-8918-e3627ebad504',
                calibrationDot: 1,
                testVoltage: '500 B',
                dataForCalibration: [1, 3, 3, 4, 1, 1, 1, 1, 1, 1],
                calibrationMiddleValue: 0,
                satadardError: 0,
                userError: 0,
                uncertaintyMiddle: 0,
                uncertaintyStnadardError: 0,
                uncertaintyUserError: 0,
                uncertaintyResult: 0,
                uncertaintyMiddlePercent: 0,
                uncertaintyStanadardErrorPercent: 0,
                uncertaintyUserErrorPercent: 0,
                uncertaintyResultPercent: 0,
                error: 0,
                permissibleValue: 0,
                expandedUncertainty: 0,
                calibrationValue: 'MOм',
            }
        ],
        stigma: 'BY00045',
        boss: 'Д. В. Миранович: Начальник сектора ЭМиР ',
        engineer: " Р. С. Матвеенко: Инженер по метрологии I к",
    }
]


const slice = createSlice({
    name: 'esoReport',
    initialState: initialState,
    reducers: {

    },
    extraReducers: builder => {
        //Add new report 
        builder.addCase(addReportEsoTC.fulfilled, (state, action) => {
            state.unshift(action.payload!)
        })
        builder.addCase(addReportEsoTC.rejected, (state, { payload }) => {
            //to do something inside
        })
        //Remove report
        builder.addCase(removeReportTC.fulfilled, (state, action) => {
            state.forEach((el, i) => el.reportId === action.payload?.reportId ? state.splice(i, 1) : el)
            return state
        })
        builder.addCase(removeReportTC.rejected, (state, { payload }) => {
            //to do something inside
        })
        //Update report
        builder.addCase(updateReportTitleTC.fulfilled, (state, action) => {
            let copy = state.map(el => el.reportId === action.payload?.reportId
                ? { ...el, [action.payload.key]: action.payload.parameter } : el)
            state = copy
            return state
        })
        builder.addCase(updateReportTitleTC.rejected, (state, { payload }) => {
            //to do something inside
        })
        //Update standards date
        builder.addCase(updateStandardsDateTC.fulfilled, (state, action) => {
            let obj = state.find(el => el.reportId === action.payload?.reportId)
            let newObj = obj?.standard.map(el => el.id === action.payload?.id ? {...el, [action.payload.key] : action.payload.parameter} : el)
            state = state.map((el) => {
                if (el.reportId === action.payload?.reportId) {
                  return {
                    ...el,
                    standard: newObj || el.standard
                  };
                }
                return el;
              });
           

            return state
        })
        builder.addCase(updateStandardsDateTC.rejected, (state, { payload }) => {
            //to do something inside
        })
        //Add new calibration field
        builder.addCase(addNewCalibrationFieldTC.fulfilled, (state, action) => {
            let obj = state.find(el => el.reportId === action.payload?.reportId)

            if (obj?.calculation && action.payload?.newCalibrationField) {
                obj.calculation.push(action.payload.newCalibrationField);
            }
            return state
        })
        builder.addCase(addNewCalibrationFieldTC.rejected, (state, { payload }) => {
            //to do something inside
        })
        //Remove calibration field
        builder.addCase(removeCalculationFieldTC.fulfilled, (state, action) => {
            let obj = state.find(el => el.reportId === action.payload?.reportId)

            if (obj?.calculation && action.payload?.calculationId) {
                obj.calculation.forEach((el, i) => el.calculationId === action.payload?.calculationId
                    ? obj?.calculation.splice(i, 1) : el)
            }
            return state
        })
        builder.addCase(removeCalculationFieldTC.rejected, (state, { payload }) => {
            //to do something inside
        })
        //Update calibration field
        builder.addCase(updateCalculationDataTC.fulfilled, (state, action) => {
             
               let obj = state.find(el => el.reportId === action.payload?.reportId)
               let  newCalculation : CalculationEsoType[]

               if (obj?.calculation && action.payload?.calculationId) {
                newCalculation  =  obj.calculation.map(el => el.calculationId === action.payload?.calculationId
                  ? el = action.payload.newCalibrationField
                  : el);
              }  

              state = state.map(el => el.reportId === action.payload?.reportId ? {...el, calculation : newCalculation} : el)
              return state
                
        })
        builder.addCase(updateCalculationDataTC.rejected, (state, { payload }) => {
            //to do something inside
        })
        //Update test voltage in field
        builder.addCase(updateTestVolageCalculationFieldTC.fulfilled, (state, action) => {
             
               let obj = state.find(el => el.reportId === action.payload?.reportId)
               let  newCalculation : CalculationEsoType[]

               if (obj?.calculation && action.payload?.calculationId) {
                newCalculation  =  obj.calculation.map(el => el.calculationId === action.payload?.calculationId
                  ? {...el, testVoltage : action.payload.testVoltage}
                  : el);
              }  

              state = state.map(el => el.reportId === action.payload?.reportId ? {...el, calculation : newCalculation} : el)
              return state
                
        })
        builder.addCase(updateTestVolageCalculationFieldTC.rejected, (state, { payload }) => {
            //to do something inside
        })
    }
})

export const ReportEsoReducer = slice.reducer