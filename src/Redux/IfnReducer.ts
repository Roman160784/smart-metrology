import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { v1 } from "uuid"
import { CalculationEsoType, ReportEsoType} from "./EsoReducer"
import { RootState } from "./store"
import { createNewCalibrationFieldIfn } from "./utils/utils"


const traceabilityIfn = 'Обеспечивается прослеживамость до Национальных эталонов электрического сопротивления - Ома НЭ РБ 29-16, напряжения переменного тока в диапазоне частот 10 Гц – 2 ГГц НЭ РБ 5-01'
const mathModelIfn = 'Rx = Ri0 +ΔR0 +δind'
const mathModelDataIfn = ['Rx – показания калибруемого устройства, Ом, R Ом, X Ом, ~B', 'ΔR0 – основная абсолютная погрешность эталона, Ом, R Ом, X Ом, ~B', 'δind – поправка, обусловленная разрешающей способностью, Ом, R Ом, X Ом, ~B']

export type NewCalculationIfnType = Omit<CalculationEsoType,   'testVoltage'> & {
    calibrationValueSelect: string[]
    standardValue: StandardValueType[] 
    mode: string,
    modeSelect: string[]
    standardValueInDot: number
}

export type ReportIfnType = Omit<ReportEsoType, 'typeEsoId' | 'calculation' | 'calibrationObjectName'> & {
    typeIfnId: string,
    allCalibrationObjectTypes: string[],
    calculation: NewCalculationIfnType[],
}

export enum modeEnum {
    L_N = 'L-N',
    L_L = 'L-L',
    L_Nx = 'L-N, (X)',
    L_Nr = 'L-N, (R)',
    L_Lr = 'L-L, (X)',
    L_Lx = 'L-L, (R)',
    om = 'Ом',
    voltsAC = '~B',
}


export enum ValueIfnEnum {
    voltsAC = '~B',
    om = 'Ом',
    omReact = 'Ом (X)',
    omActiv = 'Ом (R)',
}

export enum calibrationObjectTypesEnum {
    ifn200 = 'Измеритель сопротивления петли "фаза-нуль" ИФН-200',
    ifn300 = 'Измеритель сопротивления петли "фаза-нуль", "фаза-фаза" ИФН-300',
    ifn300_1 = 'Измеритель сопротивления петли "фаза-нуль", "фаза-фаза" ИФН-300/1',
}

export enum StandardValueEnum {
    omActiv_0_33 = 0.33,
    omActiv_1_07 = 1.10,
    omActiv_140 = 140,
    omReact_0_27 = 0.27,
    omReact_2_89 = 2.89,
    omReact_162 = 162,
}




export type StandardValueType = {
    id: string
    title: string
    value: number
    checked: boolean
}




const ifnId = '123567'
const reportId = '88131ea2-5f79-11ee-8918-e3627ebad50511'

