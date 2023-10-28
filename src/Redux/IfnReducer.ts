import { createSlice } from "@reduxjs/toolkit"
import { v1 } from "uuid"
import { CalculationEsoType, ReportEsoType, sectorEmirId } from "./EsoReducer"


const traceabilityIfn = 'Обеспечивается прослеживамость до Национальных эталонов электрического сопротивления - Ома НЭ РБ 29-16, напряжения переменного тока в диапазоне частот 10 Гц – 2 ГГц НЭ РБ 5-01'
 const mathModelIfn = 'Rx = Ri0 +ΔR0 +δind'
 const mathModelDataIfn = ['Rx – показания калибруемого устройства, Ом, R Ом, X Ом, ~B', 'ΔR0 – основная абсолютная погрешность эталона, Ом, R Ом, X Ом, ~B', 'δind – поправка, обусловленная разрешающей способностью, Ом, R Ом, X Ом, ~B']

type NewCalculationType = Omit<CalculationEsoType, 'calibrationValue' | 'testVoltage'> &{
    calibrationValue: string[],
    standardValue: StandardValueType[] | string,
    mode: string[]
}

export type ReportIfnType = Omit<ReportEsoType, 'typeEsoId' | 'calculation' | 'calibrationObjectName'> & {
    typeIfnId: string,
    allCalibrationObjectTypes: string[],
    calculation: NewCalculationType[],
    calibrationObjectName: string[]
}

export enum modeEnum {
   L_N = '<фаза-нуль>',
   L_L = '<фаза-фаза>',
   om = 'Ом',
   voltsAC = '~B',
}

export enum IfnEnum  {
 ifn200 = 'ИФН-200',
 ifn300 = 'ИФН-300',
 ifn300_1 = 'ИФН-300/1',
}

export enum ValueIfnEnum {
voltsAC = '~B',
om = 'Ом',
omReact = 'X Ом',
omActiv = 'R Ом',
}

export enum calibrationObjectName{
    ifn200 = 'Измерители сопротивления петли "фаза-нуль"',
    ifn300 = 'Измерители сопротивления петли "фаза-нуль", "фаза-фаза"',
}

const calibrationObject = [calibrationObjectName.ifn200, calibrationObjectName.ifn300]


type StandardValueType = {
    id: string
    title: string
    value: number
    checked: false
}

export enum StandardValueEnum {
    omActiv_0_33 = 0.33,
    omActiv_1_07 = 1.10,
    omActiv_140 = 140,
    omReact_0_27 = 0.27,
    omReact_2_89 = 2.89,
    omReact_162 = 162,
}

let standardValue: StandardValueType[] = [
    {id: v1(), title: ValueIfnEnum.omReact, value: StandardValueEnum.omReact_0_27, checked: false },
    {id: v1(), title: ValueIfnEnum.omReact, value: StandardValueEnum.omReact_162, checked: false },
    {id: v1(), title: ValueIfnEnum.omReact, value: StandardValueEnum.omReact_2_89, checked: false },
    {id: v1(), title: ValueIfnEnum.omActiv, value: StandardValueEnum.omActiv_0_33, checked: false },
    {id: v1(), title: ValueIfnEnum.omActiv, value: StandardValueEnum.omActiv_1_07, checked: false },
    {id: v1(), title: ValueIfnEnum.omActiv, value: StandardValueEnum.omActiv_140, checked: false },
]



 const ifnId = '123567'
 const reportId = '88131ea2-5f79-11ee-8918-e3627ebad50511'


 const initialState: ReportIfnType [] = [{
    sectorEmirId: sectorEmirId,
    typeIfnId: ifnId,
        reportId: reportId,
        reportNumber: '123/23/2160к',
        calibrationObjectType: IfnEnum.ifn200,
        calibrationObjectName: calibrationObject,
        allCalibrationObjectTypes: [IfnEnum.ifn200, IfnEnum.ifn300, IfnEnum.ifn300_1],
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
                calibrationDate: '11.2022'
            }, 
            {
                reportId: reportId,
                id: v1(),
                standardName: 'Испытательная индуктивность ИИ-2',
                standardType: 'РЛПА.685442.003-1',
                standardNumber: '0067',
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
                id: v1(),
                standardName: 'Калибратор времени отключения УЗО',
                standardType: 'ERS-2',
                standardNumber: '69',
                value: '---',
                calibrationDate: '07.2023'
            }, 
            {
                reportId: reportId,
                id: v1(),
                standardName: 'Прибор комбинированный цифровой',
                standardType: 'Testo 511',
                standardNumber: '39113412/607',
                value: '---',
                calibrationDate: '11.2022'
            },
            {
                reportId: reportId,
                id: v1(),
                standardName: 'Прибор комбинированный цифровой',
                standardType: 'Testo 605-H1',
                standardNumber: '41110955/406',
                value: '---',
                calibrationDate: '01.2023'
            },
        ],
        
        calculation: [
            {
                calculationId: '1111',
                calibrationDot: 1,
                calibrationMiddleValue: 1,
                calibrationValue: [ValueIfnEnum.om, ValueIfnEnum.omActiv, ValueIfnEnum.omReact, ValueIfnEnum.voltsAC],
                dataForCalibration: [1,1,1,1,1,1,1,1,1,1,1],
                error: 0,
                expandedUncertainty: 0,
                mode: [modeEnum.L_L, modeEnum.L_N, modeEnum.om, modeEnum.voltsAC],
                permissibleValue: 1,
                reportId: reportId,
                satadardError: 0,
                standardValue: 
                [
                    {id: v1(), title: ValueIfnEnum.omReact, value: StandardValueEnum.omReact_0_27, checked: false },
                    {id: v1(), title: ValueIfnEnum.omReact, value: StandardValueEnum.omReact_162, checked: false },
                    {id: v1(), title: ValueIfnEnum.omReact, value: StandardValueEnum.omReact_2_89, checked: false },
                    {id: v1(), title: ValueIfnEnum.omActiv, value: StandardValueEnum.omActiv_0_33, checked: false },
                    {id: v1(), title: ValueIfnEnum.omActiv, value: StandardValueEnum.omActiv_1_07, checked: false },
                    {id: v1(), title: ValueIfnEnum.omActiv, value: StandardValueEnum.omActiv_140, checked: false },
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
        
    }
})

export const ReportIfnReducer = slice.reducer