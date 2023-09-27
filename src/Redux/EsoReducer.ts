import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { v1 } from 'uuid';

export type CalculationEsoType = {
    id: string
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
    id: string
    calibrationDot: number
    testVoltage: string
    calibrationMiddleValue: number
    error: number
    permissibleValue: number
    expandedUncertainty: number
}

type CalibrationConditionsType = {
    id: string
    temperature: string
    relativeHumidity: string
    pressure: string
    supplyVoltage: string
    frequency: string
}

type StandatdType = {
    id: string
    standardName: string
    standardType: string
    standardNumber: string
    value: string
    calibrationDate: string
}

export type ReportEsoType = {
    sectorId: string
    typeId: string
    reportId: string
    reportNumber: string
    calibrationObject: string
    serialNumber: string
    application: string
    customer: string
    adresCustumer: string
    calibrarionPlace: string
    calibrationDate: string
    method: string
    calibrationConditions: CalibrationConditionsType
    standard: StandatdType[]
    calculation: CalculationEsoType[]
    stigma: string
    boss: string
    engineer: string
}

const initialState: ReportEsoType[] = [
    {
        sectorId: v1(),
        typeId: v1(),
        reportId: v1(),
        reportNumber: '83/23/2160к',
        calibrationObject: 'Мегаомметр ЭС0202/2-Г',
        serialNumber: '1111',
        application: 'Заявка на калибровку № 001341 от 13.01.2023',
        customer: 'РУП "Гомельэнерго',
        adresCustumer: '246028, г Гомель ул. Головацкого 19/212',
        calibrarionPlace: 'государственное предприятие "Гомельский ЦСМС"',
        calibrationDate: '11.11.2023',
        method: 'МК.ГМ 1580 - 2013, Метод прямых измерений',
        calibrationConditions: {
            id: v1(),
            temperature: '21,0',
            relativeHumidity: '31,8',
            pressure: '100,1',
            supplyVoltage: '228',
            frequency: '50'
        },
        standard: [
            {
                id: v1(),
                standardName: 'Мера-имитатор',
                standardType: 'Р40116',
                standardNumber: '090',
                value: '---',
                calibrationDate: '11.2022'
            }
        ],
        calculation: [
            {
                id: v1(),
                calibrationDot: 1,
                testVoltage: '500 B',
                dataForCalibration: [0,0,0,0,0,0,0,0,0,0],
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

   }
})

export const ReportEsoReducer = slice.reducer