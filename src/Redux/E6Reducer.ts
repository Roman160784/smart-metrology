import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { v1 } from "uuid"
import { CalculationEsoType, ReportEsoType,} from "./EsoReducer"
import { RootState } from "./store"
import { createNewCalibrationFieldE6, numberArrHelper, numberHelper } from "./utils/utils"


export const E6TypeId = '12345'

export enum E6CalibrationValue {
    volts = '~В',
    om = 'Ом',
    mom = 'МОм',
    kom = 'кОм',
    gom = 'ГОм',
    miom = 'мОм'
}

const traceabilityE6 = 'Обеспечивается прослеживаемость результатов измерений до Национальных эталонов электрического сопротивления - НЭ РБ 29-16б, напряжения переменного тока в диапазоне частот 10 Гц – 2 ГГц НЭ РБ 5-01'
const mathModelE6 = 'Математическая модель: Rx = Ri0 +ΔR0 +δind'

const mathModelDataE6 = [
    'Rx – показания калибруемого устройства, Ом, кОм, MОм, ГОм, В',
    'Ri0 – показания эталона, Ом, кОм, MОм, ГОм, В',
    'ΔR0 – основная абсолютная погрешность эталона, Ом, кОм, MОм, ГОм, В',
    'δind – поправка, обусловленная разрешающей способность, Ом, кОм, MОм, ГОм, В',
]

const typeE6Id = v1()
const reportId = '1188131ea2-5f79-11ee-8918-e3627ebad505'


export type ReportE6Type = Omit<ReportEsoType, 'typeEsoId' | 'calibrationObjectType'> & {
    typeE6Id: string
    calibrationObjectType: string
}


export const addNewReportE6TC = createAsyncThunk(
    'e6Report/addReport',
    async (param: {reportId: string}, { dispatch, rejectWithValue }) => {
        try {
            let newReportMrp120 = {
                sectorEmirId: '11111',
                typeE6Id: typeE6Id,
                reportId: param.reportId,
                reportNumber: '0000/25/2160к',
                calibrationObjectName: 'Мегаомметр',
                calibrationObjectType : 'Е6-31',
                serialNumber: '1111',
                application: 'Заявка на калибровку № 001341 от 13.01.2023',
                customer: 'РУП "Гомельэнерго"',
                adresCustumer: '246028, г Гомель ул. Головацкого 19/212',
                calibrarionPlace: 'государственное предприятие "Гомельский ЦСМС"',
                calibrationDate: '11.11.2025',
                method: 'МК.ГМ 1580 - 2013, МК.ГМ 2186- 2019 Метод прямых измерений',
                temperature: '21,0',
                relativeHumidity: '31,8',
                pressure: '100,1',
                supplyVoltage: '228',
                frequency: '50',
                traceability: traceabilityE6,
                mathModel: mathModelE6,
                mathModelData: mathModelDataE6,
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
                        id: v1(),
                        standardName: 'Мера-имитатор',
                        standardType: 'Р40116',
                        standardNumber: '090',
                        value: '---',
                        calibrationDate: '11.2024'
                    },
                    {
                        reportId: param.reportId,
                        id: v1(),
                        standardName: 'Магазин сопротивлений',
                        standardType: 'МСР-60М',
                        standardNumber: '03260',
                        value: '---',
                        calibrationDate: '03.2024'
                    },
                    {
                        reportId: param.reportId,
                        id: v1(),
                        standardName: 'Прибор комбинированный цифровой',
                        standardType: 'Testo 511',
                        standardNumber: '39113412/607',
                        value: '---',
                        calibrationDate: '11.2024'
                    },
                    {
                        reportId: param.reportId,
                        id: v1(),
                        standardName: 'Прибор комбинированный цифровой',
                        standardType: 'Testo 605-H1',
                        standardNumber: '41110955/406',
                        value: '---',
                        calibrationDate: '01.2025'
                    },
                ],
            
                calculation: [
                //     {
                //     reportId: param.reportId,
                //     calculationId: 'calc2',
                //     calibrationDot: 1,
                //     testVoltage: "500 В",
                //     dataForCalibration: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                //     calibrationMiddleValue: 1,
                //     satadardError: 0,
                //     userError: 0,
                //     uncertaintyMiddle: 0,
                //     uncertaintyStnadardError: 0,
                //     uncertaintyUserError: 0,
                //     uncertaintyResult: 0,
                //     uncertaintyMiddlePercent: 0,
                //     uncertaintyStanadardErrorPercent: 0,
                //     uncertaintyUserErrorPercent: 0,
                //     uncertaintyResultPercent: 0,
                //     error: 0,
                //     permissibleValue: 0,
                //     expandedUncertainty: 0,
                //     calibrationValue: E6CalibrationValue.volts
                // },
                ],
                stigma: 'BY00045',
                boss: 'Д. В. Миранович: Начальник сектора ЭМиР ',
                engineer: "Р. С. Матвеенко: Инженер по метрологии I к",
            }

            return newReportMrp120
        } catch (e: any) {
            //return rejectedWithValue({Error: что то описать})
        } finally {

        }
    }
)

