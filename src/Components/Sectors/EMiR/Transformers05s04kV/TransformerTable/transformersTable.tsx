import React from "react";
import st from './transformersTable04kV.module.css'
import { ReportTransformer04kV05sType, transformerType } from "../reportTransformer05s04rV";
import { EditableSpan } from "../../../../Common/EditableSpan/EditableSpan";
import { EditableSpanForTransformersNumber } from "../../../../Common/EditableSpanForTransformerNumber/EditableSpanForTransformerNumber";


type transformersTable04kVPropsType = {
  removeTransformer: (id: string) => void
  changeTransformerTitle:(id: string, key: string, title: string) => void
  changeTransformersData:(id: string, index: number, newValue: string) => void
  setLastPage: (lastPage: number) => void
  report: ReportTransformer04kV05sType
  pageData: transformerType[]
  pageIndex: number
  pageCount: number
  rowsPerPage: number
  lastPage: number
  isExporting: boolean
};


export const TransformersTable04kV = (
  props: transformersTable04kVPropsType
) => {
  return (
    <>
    <div className={st.pageNumber}>
    <div>Протокол поверки № {props.report.reportNumber}</div>  
    <div>oт {props.report.date}</div>  
  Страница {props.pageIndex + 2} из {props.lastPage}
</div>
      <table className={st.transformerTable} border={1}>
      <thead>
  <tr>
    <th rowSpan={3}>№ п/п</th>
    <th rowSpan={3}>Тип трансформатора тока</th>
    <th rowSpan={3} >Заводской номер</th>
    <th rowSpan={3} style={{ width: '14px' }}>Коэффициент<br/>трансфор-<br/>мации,<br/>А</th>
    <th rowSpan={3}>Класс точ-<br/>ности</th>
    <th rowSpan={3} style={{ width: '12px' }}>Вторичная<br/>нагрузка<br/>V/A</th>
    <th rowSpan={3}>Внешний осмотр</th>
    <th colSpan={10}>Значение первичного тока, % от номинального значения</th>
    <th colSpan={2}>120 % при 0,25 от ном. нагрузки</th>
    <th rowSpan={3}>Заключение</th>
    <th rowSpan={3}>№ клейма</th>
  </tr>

  <tr>
    <th colSpan={2}>1 %</th>
    <th colSpan={2}>5 %</th>
    <th colSpan={2}>20 %</th>
    <th colSpan={2}>100 %</th>
    <th colSpan={2}>120 %</th>
    <th colSpan={2}> </th>
  </tr>

  <tr>
    <th>f, %</th>
    <th>δ, ′</th>
    <th>f, %</th>
    <th>δ, ′</th>
    <th>f, %</th>
    <th>δ, ′</th>
    <th>f, %</th>
    <th>δ, ′</th>
    <th>f, %</th>
    <th>δ, ′</th>
    <th>f, %</th>
    <th>δ, ′</th>
  </tr>
</thead>
        <tbody>
          {props.pageData.map((t, idx) => (
            <tr key={t.id}>
              <td onClick={() => {props.setLastPage(props.pageIndex+2)}} 
              onDoubleClick={()=> {props.removeTransformer(t.id)}} style={{cursor: 'pointer'}}>{props.pageIndex * props.rowsPerPage + idx + 1}</td>
              <td> <EditableSpan title={t.transformerName} changeTitle={(title) => {props.changeTransformerTitle(t.id, 'transformerName', title)}}/></td>
              {/* <td> <EditableSpanForTransformersNumber title={t.serialNumber} changeTitle={(title) => {props.changeTransformerTitle(t.id, 'serialNumber', title)}}/></td> */}
              
              <td>{props.isExporting ? (
                    <span>{t.serialNumber}</span>
                  ) : (
                    <input type="text"
                      value={t.serialNumber}
                      onChange={(e) => props.changeTransformerTitle(t.id, "serialNumber", e.target.value)}
                      style={{
                        fontSize: '11pt',
                        textAlign: 'center',
                       }}
                    />
                  )}</td>
              
              {/* <td><input type="text" value={t.serialNumber}
               onChange={(e) => props.changeTransformerTitle(t.id, "serialNumber", e.target.value)}
               style={{
                fontSize: '11pt',
                textAlign: 'center',
              }}
              /></td> */}
              <td> <EditableSpan title={t.cofficient} changeTitle={(title) => {props.changeTransformerTitle(t.id, 'cofficient', title)}}/></td>
              <td> <EditableSpan title={t.accuracy} changeTitle={(title) => {props.changeTransformerTitle(t.id, 'accuracy', title)}}/></td>
              <td> <EditableSpan title={t.load} changeTitle={(title) => {props.changeTransformerTitle(t.id, 'load', title)}}/></td>
              <td> <EditableSpan title={t.look} changeTitle={(title) => {props.changeTransformerTitle(t.id, 'look', title)}}/></td>
              <td> <EditableSpan title={t.data[0]} changeTitle={(title) => {props.changeTransformersData(t.id, 0, title)}}/></td>
              <td> <EditableSpan title={t.data[1]} changeTitle={(title) => {props.changeTransformersData(t.id, 1, title)}}/></td>
              <td> <EditableSpan title={t.data[2]} changeTitle={(title) => {props.changeTransformersData(t.id, 2, title)}}/></td>
              <td> <EditableSpan title={t.data[3]} changeTitle={(title) => {props.changeTransformersData(t.id, 3, title)}}/></td>
              <td> <EditableSpan title={t.data[4]} changeTitle={(title) => {props.changeTransformersData(t.id, 4, title)}}/></td>
              <td> <EditableSpan title={t.data[5]} changeTitle={(title) => {props.changeTransformersData(t.id, 5, title)}}/></td>
              <td> <EditableSpan title={t.data[6]} changeTitle={(title) => {props.changeTransformersData(t.id, 6, title)}}/></td>
              <td> <EditableSpan title={t.data[7]} changeTitle={(title) => {props.changeTransformersData(t.id, 7, title)}}/></td>
              <td> <EditableSpan title={t.data[8]} changeTitle={(title) => {props.changeTransformersData(t.id, 8, title)}}/></td>
              <td> <EditableSpan title={t.data[9]} changeTitle={(title) => {props.changeTransformersData(t.id, 9, title)}}/></td>
              <td> <EditableSpan title={t.data[10]} changeTitle={(title) => {props.changeTransformersData(t.id, 10, title)}}/></td>
              <td> <EditableSpan title={t.data[11]} changeTitle={(title) => {props.changeTransformersData(t.id, 11, title)}}/></td>
              <td> <EditableSpan title={t.result} changeTitle={(title) => {props.changeTransformerTitle(t.id, 'result', title)}}/></td>
              <td> <EditableSpan title={t.stigma} changeTitle={(title) => {props.changeTransformerTitle(t.id, 'stigma', title)}}/></td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
