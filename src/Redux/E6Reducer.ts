import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { v1 } from "uuid"
import { ReportEsoType,} from "./EsoReducer"


export const E6TypeId = '12345'

export enum E6CalibrationValue {
    volts = 'В',
    om = 'Ом',
    mom = 'МОм',
    kom = 'кОм',
    gom = 'ГОм'
}

const traceabilityE6 = 'Обеспечивается прослеживаемость результатов измерений до Национальных эталонов электрического сопротивления - Ома НЭ РБ 29-16б, напряжения переменного тока в диапазоне частот 10 Гц – 2 ГГц НЭ РБ 5-01'
const mathModelE6 = 'Математическая модель: Rx = Ri0 +ΔR0 +δind'

const mathModelDataE6 = [
    'Rx – показания калибруемого устройства, Ом, кОм, MОм, ГОм, В',
    'Ri0 – показания эталона, Ом, кОм, MОм, ГОм, В',
    'ΔR0 – основная абсолютная погрешность эталона, Ом, кОм, MОм, ГОм, В',
    'δind – поправка, обусловленная разрешающей способность, Ом, кОм, MОм, ГОм, В',
]

const typeE6Id = v1()
const reportId = '1188131ea2-5f79-11ee-8918-e3627ebad505'
export type E6CalibratonTypesType = 'Е6-24' | 'Е6-24/1' | 'Е6-24/2' | 'Е6-31' | 'Е6-31/1' | 'Е6-32' 

export type ReportE6Type = Omit<ReportEsoType, 'typeEsoId' | 'calibrationObjectType'> & {
    typeE6Id: string
    calibrationObjectType: E6CalibratonTypesType
}


export const addNewReportE6TC = createAsyncThunk(
    'e6Report/addReport',
    async (param: {reportId: string}, { dispatch, rejectWithValue }) => {
        try {
            let newReportMrp120 = {
                sectorEmirId: '11111',
                typeE6Id: typeE6Id,
                reportId: param.reportId,
                reportNumber: '0000/23/2160к',
                calibrationObjectName: 'Мегаомметр',
                calibrationObjectType : 'Е6-31' as E6CalibratonTypesType,
                serialNumber: '1111',
                application: 'Заявка на калибровку № 001341 от 13.01.2023',
                customer: 'РУП "Гомельэнерго"',
                adresCustumer: '246028, г Гомель ул. Головацкого 19/212',
                calibrarionPlace: 'государственное предприятие "Гомельский ЦСМС"',
                calibrationDate: '11.11.2023',
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
                        calibrationDate: '10.2023'
                    },
                    {
                        reportId: param.reportId,
                        id: v1(),
                        standardName: 'Мера-имитатор',
                        standardType: 'Р40116',
                        standardNumber: '090',
                        value: '---',
                        calibrationDate: '11.2022'
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
                        calibrationDate: '11.2022'
                    },
                    {
                        reportId: param.reportId,
                        id: v1(),
                        standardName: 'Прибор комбинированный цифровой',
                        standardType: 'Testo 605-H1',
                        standardNumber: '41110955/406',
                        value: '---',
                        calibrationDate: '01.2023'
                    },
                ],
            
                calculation: [{
                    reportId: param.reportId,
                    calculationId: 'calc2',
                    calibrationDot: 1,
                    testVoltage: "500 В",
                    dataForCalibration: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                    calibrationMiddleValue: 1,
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
                    calibrationValue: E6CalibrationValue.volts
                },
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
const initialState: ReportE6Type[] = [
    {
    sectorEmirId: '11111',
    typeE6Id: typeE6Id,
    reportId: reportId,
    reportNumber: '123/23/2160к',
    calibrationObjectName: 'Мегаомметр',
    calibrationObjectType: 'Е6-31',
    serialNumber: '1111',
    application: 'Заявка на калибровку № 001341 от 13.01.2023',
    customer: 'РУП "Гомельэнерго"',
    adresCustumer: '246028, г Гомель ул. Головацкого 19/212',
    calibrarionPlace: 'государственное предприятие "Гомельский ЦСМС"',
    calibrationDate: '11.11.2023',
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
            calibrationDate: '10.2023'
        },
        {
            reportId: reportId,
            id: v1(),
            standardName: 'Мера-имитатор',
            standardType: 'Р40116',
            standardNumber: '090',
            value: '---',
            calibrationDate: '11.2022'
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
            id: '4',
            standardName: 'Прибор комбинированный цифровой',
            standardType: 'Testo 511',
            standardNumber: '39113412/607',
            value: '---',
            calibrationDate: '11.2022'
        },
        {
            reportId: reportId,
            id: '5',
            standardName: 'Прибор комбинированный цифровой',
            standardType: 'Testo 605-H1',
            standardNumber: '41110955/406',
            value: '---',
            calibrationDate: '01.2023'
        },
    ],

    calculation: [{
        reportId: reportId,
        calculationId: 'calc1',
        calibrationDot: 1,
        testVoltage: "500 В",
        dataForCalibration: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        calibrationMiddleValue: 1,
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
        calibrationValue: E6CalibrationValue.volts
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
    }
})

export const ReportE6Reducer = slice.reducer