export const removeReportE6TC = createAsyncThunk(
    'e6Report/removeReport',
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
export const removeCalibrationFieldE6TC = createAsyncThunk(
    'e6Report/removeCalibrationFieldE6',
    async (param: { reportId: string, calculationId: string }, { dispatch, rejectWithValue }) => {
        try {
            return { reportId: param.reportId, calculationId: param.calculationId}
        }
        catch (e: any) {

        }
        finally {

        }
    }
)
export const updateDaraForCalculationCalibrationE6TC = createAsyncThunk(
    'e6Report/updateDaraForCalculationCalibrationMrpE6',
    async (param: { reportId: string, calculationId: string, index: number, dot: number, toFixedValue: number }, { dispatch, getState, rejectWithValue }) => {
        try {
            let state = getState() as RootState
            let report = state.reportE6.find(r => r.reportId === param.reportId)
            let calculation = report?.calculation.find(el => el.calculationId === param.calculationId)
            let calibrationObjectType = report?.calibrationObjectType
            let dataForCalibrationArr = numberArrHelper(calculation!.dataForCalibration)
            let dataForCalibration = dataForCalibrationArr.map((el, i) => i === param.index ? el = param.dot : el) 
            let calibrationDot = numberHelper(calculation!.calibrationDot)
            let calibrationValue = calculation?.calibrationValue
            let testVoltage = calculation?.testVoltage
            let newCalibrationField: CalculationEsoType = 
            createNewCalibrationFieldE6(dataForCalibration!, calibrationObjectType!,
                 testVoltage, calibrationValue, calibrationDot!, param.reportId, param.calculationId, param.toFixedValue)

            return { reportId: param.reportId, calculationId: param.calculationId, newCalibrationField}
        }
        catch (e: any) {

        }
        finally {

        }
    }
)
export const changeStandardCalibrationDateE6TC = createAsyncThunk(
    'e6Report/hangeStandardCalibrationDateE6',
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
export const changeReportE6TitleTC = createAsyncThunk(
    'e6Report/changeReportE6Title',
    async (param: { reportId: string, key: string, parameter: string }, { dispatch, rejectWithValue }) => {
        try {
            return { reportId: param.reportId, key: param.key, parameter: param.parameter}
        }
        catch (e: any) {

        }
        finally {

        }
    }
)
export const updateCalibrationObjectTypeE6TC = createAsyncThunk(
    'e6Report/updateCalibrationObjectTypeE6',
    async (param: { reportId: string, calibrationObjectType: string}, { dispatch, rejectWithValue }) => {
        try {
            return { reportId: param.reportId, calibrationObjectType: param.calibrationObjectType}
        }
        catch (e: any) {

        }
        finally {

        }
    }
)
export const updateTestVoltageReportE6TC = createAsyncThunk(
    'e6Report/updateTestVoltageReportE6',
    async (param: { reportId: string, calculationId: string, testVoltage: string}, { dispatch, rejectWithValue }) => {
        try {
            return { reportId: param.reportId, calculationId: param.calculationId, testVoltage: param.testVoltage}
        }
        catch (e: any) {

        }
        finally {

        }
    }
)
export const updateCalibrationValueE6TC = createAsyncThunk(
    'e6Report/updateCalibrationValueE6',
    async (param: { reportId: string, calculationId: string,  calibrationValue: string}, { dispatch, getState, rejectWithValue }) => {
        try {
            let state = getState() as RootState
            let report = state.reportE6.find(r => r.reportId === param.reportId)
            let calculation = report?.calculation.find(el => el.calculationId === param.calculationId)
            let calibrationObjectType = report?.calibrationObjectType
            let dataForCalibration = numberArrHelper(calculation!.dataForCalibration) 
            let testVoltage = calculation?.testVoltage
            let calibrationDot = numberHelper(calculation!.calibrationDot)
            let newCalibrationField: CalculationEsoType = 
            createNewCalibrationFieldE6(dataForCalibration!, calibrationObjectType!, testVoltage, param.calibrationValue, calibrationDot!, 
                param.reportId, param.calculationId, 1)  
                   
            return {reportId: param.reportId, calculationId: param.calculationId, newCalibrationField}
        }
        catch (e: any) {

        }
        finally {

        }
    }
)


export const addNewCalibrationFieldForE6andPsiTC = createAsyncThunk(
    'e6Report/addNewCalibrationFieldForE6andPsi',
    async (param: { reportId: string, calculationId: string, dot: number, toFixedValue: number }, { dispatch, getState, rejectWithValue }) => {
        try {
            
            let state = getState() as RootState
            let report = state.reportE6.find(r => r.reportId === param.reportId)
            let dataForCalibration: number[] = []
            for (let index = 0; index < 10; index++) {
                dataForCalibration.push(param.dot)
            }

            let calibrationObjectType = report?.calibrationObjectType 
            let calibrationValue = E6CalibrationValue.mom
            let testVoltage = '500 В'
            
            let newCalibrationField = createNewCalibrationFieldE6(dataForCalibration, calibrationObjectType!, testVoltage, calibrationValue, param.dot, param.reportId, param.calculationId, param.toFixedValue)
            return { reportId: param.reportId, calibrationObjectType: calibrationObjectType, newCalibrationField: newCalibrationField }
        }
        catch (e: any) {

        }
        finally {

        }
    }
)


const initialState: ReportE6Type[] = [
    {
    sectorEmirId: '11111',
    typeE6Id: typeE6Id,
    reportId: reportId,
    reportNumber: '123/25/2160к',
    calibrationObjectName: 'Мегаомметр',
    calibrationObjectType: 'Е6-31',
    serialNumber: '1111',
    application: 'Заявка на калибровку № 001341 от 13.01.2023',
    customer: 'РУП "Гомельэнерго"',
    adresCustumer: '246028, г Гомель ул. Головацкого 19/212',
    calibrarionPlace: 'государственное предприятие "Гомельский ЦСМС"',
    calibrationDate: '11.11.2025',
    method: 'МК.ГМ 1580 - 2013, МК.ГМ 2186- 2019 Метод прямых измерений',
    temperature: '21,0',
    relativeHumidity: '31,8',
    pressure: '100,1',
    supplyVoltage: '228',
    frequency: '50',
    traceability: traceabilityE6,
    mathModel: mathModelE6,
    mathModelData: mathModelDataE6,
    standard: [
        {
            reportId: reportId,
            id: '3',
            standardName: 'Вольтметр',
            standardType: 'ЦВ8500/3',
            standardNumber: '037',
            value: '---',
            calibrationDate: '10.2024'
        },
        {
            reportId: reportId,
            id: v1(),
            standardName: 'Мера-имитатор',
            standardType: 'Р40116',
            standardNumber: '090',
            value: '---',
            calibrationDate: '11.2024'
        },
        {
            reportId: reportId,
            id: v1(),
            standardName: 'Магазин сопротивлений',
            standardType: 'МСР-60М',
            standardNumber: '03260',
            value: '---',
            calibrationDate: '03.2024'
        },
        {
            reportId: reportId,
            id: v1(),
            standardName: 'Магазин сопротивлений',
            standardType: 'Р4834',
            standardNumber: '03447',
            value: '---',
            calibrationDate: '03.2024'
        },
        {
            reportId: reportId,
            id: '4',
            standardName: 'Прибор комбинированный цифровой',
            standardType: 'Testo 511',
            standardNumber: '39113412/607',
            value: '---',
            calibrationDate: '11.2024'
        },
        {
            reportId: reportId,
            id: '5',
            standardName: 'Прибор комбинированный цифровой',
            standardType: 'Testo 605-H1',
            standardNumber: '41110955/406',
            value: '---',
            calibrationDate: '01.2025'
        },
    ],

    calculation: [{
        reportId: reportId,
        calculationId: 'calc1',
        calibrationDot: '1',
        testVoltage: "500 В",
        dataForCalibration: ['1', '1', '1', '1', '1', '1', '1', '1', '1', '1'],
        calibrationMiddleValue: '1',
        satadardError: '0',
        userError: '0',
        uncertaintyMiddle: '0',
        uncertaintyStnadardError: '0',
        uncertaintyUserError: '0',
        uncertaintyResult: '0',
        uncertaintyMiddlePercent: '0',
        uncertaintyStanadardErrorPercent: '0',
        uncertaintyUserErrorPercent: '0',
        uncertaintyResultPercent: '0',
        error: '0',
        permissibleValue: '0',
        expandedUncertainty: '0',
        calibrationValue: E6CalibrationValue.mom
    },
    ],
    stigma: 'BY00045',
    boss: 'Д. В. Миранович: Начальник сектора ЭМиР ',
    engineer: "Р. С. Матвеенко: Инженер по метрологии I к",
},
]


const slice = createSlice({
    name: 'E6Report',
    initialState: initialState,
    reducers: {

    },
    extraReducers: builder => {
        // Add new report 
        builder.addCase(addNewReportE6TC.fulfilled, (state, action) => {
            state.unshift(action.payload!)
        })
        builder.addCase(addNewReportE6TC.rejected, (state, { payload }) => {
            //to do something inside
        })
         //Remove report
         builder.addCase(removeReportE6TC.fulfilled, (state, action) => {
            state.forEach((el, i) => el.reportId === action.payload?.reportId ? state.splice(i, 1) : el)
        })
        builder.addCase(removeReportE6TC.rejected, (state, { payload }) => {
            //to do something inside
        })
         //Add new calibraton field
         builder.addCase(addNewCalibrationFieldForE6andPsiTC.fulfilled, (state, action) => {
            let obj = state.find(el => el.reportId === action.payload?.reportId)
            if (obj && obj.calculation && action.payload?.newCalibrationField) {
                obj.calibrationObjectType  = action.payload.calibrationObjectType as string;
                obj.calculation.push(action.payload.newCalibrationField);
              }
        })
        builder.addCase(addNewCalibrationFieldForE6andPsiTC.rejected, (state, { payload }) => {
            //to do something inside
        })
         //Remove calibraton field
         builder.addCase(removeCalibrationFieldE6TC.fulfilled, (state, action) => {
            let obj = state.find(el => el.reportId === action.payload?.reportId)
            obj?.calculation.forEach((el, i) => el.calculationId === action.payload?.calculationId ? obj?.calculation.splice(i, 1) : el)
        })
        builder.addCase(removeCalibrationFieldE6TC.rejected, (state, { payload }) => {
            //to do something inside
        })
         //Update calibration object type
         builder.addCase(updateCalibrationObjectTypeE6TC.fulfilled, (state, action) => {
            let obj = state.find(el => el.reportId === action.payload?.reportId)
            if (obj && action.payload?.calibrationObjectType !== undefined) {
                obj.calibrationObjectType = action.payload.calibrationObjectType;
                obj.calculation = [];  
              }
        })
        builder.addCase(updateCalibrationObjectTypeE6TC.rejected, (state, { payload }) => {
            //to do something inside
        })
         //Update report title
         builder.addCase(changeReportE6TitleTC.fulfilled, (state, action) => {
          let copy = state.map(el => el.reportId === action.payload?.reportId ? {...el, [action.payload.key] : action.payload.parameter} : el)
          state = copy
          return state
        })
        builder.addCase(changeReportE6TitleTC.rejected, (state, { payload }) => {
            //to do something inside
        })
         //Update report standard date
         builder.addCase(changeStandardCalibrationDateE6TC.fulfilled, (state, action) => {
            state = state.map(el => el.reportId === action.payload?.reportId ? {
                ...el, standard: el.standard.map(el => el.id === action.payload?.id
                  ? { ...el, [action.payload.key]: action.payload.parameter } : el) } : el);
                
                return state;
        })
        builder.addCase(changeStandardCalibrationDateE6TC.rejected, (state, { payload }) => {
            //to do something inside
        })
         //Update test voltage
         builder.addCase(updateTestVoltageReportE6TC.fulfilled, (state, action) => {
            state = state.map(el => el.reportId === action.payload?.reportId ? {
                ...el, calculation : el.calculation.map(el => el.calculationId === action.payload?.calculationId 
                    ? {...el, testVoltage : action.payload.testVoltage} : el)} : el);
                return state;
        })
        builder.addCase(updateTestVoltageReportE6TC.rejected, (state, { payload }) => {
            //to do something inside
        })
         //Update data for calculation 
         builder.addCase(updateDaraForCalculationCalibrationE6TC.fulfilled, (state, action) => {
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
        builder.addCase(updateDaraForCalculationCalibrationE6TC.rejected, (state, { payload }) => {
            //to do something inside
        })
         //Update calculation value
         builder.addCase(updateCalibrationValueE6TC.fulfilled, (state, action) => {
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
        builder.addCase(updateCalibrationValueE6TC.rejected, (state, { payload }) => {
            //to do something inside
        })
    }
})

export const ReportE6Reducer = slice.reducer