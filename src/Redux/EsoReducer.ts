import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { v1 } from 'uuid';

export type CalculationEsoType = {
    reportId: string
    calibrationDot: number
    testVoltage: string
    dataForCalibration: number[]
    calibrationMiddleValue: number
    sanadardError: number
    userError: number
    uncertaintyMiddle: number
    uncertaintySanadardError: number
    uncertaintyUserError: number
    uncertaintyResult: number
    uncertaintyMiddlePercent: number
    uncertaintySanadardErrorPercent: number
    uncertaintyUserErrorPercent: number
    uncertaintyResultPercent: number
    error: number
    permissibleValue: number
    expandedUncertainty: number
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

type StandatdType = {
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
    standard: StandatdType[]
    calculation: CalculationEsoType[]
    stigma: string
    boss: string
    engineer: string
    traceability: string
    mathModel: string
    mathModelData: string[]
}

let traceability = '>Обеспечивается прослеживаемость результатов измерений до Национального эталона электрического сопротивления - Ома НЭ РБ 29-16'
let mathModel = 'Математическая модель: Rx = Ri0 +ΔR0 +δind'
let mathModelData = [
    'Rx – показания калибруемого устройства, Ом',
    'Ri0 – показания эталона, Ом',
    'ΔR0 – основная абсолютная погрешность эталона, Ом',
    'δind – поправка, обусловленная разрешающей способность, Ом',
]

const sectorEmirId = v1()
export const typeEsoId = v1()

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
            let newReportEso = {
                sectorEmirId: sectorEmirId,
                typeEsoId: typeEsoId,
                reportId: v1(),
                reportNumber: '1111/23/2160к',
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
                        reportId: v1(),
                        standardName: 'Мера-имитатор',
                        standardType: 'Р40116',
                        standardNumber: '090',
                        value: '---',
                        calibrationDate: '11.2022'
                    }
                ],
                calculation: [
                    {
                        reportId: v1(),
                        calibrationDot: 1,
                        testVoltage: '500 B',
                        dataForCalibration: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        calibrationMiddleValue: 0,
                        sanadardError: 0,
                        userError: 0,
                        uncertaintyMiddle: 0,
                        uncertaintySanadardError: 0,
                        uncertaintyUserError: 0,
                        uncertaintyResult: 0,
                        uncertaintyMiddlePercent: 0,
                        uncertaintySanadardErrorPercent: 0,
                        uncertaintyUserErrorPercent: 0,
                        uncertaintyResultPercent: 0,
                        error: 0,
                        permissibleValue: 0,
                        expandedUncertainty: 0,
                    }
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
                standardName: 'Мера-имитатор',
                standardType: 'Р40116',
                standardNumber: '090',
                value: '---',
                calibrationDate: '11.2022'
            }
        ],
        calculation: [
            {
                reportId: '88131ea2-5f79-11ee-8918-e3627ebad504',
                calibrationDot: 1,
                testVoltage: '500 B',
                dataForCalibration: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                calibrationMiddleValue: 0,
                sanadardError: 0,
                userError: 0,
                uncertaintyMiddle: 0,
                uncertaintySanadardError: 0,
                uncertaintyUserError: 0,
                uncertaintyResult: 0,
                uncertaintyMiddlePercent: 0,
                uncertaintySanadardErrorPercent: 0,
                uncertaintyUserErrorPercent: 0,
                uncertaintyResultPercent: 0,
                error: 0,
                permissibleValue: 0,
                expandedUncertainty: 0,
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
    }
})

export const ReportEsoReducer = slice.reducer