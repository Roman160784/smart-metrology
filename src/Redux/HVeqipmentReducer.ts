import { CalculationEsoType, StandardType } from "./EsoReducer";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { v1 } from 'uuid';
import { createNewCalibrationFieldHV } from "./utils/utilsForTC";
import { numberArrHelper } from "./utils/utils";

export enum ValueHVEnum {
  ACV = "кB (ACV)",
  DCV = "кB (DCV)",
  ACA = "мА (ACA)",
  DCA = "мА (DCA)",
  ACmkA = "мкА (ACA)",
  DCmkA = "мкА (DCA)",
}

export type CalculationHVType = {
  calculationId: string;
  reportId: string;
  calibrationDot: string;
  dataForCalibration: string[];
  modeSelect: string[];
  mode: string;
  calibrationMiddleValue: string;
  satadardError: string;
  userError: string;
  uncertaintyMiddle: string;
  uncertaintyStnadardError: string;
  uncertaintyUserError: string;
  uncertaintyResult: string;
  uncertaintyMiddlePercent: string;
  uncertaintyStanadardErrorPercent: string;
  uncertaintyUserErrorPercent: string;
  uncertaintyResultPercent: string;
  error: string;
  permissibleValue: string;
  expandedUncertainty: string;
  calibrationValue: string;
  toFixedValue: number
};

export type ReportHVType = {
  sectorEmirId: string;
  typeHVId: string;
  reportId: string;
  reportNumber: string;
  calibrationObjectName: string;
  calibrationObjectType: string;
  serialNumber: string;
  application: string;
  customer: string;
  adresCustumer: string;
  calibrarionPlace: string;
  calibrationDate: string;
  method: string;
  temperature: string;
  relativeHumidity: string;
  pressure: string;
  supplyVoltage: string;
  frequency: string;
  standard: StandardType[];
  calculation: CalculationHVType[];
  stigma: string;
  boss: string;
  engineer: string;
  traceability: string;
  methodType: string;
  mathModelValue: string;
  mathModel: string;
  mathModelData: string[];
  protectionI: string;
};

const traceability =
  "Настоящее свидетельство подтверждает прослеживаемость измерений к национальным эталонам: единицы напряжения переменного тока (РЭН) в диапазоне частот  10 Гц – 2 ГГц – НЭ РБ 5-01; единицы напряжения - Вольта  НЭ РБ 10-02; международному государственному специальному эталону единицы силы  электрического тока в диапазоне частот  20 - 106  Гц,  РФ ГЭТ 88-88;  единицы силы  постоянного электрического тока  РФ ГЭТ 4-91";

const mathModelValue = "кВ (мА)";

const mathModel = "Uх= U0 + δио + δ";

const mathModelData = [
  "Uх – действительное значение воспроизводимого напряжения (тока), кВ (мА)",
  "Uо - измеренное значение напряжения (тока) (среднее арифметическое значение показаний эталона в контрольной точке), кВ (мА)",
  "δио – основная погрешностью эталона, кВ (мА)",
  "δкв – погрешность отсчета, вносимая оператором (погрешность квантования), кВ (мА)",
];

export type StringKeys<T> = {
  [K in keyof T]: T[K] extends string ? K : never
}[keyof T];


export const changeReportTitleHVTC = createAsyncThunk(
  "HVEqupmentReport/changeReportTitleHVTC",
  async (param: {
    key: StringKeys<ReportHVType>;
    parameter: string;
  }) => {
    return param;
  }
);

export const changeStandartDateHVTC = createAsyncThunk(
  "HVEqupmentReport/changeStandartDateHVTC",
  async (param: { id: string, title: string}) => {
    return param;
  }
);