export const addNewReportIfnTC = createAsyncThunk(
    'IfnReport/addReport',
    async (param: { reportId: string }, { dispatch, rejectWithValue }) => {
        try {
            let newReportMrp120 = {

                sectorEmirId: '11111',
                typeIfnId: ifnId,
                reportId: param.reportId,
                reportNumber: '0000/23/2160к',
                calibrationObjectType: calibrationObjectTypesEnum.ifn200,
                allCalibrationObjectTypes: [calibrationObjectTypesEnum.ifn200, calibrationObjectTypesEnum.ifn300, calibrationObjectTypesEnum.ifn300_1],
                serialNumber: '1111',
                application: 'Заявка на калибровку № 001341 от 13.01.2023',
                customer: 'РУП "Гомельэнерго"',
                adresCustumer: '246028, г Гомель ул. Головацкого 19/212',
                calibrarionPlace: 'государственное предприятие "Гомельский ЦСМС"',
                calibrationDate: '11.11.2023',
                method: 'МК.ГМ 2114-2018      Метод прямых измерений',
                temperature: '21,0',
                relativeHumidity: '31,8',
                pressure: '100,1',
                supplyVoltage: '228',
                frequency: '50',
                traceability: traceabilityIfn,
                mathModel: mathModelIfn,
                mathModelData: mathModelDataIfn,
                standard: [
                    {
                        reportId: param.reportId,
                        id: v1(),
                        standardName: 'Вольтметр',
                        standardType: 'ЦВ8500/3',
                        standardNumber: '037',
                        value: '---',
                        calibrationDate: '10.2023'
                    },
                    {
                        reportId: param.reportId,
                        id: v1(),
                        standardName: 'Испытательная индуктивность ИИ-1',
                        standardType: 'РЛПА.685442.003',
                        standardNumber: '0067',
                        value: '---',
                        calibrationDate: '09.2023'
                    },
                    {
                        reportId: param.reportId,
                        id: v1(),
                        standardName: 'Испытательная индуктивность ИИ-2',
                        standardType: 'РЛПА.685442.003-1',
                        standardNumber: '0067',
                        value: '---',
                        calibrationDate: '09.2023'
                    },
                    {
                        reportId: param.reportId,
                        id: v1(),
                        standardName: 'Магазин сопротивлений',
                        standardType: 'МСР-60М',
                        standardNumber: '03544',
                        value: '---',
                        calibrationDate: '03.2023'
                    },
                    {
                        reportId: param.reportId,
                        id: v1(),
                        standardName: 'Прибор комбинированный цифровой',
                        standardType: 'Testo 511',
                        standardNumber: '39113412/607',
                        value: '---',
                        calibrationDate: '11.2023'
                    },
                    {
                        reportId: param.reportId,
                        id: v1(),
                        standardName: 'Прибор комбинированный цифровой',
                        standardType: 'Testo 605-H1',
                        standardNumber: '41110955/406',
                        value: '---',
                        calibrationDate: '01.2024'
                    },
                ],

                calculation: [],
                
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

export const updateCalibrationValueIfnTC = createAsyncThunk(
    'IfnReport/updateCalibrationValueIfn',
    async (param: { reportId: string, calculationId: string,  calibrationValue: string}, { dispatch, getState, rejectWithValue }) => {
        try {
            let state = getState() as RootState
            let report = state.reportIfn.find(r => r.reportId === param.reportId)
            let calculation = report?.calculation.find(el => el.calculationId === param.calculationId)
            let calibrationObjectType = report?.calibrationObjectType
            let dataForCalibration = calculation?.dataForCalibration 
            let calibrationValueSelect = calculation?.calibrationValueSelect
            let mode = calculation?.mode
            let modeSelect = calculation?.modeSelect
            let standardValue = calculation?.standardValue
            let calibrationDot = calculation?.calibrationDot

            let newCalibrationField = createNewCalibrationFieldIfn(calibrationDot!, param.reportId, param.calculationId, dataForCalibration!, calibrationObjectType, param.calibrationValue, calibrationValueSelect!, mode, modeSelect!, standardValue!)
                   
            return {reportId: param.reportId, calculationId: param.calculationId, newCalibrationField}
        }
        catch (e: any) {

        }
        finally {

        }
    }
)

export const updateDaraForCalculationCalibrationIfnTC = createAsyncThunk(
    'IfnReport/updateDaraForCalculationCalibrationIfn',
    async (param: { reportId: string, calculationId: string, index: number, dot: number }, { dispatch, getState, rejectWithValue }) => {
        try {
            let state = getState() as RootState
            let report = state.reportIfn.find(r => r.reportId === param.reportId)
            let calculation = report?.calculation.find(el => el.calculationId === param.calculationId)
            let calibrationObjectType = report?.calibrationObjectType
            let dataForCalibration = calculation?.dataForCalibration.map((el, i) => i === param.index ? el = param.dot : el) 
            let calibrationDot = calculation?.calibrationDot
            let calibrationValue = calculation?.calibrationValue
            let calibrationValueSelect = calculation?.calibrationValueSelect
            let mode = calculation?.mode
            let modeSelect = calculation?.modeSelect
            let standardValue = calculation?.standardValue
            
            let newCalibrationField = createNewCalibrationFieldIfn(calibrationDot!, param.reportId, param.calculationId, dataForCalibration!, calibrationObjectType, calibrationValue, calibrationValueSelect!, mode, modeSelect!, standardValue!)

            return { reportId: param.reportId, calculationId: param.calculationId, newCalibrationField}
        }
        catch (e: any) {

        }
        finally {

        }
    }
)
export const updateStandardDataForCalculationCalibrationIfnTC = createAsyncThunk(
    'IfnReport/updateStandardDataForCalculationCalibrationIfn',
    async (param: { reportId: string, calculationId: string, id: string, standardValueInDot: number, checked: boolean }, { dispatch, getState, rejectWithValue }) => {
        try {
            let state = getState() as RootState
            let report = state.reportIfn.find(r => r.reportId === param.reportId)
            let calculation = report?.calculation.find(el => el.calculationId === param.calculationId)
            let standardValue = calculation?.standardValue.map(el => el.id === param.id ? {...el, checked: param.checked} : el)
            let calibrationObjectType = report?.calibrationObjectType
            let dataForCalibration = calculation?.dataForCalibration
            //
            let calibrationDot = param.standardValueInDot
            let calibrationValue = calculation?.calibrationValue
            let calibrationValueSelect = calculation?.calibrationValueSelect
            let mode = calculation?.mode
            let modeSelect = calculation?.modeSelect
            
            
            let newCalibrationField = createNewCalibrationFieldIfn(calibrationDot!, param.reportId, param.calculationId, dataForCalibration!, calibrationObjectType, calibrationValue, calibrationValueSelect!, mode, modeSelect!, standardValue!)

            return { reportId: param.reportId, calculationId: param.calculationId, newCalibrationField}
        }
        catch (e: any) {

        }
        finally {

        }
    }
)


export const removeCalibrationFieldIfnTC = createAsyncThunk(
    'IfnReport/removecalibratonFieldIfn',
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

export const addNewCalibrationFieldIfnReportTC = createAsyncThunk(
    'IfnReport/addNewcalibratonFieldIfn',
    async (param: { reportId: string, calculationId: string, dot: number }, { dispatch, getState, rejectWithValue }) => {
        try {
            
            let state = getState() as RootState
            let report = state.reportIfn.find(r => r.reportId === param.reportId)
            let dataForCalibration: number[] = []
            for (let index = 0; index < 10; index++) {
                dataForCalibration.push(param.dot)
            }

            let calibrationObjectType = report?.calibrationObjectType 
            let calibrationValue = ValueIfnEnum.om
            let calibrationValueSelect = [ValueIfnEnum.om, ValueIfnEnum.omActiv, ValueIfnEnum.omReact, ValueIfnEnum.voltsAC]
            let mode = modeEnum.om
            let modeSelect = [ modeEnum.om, modeEnum.L_L, modeEnum.L_N, modeEnum.voltsAC, modeEnum.L_Lr, modeEnum.L_Lx, modeEnum.L_Nr, modeEnum.L_Nx]
            let standardValue = [
                { id: v1(), title: ValueIfnEnum.omReact, value: StandardValueEnum.omReact_0_27, checked: false },
                { id: v1(), title: ValueIfnEnum.omReact, value: StandardValueEnum.omReact_162, checked: false },
                { id: v1(), title: ValueIfnEnum.omReact, value: StandardValueEnum.omReact_2_89, checked: false },
                { id: v1(), title: ValueIfnEnum.omActiv, value: StandardValueEnum.omActiv_0_33, checked: false },
                { id: v1(), title: ValueIfnEnum.omActiv, value: StandardValueEnum.omActiv_1_07, checked: false },
                { id: v1(), title: ValueIfnEnum.omActiv, value: StandardValueEnum.omActiv_140, checked: false },
            ]

            let newCalibrationField = createNewCalibrationFieldIfn(param.dot, param.reportId, param.calculationId, dataForCalibration, calibrationObjectType, calibrationValue, calibrationValueSelect, mode, modeSelect, standardValue)
            return { reportId: param.reportId, calibrationObjectType: calibrationObjectType, newCalibrationField: newCalibrationField}
        }
        catch (e: any) {

        }
        finally {

        }
    }
)

export const removeReportIfnTC = createAsyncThunk(
    'IfnReport/removeReport',
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
export const changeReportTitleIfnTC = createAsyncThunk(
    'IfnReport/changeReportTitleIfn',
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
export const updateCalibrationObjectTypeIfnTC = createAsyncThunk(
    'IfnReport/updateCalibrationObjectTypeIfn',
    async (param: { reportId: string, calibrationObjectType: string | number }, { dispatch, rejectWithValue }) => {
        try {
            return { reportId: param.reportId,  calibrationObjectType : param.calibrationObjectType}
        }
        catch (e: any) {

        }
        finally {

        }
    }
)

export const changeStandardCalibrationDateIfnTC = createAsyncThunk(
    'IfnReport/changeStandardCalibrationDateIfn',
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

export const updateModeForCalculationIfnTC = createAsyncThunk(
    'IfnReport/updateModeforCalculationFieldIfn',
    async (param: { reportId: string, calculationId: string, mode: string, }, { dispatch, getState, rejectWithValue }) => {
        try {
            return {  reportId: param.reportId, calculationId: param.calculationId, mode: param.mode, }
        }
        catch (e: any) {

        }
        finally {

        }
    }
)

const initialState: ReportIfnType[] = [{
    sectorEmirId: '11111',
    typeIfnId: ifnId,
    reportId: reportId,
    reportNumber: '123/23/2160к',
    calibrationObjectType: calibrationObjectTypesEnum.ifn200,
    allCalibrationObjectTypes: [calibrationObjectTypesEnum.ifn200, calibrationObjectTypesEnum.ifn300, calibrationObjectTypesEnum.ifn300_1],
    serialNumber: '1111',
    application: 'Заявка на калибровку № 001341 от 13.01.2023',
    customer: 'РУП "Гомельэнерго"',
    adresCustumer: '246028, г Гомель ул. Головацкого 19/212',
    calibrarionPlace: 'государственное предприятие "Гомельский ЦСМС"',
    calibrationDate: '11.11.2023',
    method: 'МК.ГМ 2114-2018      Метод прямых измерений',
    temperature: '21,0',
    relativeHumidity: '31,8',
    pressure: '100,1',
    supplyVoltage: '228',
    frequency: '50',
    traceability: traceabilityIfn,
    mathModel: mathModelIfn,
    mathModelData: mathModelDataIfn,
    standard: [
        {
            reportId: reportId,
            id: v1(),
            standardName: 'Вольтметр',
            standardType: 'ЦВ8500/3',
            standardNumber: '037',
            value: '---',
            calibrationDate: '10.2023'
        },
        {
            reportId: reportId,
            id: v1(),
            standardName: 'Испытательная индуктивность ИИ-1',
            standardType: 'РЛПА.685442.003',
            standardNumber: '0067',
            value: '---',
            calibrationDate: '09.2023'
        },
        {
            reportId: reportId,
            id: v1(),
            standardName: 'Испытательная индуктивность ИИ-2',
            standardType: 'РЛПА.685442.003-1',
            standardNumber: '0067',
            value: '---',
            calibrationDate: '09.2023'
        },
        {
            reportId: reportId,
            id: v1(),
            standardName: 'Магазин сопротивлений',
            standardType: 'МСР-60М',
            standardNumber: '03544',
            value: '---',
            calibrationDate: '03.2023'
        },
        {
            reportId: reportId,
            id: v1(),
            standardName: 'Прибор комбинированный цифровой',
            standardType: 'Testo 511',
            standardNumber: '39113412/607',
            value: '---',
            calibrationDate: '11.2023'
        },
        {
            reportId: reportId,
            id: v1(),
            standardName: 'Прибор комбинированный цифровой',
            standardType: 'Testo 605-H1',
            standardNumber: '41110955/406',
            value: '---',
            calibrationDate: '01.2024'
        },
    ],

    calculation: [
        {
            calculationId: '11113',
            calibrationDot: 1,
            calibrationMiddleValue: 1,
            calibrationValue:ValueIfnEnum.om,
            calibrationValueSelect: [ValueIfnEnum.om, ValueIfnEnum.omActiv, ValueIfnEnum.omReact, ValueIfnEnum.voltsAC],
            dataForCalibration: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
            error: 0,
            expandedUncertainty: 0,
            mode: modeEnum.om,
            modeSelect: [ modeEnum.om, modeEnum.L_L, modeEnum.L_N, modeEnum.voltsAC, modeEnum.L_Lr, modeEnum.L_Lx, modeEnum.L_Nr, modeEnum.L_Nx],
            permissibleValue: 1,
            reportId: reportId,
            satadardError: 0,
            standardValueInDot: StandardValueEnum.omReact_0_27,
            standardValue:
                [
                    { id: v1(), title: ValueIfnEnum.omReact, value: StandardValueEnum.omReact_0_27, checked: false },
                    { id: v1(), title: ValueIfnEnum.omReact, value: StandardValueEnum.omReact_162, checked: false },
                    { id: v1(), title: ValueIfnEnum.omReact, value: StandardValueEnum.omReact_2_89, checked: false },
                    { id: v1(), title: ValueIfnEnum.omActiv, value: StandardValueEnum.omActiv_0_33, checked: false },
                    { id: v1(), title: ValueIfnEnum.omActiv, value: StandardValueEnum.omActiv_1_07, checked: false },
                    { id: v1(), title: ValueIfnEnum.omActiv, value: StandardValueEnum.omActiv_140, checked: false },
                ],
            uncertaintyMiddle: 0,
            uncertaintyMiddlePercent: 1,
            uncertaintyResult: 0,
            uncertaintyResultPercent: 1,
            uncertaintyStnadardError: 1,
            uncertaintyStanadardErrorPercent: 1,
            uncertaintyUserError: 1,
            uncertaintyUserErrorPercent: 1,
            userError: 1,
        }
    ],
    stigma: 'BY00045',
    boss: 'Д. В. Миранович: Начальник сектора ЭМиР ',
    engineer: "Р. С. Матвеенко: Инженер по метрологии I к",
}
]


const slice = createSlice({
    name: 'ifnReport',
    initialState: initialState,
    reducers: {

    },
    extraReducers: builder => {
        //Add new report 
        builder.addCase(addNewReportIfnTC.fulfilled, (state, action) => {
            state.unshift(action.payload!)
        })
        builder.addCase(addNewReportIfnTC.rejected, (state, { payload }) => {
            //to do something inside
        })
        //Remove report 
        builder.addCase(removeReportIfnTC.fulfilled, (state, action) => {
            state.forEach((el, i) => el.reportId === action.payload?.reportId ? state.splice(i, 1) : el)
        })
        builder.addCase(removeReportIfnTC.rejected, (state, { payload }) => {
            //to do something inside
        })
        //Change report title 
        builder.addCase(changeReportTitleIfnTC.fulfilled, (state, action) => {
            state = state.map(el => el.reportId === action.payload?.reportId 
                ? {...el, [action.payload.key] : action.payload.parameter} : el)
                return state
        })
        builder.addCase(changeReportTitleIfnTC.rejected, (state, { payload }) => {
            //to do something inside
        })
        //Change calibration object type
        builder.addCase(updateCalibrationObjectTypeIfnTC.fulfilled, (state, action) => {
           let obj = state.find(el => el.reportId === action.payload?.reportId)
           if(obj && action.payload?.calibrationObjectType !== undefined) {
            obj.calibrationObjectType  = action.payload.calibrationObjectType as string;
                obj.calculation = [];  
           }
        })
        builder.addCase(updateCalibrationObjectTypeIfnTC.rejected, (state, { payload }) => {
            //to do something inside
        })
        //Change standard data
        builder.addCase(changeStandardCalibrationDateIfnTC.fulfilled, (state, action) => {
          state = state.map(el => el.reportId === action.payload?.reportId 
            ? {...el, standard : el.standard.map(el => el.id === action.payload?.id 
                ? {...el, [action.payload.key] : action.payload.parameter}: el)} : el)
                return state
        })
        builder.addCase(changeStandardCalibrationDateIfnTC.rejected, (state, { payload }) => {
            //to do something inside
        })
        //Add new calibration field
        builder.addCase(addNewCalibrationFieldIfnReportTC.fulfilled, (state, action) => {
            let obj = state.find(el => el.reportId === action.payload?.reportId)
            if (obj && obj.calculation && action.payload?.newCalibrationField) {
                obj.calibrationObjectType  = action.payload.calibrationObjectType as string;
                obj.calculation.push(action.payload.newCalibrationField);
              }
        })
        builder.addCase(addNewCalibrationFieldIfnReportTC.rejected, (state, { payload }) => {
            //to do something inside
        })
        //Remove calibration field
        builder.addCase(removeCalibrationFieldIfnTC.fulfilled, (state, action) => {
            let obj = state.find(el => el.reportId === action.payload?.reportId)
            obj?.calculation.forEach((el, i) => el.calculationId === action.payload?.calculationId ? obj?.calculation.splice(i, 1) : el)
        })
        builder.addCase(removeCalibrationFieldIfnTC.rejected, (state, { payload }) => {
            //to do something inside
        })
        //Update data for calculation
        builder.addCase(updateDaraForCalculationCalibrationIfnTC.fulfilled, (state, action) => {
            let obj = state.find(el => el.reportId === action.payload?.reportId)
            let  newCalculation : NewCalculationIfnType[]

            if (obj?.calculation && action.payload?.calculationId) {
             newCalculation  =  obj.calculation.map(el => el.calculationId === action.payload?.calculationId
               ? el = action.payload.newCalibrationField
               : el);
           }  
           state = state.map(el => el.reportId === action.payload?.reportId ? {...el, calculation : newCalculation} : el)
           return state
        })
        builder.addCase(updateDaraForCalculationCalibrationIfnTC.rejected, (state, { payload }) => {
            //to do something inside
        })
        //Update  calculation calibration value
        builder.addCase(updateCalibrationValueIfnTC.fulfilled, (state, action) => {
            let obj = state.find(el => el.reportId === action.payload?.reportId)
            let  newCalculation : NewCalculationIfnType[]

            if (obj?.calculation && action.payload?.calculationId) {
             newCalculation  =  obj.calculation.map(el => el.calculationId === action.payload?.calculationId
               ? el = action.payload.newCalibrationField
               : el);
           }  
           state = state.map(el => el.reportId === action.payload?.reportId ? {...el, calculation : newCalculation} : el)
           return state
        })
        builder.addCase(updateCalibrationValueIfnTC.rejected, (state, { payload }) => {
            //to do something inside
        })
        //Update  calculation standard value with check box
        builder.addCase(updateStandardDataForCalculationCalibrationIfnTC.fulfilled, (state, action) => {
            let obj = state.find(el => el.reportId === action.payload?.reportId)
            let  newCalculation : NewCalculationIfnType[]

            if (obj?.calculation && action.payload?.calculationId) {
             newCalculation  =  obj.calculation.map(el => el.calculationId === action.payload?.calculationId
               ? el = action.payload.newCalibrationField
               : el);
           }  
           state = state.map(el => el.reportId === action.payload?.reportId ? {...el, calculation : newCalculation} : el)
           return state
        })
        builder.addCase(updateStandardDataForCalculationCalibrationIfnTC.rejected, (state, { payload }) => {
            //to do something inside
        })
        //Update  calculation calibration value
        builder.addCase(updateModeForCalculationIfnTC.fulfilled, (state, action) => {
           state = state.map(el => el.reportId === action.payload?.reportId 
            ? {...el, calculation: el.calculation.map(c => c.calculationId === action.payload?.calculationId 
                ? {...c, mode : action.payload.mode} : c)} : el)
                return state
        })
        builder.addCase(updateModeForCalculationIfnTC.rejected, (state, { payload }) => {
            //to do something inside
        })
       
        
    }
})

export const ReportIfnReducer = slice.reducer