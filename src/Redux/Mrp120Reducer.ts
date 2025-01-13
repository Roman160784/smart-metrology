import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import {  CalculationEsoType, ReportEsoType, sectorEmirId } from "./EsoReducer";
import { RootState } from "./store";
import { createNewCalibrationFieldMRP120, findInterestDeposit, findMiddleValueFromArray, findPermissibleValueForMrp120, findSKO, findStandardErrorForMrp120, findTotalUncertainty, findUncertainty, findUserErrorInDotForMrp120, numberArrHelper, numberHelper, stringArrayHelper, stringHelper } from "./utils/utils";


 const mrp120Id = '1234'
export type ReportMrp120Type = Omit<ReportEsoType, 'typeEsoId'> & {
    typeMrp120Id: string
}

const traceabilityMrp = 'Обеспечивается прослеживаемость результатов измерений до Национальных эталонов единиц: времени – секунды, частоты – герца и шкалы времени НЭ РБ 1-95, напряжения переменного тока в диапазоне частот 10 Гц – 2 ГГц НЭ РБ 5-01, НЭ РБ 5-01 Национальный эталон единицы напряжения переменного тока в диапазоне частот 10 Гц – 2 ГГц '
const mathModelMrp = 'Rx = Ri0 +ΔR0 +δind'
const mathModelDataMrp =[
    'Rx – показания калибруемого устройства, В, мА, с',
    'Ri0 – показания эталона, В, мА, с',
    'ΔR0 – основная абсолютная погрешность эталона, В, мА, с',
    'δind – поправка, обусловленная разрешающей способность, В, мА, с',
]