export const addNewCalibratonFieldHVTC = createAsyncThunk(
  "HVEqupmentReport/addNewCalibratonFieldHVTC",async (param: { toFixedValue: number, dot: number}, {getState}) => {
   try{
    let state = getState() as RootState
    let report = state.reportHVEqupment

    let dataForCalibration: number[] = [];
    for (let index = 0; index < 10; index++) {
      dataForCalibration.push(param.dot);
    }
    
    let modeSelect = [ValueHVEnum.ACV,ValueHVEnum.DCV, ValueHVEnum.ACA,  ValueHVEnum.DCA, ValueHVEnum.ACmkA, ValueHVEnum.DCmkA]
    let calibrationValue = ValueHVEnum.ACV
    let calculationId = v1()
    let reportId = report.reportId
    let newCalibrationField = createNewCalibrationFieldHV(param.dot, calculationId, dataForCalibration, 
      calibrationValue, param.toFixedValue, modeSelect, reportId)
    return {newCalibrationField}
   }
   catch (e: any) {

   }
   
  }
);

export const updateCalibrationValueHVTC = createAsyncThunk(
  "HVEqupmentReport/updateCalibrationValueHVTC",
  async (param: { id: string, calibrationValue: string}, {getState}) => {
    try{
      let state = getState() as RootState
      let report = state.reportHVEqupment
  
      let calculation = report.calculation.find(el => el.calculationId === param.id)
      let dataForCalibration = numberArrHelper(calculation!.dataForCalibration)
      let toFixedValue = calculation?.toFixedValue
      let calibrationDotString = calculation?.calibrationDot; 
      let normalizedString = calibrationDotString?.replace(',', '.')
      let calibrationDot = Number(normalizedString);
      let modeSelect = [ValueHVEnum.ACV,ValueHVEnum.DCV, ValueHVEnum.ACA,  ValueHVEnum.DCA, ValueHVEnum.ACmkA, ValueHVEnum.DCmkA]
      let reportId = report.reportId
      let newCalibrationField = createNewCalibrationFieldHV(calibrationDot!, param.id, dataForCalibration!, 
        param.calibrationValue, toFixedValue!, modeSelect, reportId)
        return {newCalibrationField, param}
     }
     catch (e: any) {
     }
  }
);
export const updateCalibrationValueinArrayHVTC = createAsyncThunk(
  "HVEqupmentReport/updateCalibrationValueinArrayHVTC",
  async (param: { id: string, i: number, value: number, toFixedValue: number}, {getState}) => {
    try{
      
      let state = getState() as RootState
      let report = state.reportHVEqupment
  
      let calculation = report.calculation.find(el => el.calculationId === param.id)
      let dataForCalibration = numberArrHelper(calculation!.dataForCalibration)
      dataForCalibration[param.i] = param.value

      let toFixedValue = param.toFixedValue
      let calibrationValue = calculation?.calibrationValue
      let calibrationDotString = calculation?.calibrationDot; 
      let normalizedString = calibrationDotString?.replace(',', '.')
      let calibrationDot = Number(normalizedString);
      let modeSelect = [ValueHVEnum.ACV,ValueHVEnum.DCV, ValueHVEnum.ACA,  ValueHVEnum.DCA, ValueHVEnum.ACmkA, ValueHVEnum.DCmkA]
      let reportId = report.reportId
      let newCalibrationField = createNewCalibrationFieldHV(calibrationDot!, param.id, dataForCalibration!, 
        calibrationValue!, toFixedValue!, modeSelect, reportId)
        return {newCalibrationField, param}
     }
     catch (e: any) {
     }
  }
);

export const removeCalibratonFieldHVTC = createAsyncThunk(
  "HVEqupmentReport/removeCalibrationFieldHVTC",
  async (param: { id: string}) => {
    return param;
  }
);


