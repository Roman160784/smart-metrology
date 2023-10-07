import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { v1 } from 'uuid';
import {  ReportEsoType, sectorEmirId } from "./EsoReducer";
import { RootState } from "./store";


export const mrp120Id = '1234'
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


const initialState: ReportMrp120Type [] = [{
    sectorEmirId: sectorEmirId,
    typeMrp120Id: mrp120Id,
        reportId: '88131ea2-5f79-11ee-8918-e3627ebad505',
        reportNumber: '123/23/2160к',
        calibrationObjectName: 'Измеритель напряжения прикосновения и параметров защитного отключения',
        calibrationObjectType: ' MRP-120',
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
                calibrationDate: '10.2023'
            }, 
            {
                reportId: '88131ea2-5f79-11ee-8918-e3627ebad505',
                id: '6',
                standardName: 'Амперметр',
                standardType: 'ЦА8500/1',
                standardNumber: '043',
                value: '---',
                calibrationDate: '10.2023'
            }, 
            {
                reportId: '88131ea2-5f79-11ee-8918-e3627ebad505',
                id: '7',
                standardName: 'Калибратор времени отключения УЗО',
                standardType: 'ERS-2',
                standardNumber: '69',
                value: '---',
                calibrationDate: '07.2023'
            }, 
            {
                reportId: '88131ea2-5f79-11ee-8918-e3627ebad505',
                id: '4',
                standardName: 'Прибор комбинированный цифровой',
                standardType: 'Testo 511',
                standardNumber: '39113412/607',
                value: '---',
                calibrationDate: '11.2022'
            },
            {
                reportId: '88131ea2-5f79-11ee-8918-e3627ebad505',
                id: '5',
                standardName: 'Прибор комбинированный цифровой',
                standardType: 'Testo 605-H1',
                standardNumber: '41110955/406',
                value: '---',
                calibrationDate: '01.2023'
            },
        ],
        
        calculation: [
            {
                calculationId: '1',
                reportId: '88131ea2-5f79-11ee-8918-e3627ebad505',
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
                calibrationValue: 'В',
            }
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
        
    }
})

export const ReportMrp120Reducer = slice.reducer