export const changeReportMrp120TitleTC = createAsyncThunk(
    'mrp120Report/changeReportMrp120Title',
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
export const changeStandardCalibrationDateTC = createAsyncThunk(
    'mrp120Report/changeStandardCalibrationDate',
    async (param: {reportId: string, key: string, parameter: string, id: string}, { dispatch, rejectWithValue }) => {
        try {
            return { reportId: param.reportId, key: param.key, parameter: param.parameter, id: param.id }
        }
        catch (e: any) {

        }
        finally {

        }
    }
)

export const addNewReportMrp120TC = createAsyncThunk(
    'mrp120Report/addReport',
    async (param: {reportId: string}, { dispatch, rejectWithValue }) => {
        try {
            let newReportMrp120 = {
                sectorEmirId: sectorEmirId,
                typeMrp120Id: mrp120Id,
                reportId: param.reportId,
                reportNumber: '0000/25/2160к',
                calibrationObjectName: '',
                calibrationObjectType: 'Измеритель напряжения прикосновения и параметров защитного отключения MRP-120',
                serialNumber: '1111',
                application: 'Заявка на калибровку ',
                customer: 'РУП "Гомельэнерго',
                adresCustumer: '246028, г Гомель ул. Головацкого 19/212',
                calibrarionPlace: 'государственное предприятие "Гомельский ЦСМС"',
                calibrationDate: '11.11.2025',
                method: 'МК.ГМ 2114-2018 , Метод прямых измерений',
                temperature: '21,0',
                relativeHumidity: '31,8',
                pressure: '100,1',
                supplyVoltage: '228',
                frequency: '50',
                traceability: traceabilityMrp,
                mathModel: mathModelMrp,
                mathModelData: mathModelDataMrp,
                standard: [
                    {
                        reportId: param.reportId,
                        id: '3',
                        standardName: 'Вольтметр',
                        standardType: 'ЦВ8500/3',
                        standardNumber: '037',
                        value: '---',
                        calibrationDate: '10.2024'
                    }, 
                    {
                        reportId: param.reportId,
                        id: '6',
                        standardName: 'Амперметр',
                        standardType: 'ЦА8500/1',
                        standardNumber: '043',
                        value: '---',
                        calibrationDate: '10.2024'
                    }, 
                    {
                        reportId: param.reportId,
                        id: '7',
                        standardName: 'Калибратор времени отключения УЗО',
                        standardType: 'ERS-2',
                        standardNumber: '69',
                        value: '---',
                        calibrationDate: '07.2024'
                    }, 
                    {
                        reportId: param.reportId,
                        id: '4',
                        standardName: 'Прибор комбинированный цифровой',
                        standardType: 'Testo 511',
                        standardNumber: '39113412/607',
                        value: '---',
                        calibrationDate: '11.2024'
                    },
                    {
                        reportId: param.reportId,
                        id: '5',
                        standardName: 'Прибор комбинированный цифровой',
                        standardType: 'Testo 605-H1',
                        standardNumber: '41110955/406',
                        value: '---',
                        calibrationDate: '01.2025'
                    },
                ],
                
                calculation: [
                   
                ],
                stigma: 'BY00045',
                boss: 'Д. В. Миранович: Начальник сектора ЭМиР ',
                engineer: " Р. С. Матвеенко: Инженер по метрологии I к",
            }

            return newReportMrp120
        } catch (e: any) {
            //return rejectedWithValue({Error: что то описать})
        } finally {

        }
    }
)

export const removeReportMrp120TC = createAsyncThunk(
    'mrp120Report/removeReport',
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
export const removeCalculationMrp120FieldTC = createAsyncThunk(
    'mrp120Report/removeCalculationFieldMrp120Report',
    async (param: { reportId: string,  calculationId: string,}, { dispatch, rejectWithValue }) => {
        try {
            return { reportId: param.reportId, calculationId: param.calculationId}
        }
        catch (e: any) {

        }
        finally {

        }
    }
)

export const updateCalibrationValueMrp120TC = createAsyncThunk(
    'mrp120Report/updateCalibrationValueMrp120Report',
    async (param: { reportId: string,  calculationId: string, calibrationValue: string}, { dispatch, getState, rejectWithValue }) => {
        try {
            let state = getState() as RootState
            let report = state.reportMrp120.find(r => r.reportId === param.reportId)
            let calculation = report?.calculation.find(el => el.calculationId === param.calculationId)
            let dataForCalibration = numberArrHelper(calculation!.dataForCalibration)
            let calibrationDot = numberHelper(calculation!.calibrationDot)
            let newCalibrationField: CalculationEsoType = 
            createNewCalibrationFieldMRP120(dataForCalibration!, param.calibrationValue, calibrationDot!, param.reportId, param.calculationId)

            return { reportId: param.reportId, calculationId: param.calculationId, newCalibrationField}
        }
        catch (e: any) {

        }
        finally {

        }
    }
)

export const updateDaraForCalculationCalibrationMrp120TC = createAsyncThunk(
    'mrp120Report/updateDaraForCalculationCalibrationMrp120',
    async (param: { reportId: string, calculationId: string, index: number, dot: number, toFixedValue: number}, { dispatch, getState, rejectWithValue }) => {
        try {
            let state = getState() as RootState
            let report = state.reportMrp120.find(r => r.reportId === param.reportId)
            let calculation = report?.calculation.find(el => el.calculationId === param.calculationId)
            let dataForCalibrationArray = numberArrHelper(calculation!.dataForCalibration)
            let dataForCalibration = dataForCalibrationArray.map((el, i) => i === param.index ? el = param.dot : el)
            let calibrationDot = numberHelper(calculation!.calibrationDot)
            let calibrationValue = calculation?.calibrationValue
            let newCalibrationField: CalculationEsoType = 
            createNewCalibrationFieldMRP120(dataForCalibration!, calibrationValue!, calibrationDot!, param.reportId, param.calculationId, param.toFixedValue)

            return { reportId: param.reportId, calculationId: param.calculationId, newCalibrationField}
        }
        catch (e: any) {

        }
        finally {

        }
    }
)

export const addNewCalibrationFielMrp120dTC = createAsyncThunk(
    'mrp120Report/addNewCalibrationFieldMrp120',
    async (param: { reportId: string, calculationId: string, dot: number, toFixedValue: number}, { dispatch, rejectWithValue }) => {
        try {
            let dataForCalibration: number[] = []
            for (let index = 0; index < 10; index++) {
                dataForCalibration.push(param.dot)
            }
            let calibrationValue = 'В'
            let calibrationMiddleValue = findMiddleValueFromArray(dataForCalibration)
            let satadardError = findStandardErrorForMrp120(param.dot, calibrationValue)
            let userError = findUserErrorInDotForMrp120(param.dot, calibrationValue)
            let uncertaintyMiddle = findSKO(dataForCalibration)
            let uncertaintyStnadardError = findUncertainty(satadardError)
            let uncertaintyUserError = findUncertainty(userError)
            let uncertaintyResult = findTotalUncertainty(uncertaintyMiddle, uncertaintyStnadardError, uncertaintyUserError)
            let uncertaintyMiddlePercent = findInterestDeposit(uncertaintyMiddle, uncertaintyResult)
            let uncertaintyStanadardErrorPercent = findInterestDeposit(uncertaintyStnadardError, uncertaintyResult)
            let uncertaintyUserErrorPercent = findInterestDeposit(uncertaintyUserError, uncertaintyResult)
            let uncertaintyResultPercent = uncertaintyMiddlePercent + uncertaintyUserErrorPercent + uncertaintyStanadardErrorPercent
            let error = calibrationMiddleValue - param.dot
            let permissibleValue = findPermissibleValueForMrp120(param.dot, calibrationValue)
            let coefficient = 2
            let expandedUncertainty = coefficient * uncertaintyResult

            let newCalibrationField: CalculationEsoType = {
                reportId: param.reportId,
                calculationId: param.calculationId,
                calibrationDot: stringHelper(param.dot, param.toFixedValue),
                testVoltage: '-',
                dataForCalibration: stringArrayHelper(dataForCalibration, param.toFixedValue),
                calibrationMiddleValue: stringHelper(calibrationMiddleValue, param.toFixedValue),
                satadardError: stringHelper(satadardError, param.toFixedValue + 3),
                userError: stringHelper(userError, param.toFixedValue + 3),
                uncertaintyMiddle: stringHelper(uncertaintyMiddle, param.toFixedValue + 3),
                uncertaintyStnadardError: stringHelper(uncertaintyStnadardError, param.toFixedValue + 3),
                uncertaintyUserError: stringHelper(uncertaintyUserError, param.toFixedValue + 3),
                uncertaintyResult: stringHelper(uncertaintyResult, param.toFixedValue + 3),
                uncertaintyMiddlePercent: stringHelper(uncertaintyMiddlePercent, 2),
                uncertaintyStanadardErrorPercent: stringHelper(uncertaintyStanadardErrorPercent, 2),
                uncertaintyUserErrorPercent: stringHelper(uncertaintyUserErrorPercent, 2),
                uncertaintyResultPercent: stringHelper(uncertaintyResultPercent, 0),
                error: stringHelper(error, param.toFixedValue),
                permissibleValue: stringHelper(permissibleValue, param.toFixedValue),
                expandedUncertainty: stringHelper(expandedUncertainty, param.toFixedValue + 1),
                calibrationValue: calibrationValue,
            }
            return { reportId: param.reportId, calculationId: param.calculationId, newCalibrationField }
        }

        
        catch (e: any) {

        }
        finally {

        }
    }
)


const initialState: ReportMrp120Type [] = [{
    sectorEmirId: sectorEmirId,
    typeMrp120Id: mrp120Id,
        reportId: '88131ea2-5f79-11ee-8918-e3627ebad505',
        reportNumber: '123/25/2160к',
        calibrationObjectName: '',
        calibrationObjectType: 'Измеритель напряжения прикосновения и параметров защитного отключения MRP-120',
        serialNumber: '1111',
        application: 'Заявка на калибровку № 001341 от 13.01.2023',
        customer: 'РУП "Гомельэнерго"',
        adresCustumer: '246028, г Гомель ул. Головацкого 19/212',
        calibrarionPlace: 'государственное предприятие "Гомельский ЦСМС"',
        calibrationDate: '11.11.2025',
        method: 'МК.ГМ 2114-2018      Метод прямых измерений',
        temperature: '21,0',
        relativeHumidity: '31,8',
        pressure: '100,1',
        supplyVoltage: '228',
        frequency: '50',
        traceability: traceabilityMrp,
        mathModel: mathModelMrp,
        mathModelData: mathModelDataMrp,
        standard: [
            {
                reportId: '88131ea2-5f79-11ee-8918-e3627ebad505',
                id: '3',
                standardName: 'Вольтметр',
                standardType: 'ЦВ8500/3',
                standardNumber: '037',
                value: '---',
                calibrationDate: '10.2024'
            }, 
            {
                reportId: '88131ea2-5f79-11ee-8918-e3627ebad505',
                id: '6',
                standardName: 'Амперметр',
                standardType: 'ЦА8500/1',
                standardNumber: '043',
                value: '---',
                calibrationDate: '10.2024'
            }, 
            {
                reportId: '88131ea2-5f79-11ee-8918-e3627ebad505',
                id: '7',
                standardName: 'Калибратор времени отключения УЗО',
                standardType: 'ERS-2',
                standardNumber: '69',
                value: '---',
                calibrationDate: '07.2024'
            }, 
            {
                reportId: '88131ea2-5f79-11ee-8918-e3627ebad505',
                id: '4',
                standardName: 'Прибор комбинированный цифровой',
                standardType: 'Testo 511',
                standardNumber: '39113412/607',
                value: '---',
                calibrationDate: '11.2024'
            },
            {
                reportId: '88131ea2-5f79-11ee-8918-e3627ebad505',
                id: '5',
                standardName: 'Прибор комбинированный цифровой',
                standardType: 'Testo 605-H1',
                standardNumber: '41110955/406',
                value: '---',
                calibrationDate: '01.2025'
            },
        ],
        
        calculation: [
            
        ],
        stigma: 'BY00045',
        boss: 'Д. В. Миранович: Начальник сектора ЭМиР ',
        engineer: "Р. С. Матвеенко: Инженер по метрологии I к",
    }
]

const slice = createSlice({
    name: 'mrp120Report',
    initialState: initialState,
    reducers: {

    },
    extraReducers: builder => {
        //Add new report 
        builder.addCase(addNewReportMrp120TC.fulfilled, (state, action) => {
                state.unshift(action.payload!)  
        })
        builder.addCase(addNewReportMrp120TC.rejected, (state, { payload }) => {
            //to do something inside
        })
        //Change report title
        builder.addCase(changeReportMrp120TitleTC.fulfilled, (state, action) => {
            let copy = state.map(el => el.reportId === action.payload?.reportId
                ? { ...el, [action.payload.key]: action.payload.parameter } : el)
            state = copy
            return state  
        })
        builder.addCase(changeReportMrp120TitleTC.rejected, (state, { payload }) => {
            //to do something inside
        })
        //Change report data of calibration for standard title
        builder.addCase(changeStandardCalibrationDateTC.fulfilled, (state, action) => {
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
        builder.addCase(changeStandardCalibrationDateTC.rejected, (state, { payload }) => {
            //to do something inside
        })
        //Remove report
        builder.addCase(removeReportMrp120TC.fulfilled, (state, action) => {
            state.forEach((el, i) => el.reportId === action.payload?.reportId ? state.splice(i, 1) : el)
        })
        builder.addCase(removeReportMrp120TC.rejected, (state, { payload }) => {
            //to do something inside
        })
        //Add new calibration field
        builder.addCase(addNewCalibrationFielMrp120dTC.fulfilled, (state, action) => {
            let obj = state.find(el => el.reportId === action.payload?.reportId)
            if (obj?.calculation && action.payload?.newCalibrationField) {
                obj.calculation.push(action.payload.newCalibrationField);
            }
        })
        builder.addCase(addNewCalibrationFielMrp120dTC.rejected, (state, { payload }) => {
            //to do something inside
        })
        //Remove calibration field
        builder.addCase(removeCalculationMrp120FieldTC.fulfilled, (state, action) => {
            let obj = state.find(el => el.reportId === action.payload?.reportId)
            if (obj?.calculation && action.payload?.calculationId) {
                obj.calculation.forEach((el, i) => el.calculationId === action.payload?.calculationId
                    ? obj?.calculation.splice(i, 1) : el)
            } 
        })
        builder.addCase(removeCalculationMrp120FieldTC.rejected, (state, { payload }) => {
            //to do something inside
        })
        //Update  calibration value 
        builder.addCase(updateCalibrationValueMrp120TC.fulfilled, (state, action) => {
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
        builder.addCase(updateCalibrationValueMrp120TC.rejected, (state, { payload }) => {
            //to do something inside
        })
        //Update data for calculation 
        builder.addCase(updateDaraForCalculationCalibrationMrp120TC.fulfilled, (state, action) => {
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
        builder.addCase(updateDaraForCalculationCalibrationMrp120TC.rejected, (state, { payload }) => {
            //to do something inside
        })
    }
})

export const ReportMrp120Reducer = slice.reducer