const initialState: ReportHVType = {
  sectorEmirId: "12345678bvdbsdfbsdfbdf2626161456",
  typeHVId: "251146bgvsdfbfsdbd1651b65dfb561df56b156df1b56d",
  reportId: "bfdbdfbdfb6646514b5df21b5df5b1dfb15df1b5df1",
  reportNumber: "83/26/2197к",
  calibrationObjectName: "",
  calibrationObjectType:
    "Лаборатория высоковольтная передвижная ЛВИ HVT 3FAV-G",
  serialNumber: "614",
  application: "Заявка заказчика № 2197-000638 от 13.01.2025",
  customer: 'РУП "Гомельэнерго"',
  adresCustumer: "246028, г Гомель ул. Головацкого 19/212",
  calibrarionPlace: 'государственное предприятие "Гомельский ЦСМС"',
  calibrationDate: "01.03.2026",
  method: "МК.ГМ  1984-2017, ",
  methodType: "метод непосредственной оценки",
  temperature: "21,0",
  relativeHumidity: "31,8",
  pressure: "100,1",
  supplyVoltage: "228",
  frequency: "50",
  traceability: traceability,
  mathModel: mathModel,
  mathModelValue: mathModelValue,
  mathModelData: mathModelData,
  protectionI: "ток срабатывания защиты 25,5 мА",
  standard: [
    {
      reportId: "bfdbdfbdfb6646514b5df21b5df5b1dfb15df1b5df1",
      id: "3",
      standardName: "Киловольтметр",
      standardType: "КВЦ-120",
      standardNumber: "3026",
      value:
        "от 0,2 кВ до 120 кВ,  АС  0,25 %, от 0,2 кВ до 120 кВ,  DС  0,05 %",
      calibrationDate: "06.2025",
    },
    {
      reportId: "bfdbdfbdfb6646514b5df21b5df5b1dfb15df1b5df1",
      id: "4",
      standardName: " Мультиметр",
      standardType: "MULTICON M71USB",
      standardNumber: "183173561",
      value:
        "AC  от 0 до 200  мА, δ=0,8% А+30 е.м.р., DC  от 0 до 200  мА, δ = 0,2 % А+10 е.м.р.",
      calibrationDate: "06.2025",
    },
    {
      reportId: "bfdbdfbdfb6646514b5df21b5df5b1dfb15df1b5df1",
      id: "5",
      standardName: "Прибор комбинированный цифровой",
      standardType: "Testo 605-H1",
      standardNumber: "41109462/402",
      value: "от 0 до 50 °С, от 5 до 95 %  δy ±3 %",
      calibrationDate: "06.2025",
    },
  ],
  calculation: [
  ],
  stigma: "BY00045",
  boss: "Д. В. Миранович: Начальник сектора ЭМиР ",
  engineer: "В.И.Зайцев: Ведущий инженер по метрологии сектора ЭМР ",
};

const slice = createSlice({
  name: "HVEqupmentReport",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    //Change report title
    builder.addCase(changeReportTitleHVTC.fulfilled, (state, action) => {
      if(action.payload){
        state[action.payload.key] = action.payload.parameter
      }
      
    })
    //Меняем дату калибовки в эталонах
    builder.addCase(changeStandartDateHVTC.fulfilled, (state, action) => {
      state.standard = state.standard.map(el => el.id === action.payload.id ? {...el, calibrationDate : action.payload.title} : el)
      
      
    })
    //Добавляем новое поле калибровки
    builder.addCase(addNewCalibratonFieldHVTC.fulfilled, (state, action) => {
        state.calculation.push(action.payload!.newCalibrationField)
    })
    //Удаляем поле калибровки
    builder.addCase(removeCalibratonFieldHVTC.fulfilled, (state, action) => {
      state.calculation = state.calculation.filter(field => field.calculationId !== action.payload.id);
    })
    //Меняем значение величины для калибровки
    builder.addCase(updateCalibrationValueHVTC.fulfilled, (state, action) => {
      state.calculation = state.calculation.map(field => 
        field.calculationId === action.payload!.param.id 
          ? action.payload!.newCalibrationField 
          : field
      );
    })
    //Меняем значение величины для калибровки в массиве значений
    builder.addCase(updateCalibrationValueinArrayHVTC.fulfilled, (state, action) => {
      state.calculation = state.calculation.map(field => 
        field.calculationId === action.payload!.param.id 
          ? action.payload!.newCalibrationField 
          : field
      );
    })
    
  },
});

export const HVEqupmentReportReducer = slice.reducer;
