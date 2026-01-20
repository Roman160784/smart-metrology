// ProtocolSecondSheet.tsx
import React from 'react';
import styles from './attestation.module.css';
import { EditableSpan } from '../../../Common/EditableSpan/EditableSpan';
import { AttestationReport } from './attestation';


interface ProtocolSecondSheetProps {
  report: AttestationReport
  changerReportTitleBykey: (key: string, value: string, id?: string ) => void
  changeNamingInTools: (reportId: string, toolsId: string, key: string, value: string) => void
  changeImportantValue: (reportId: string, toolsId: string,  value: string) => void
  changeDataForCount : (reportId: string, toolsId: string, value: string, i: number) => void
}

export const ProtocolSecondSheet: React.FC<ProtocolSecondSheetProps> = (props: ProtocolSecondSheetProps) => {




  return (
<>
    {
      props.report.tools.map((el) => {
        return(
<div key={el.id} className={styles.container}>
      <div className={styles.pageFrame}>
        {/* Колонтитул в правом верхнем углу */}
        <div className={styles.pageHeader}>
          <div className={styles.protocolHeader}>
            <span>Протокол № {props.report.reportNumber} от {props.report.date}</span>
            <span>Страница {'2'} из {'2'}</span>
          </div>
        </div>
       
  {/* Блок информации об оборудовании */}
  <div className={styles.sheetContent}>
  <div className={styles.equipmentInfo}>
    <div className={styles.equipmentRow}>
      <span className={styles.equipmentLabel}>Наименование испытательного оборудования:</span>
      <span className={styles.equipmentValue}>
        <EditableSpan title={el.name} changeTitle={(title) => {props.changerReportTitleBykey('name', title, el.id)}}/></span>
      
    </div>
    
    <div className={styles.equipmentRow}>
      <span className={styles.equipmentLabel}>Заводской (инв) №:</span>
      <span className={styles.equipmentValue}>
        <EditableSpan title={el.serialNumber}
         changeTitle={(title) => {props.changerReportTitleBykey('serialNumber', title, el.id)}}/></span>
    </div>
    
    <div className={styles.equipmentRow}>
      <span className={styles.equipmentLabel}>Методика Аттестации:</span>
      <span className={styles.equipmentValue}>
        <EditableSpan title={el.nameGOST} changeTitle={(title) => {props.changerReportTitleBykey('nameGOST', title, el.id)}}/> </span>
    </div>
    
    <div className={styles.equipmentRow}>
      <span className={styles.equipmentLabel}>Наименование ТНПА на методику:</span>
      <span className={styles.equipmentValue}>
        <EditableSpan title={el.tnpa} changeTitle={(title) => {props.changerReportTitleBykey('tnpa', title, el.id)}}/></span>
    </div>
  </div>
  <div className={styles.tableCaption}>
    Результаты наблюдений сведены в таблице 1
  </div>
  

  {/* Таблица измерений */}
  <table className={styles.measurementsTable}>
    <thead>
      <tr>
        <th rowSpan={2}>Номер п/п</th>
        <th rowSpan={2}>Наименование</th>
        <th rowSpan={2}>{`Значение величины ГОСТ (ТО)`}</th>
        <th colSpan={5}>Измерение</th>
        <th rowSpan={2}>{`Точность, данные ГОСТ (ТО)  ±`}</th>
        <th rowSpan={2}>{`Неравномерность, данные ГОСТ (ТО)  ± `}</th>
        <th rowSpan={2}>{`Измеряемая величинв `}</th>
      </tr>
      <tr>
        <th>1</th>
        <th>2</th>
        <th>3</th>
        <th>4</th>
        <th>5</th>
      </tr>
    </thead>
    <tbody>
      {/* Добавьте дополнительные строки по аналогии */}
      
        {
          el.valueForReportTable.map((it, i) => {
            
            return(
              
              <tr key={it.id}>
              <td >{i+1}</td>
              <td>{<EditableSpan title={it.discription} 
              changeTitle={(title) => {props.changeNamingInTools(el.id, it.id, 'discription', title)}}/>}</td>
              
              <td>{<EditableSpan title={it.point} 
              changeTitle={(title) => {props.changeImportantValue(el.id, it.id, title)}}/>}</td>
              {
                it.data.map((data, ind) => {
                  return(
                    
                    <td key={ind}>{<EditableSpan title={data} changeTitle={() => {}}/>}</td>
                  )
                })
              }
              
              <td>{<EditableSpan title={it.tochnostGOST}
               changeTitle={(title) => {props.changeNamingInTools(el.id, it.id, 'tochnostGOST', title)}}/>}</td>
              <td>{<EditableSpan title={it.nerovnomernostGOST} 
              changeTitle={(title) => {props.changeNamingInTools(el.id, it.id, 'nerovnomernostGOST', title)}}/>}</td>
              <td>{<EditableSpan title={it.value} 
              changeTitle={(title) => {props.changeNamingInTools(el.id, it.id, 'value', title)}}/>}</td>
              </tr>
            )
          })
        }
    </tbody>
  </table>
<div>
<div className={styles.tableCaption}>
    Результаты аттестации сведены в таблице 2
  </div>

  <table className={styles.measurementsTable}>
    <thead>
      <tr>
        <th rowSpan={2}>Номер п/п</th>
        <th rowSpan={2}>{`Значение величины ГОСТ (ТО)`}</th>
        <th rowSpan={2}>Полученное значение величины </th>
        <th rowSpan={2}>{`Точность, данные ГОСТ (ТО)  ±`}</th>
        <th rowSpan={2}>Полученное значение точности, ±</th>
        <th rowSpan={2}>{`Неравномерность, данные ГОСТ (ТО)  ± `}</th>
        <th rowSpan={2}>Полученное значение неравномерности, ±</th>
        <th rowSpan={2}>Измеряемая величина</th>
      </tr>
      
    </thead>
    <tbody>
      {/* Добавьте дополнительные строки по аналогии */}
{
  el.valueForReportTable.map((el, i) => {
return(
  <tr key={el.id}>
        <td >{i+1}</td>
        <td>{el.point}</td>
        <td>{el.measuredMidleValue}</td>
        <td>{el.tochnostGOST}</td>
        <td>{el.countTochnost}</td>
        <td>{el.nerovnomernostGOST}</td>
        <td>{el.countNerovnomernost}</td>
        <td>{el.value}</td>
      </tr>
)
  })
}

      
    </tbody>
  </table>
</div>
<div style={{ marginTop: '4px', paddingTop: '15px', marginLeft: '8px' }}>
  <div style={{ marginBottom: '4px' }}>
    Выдан аттестат: <span style={{ fontWeight: '600', fontFamily: 'Courier New, monospace' }}>
      <EditableSpan title={el.attestationNumber} changeTitle={(title) => {props.changerReportTitleBykey('attestationNumber', title, el.id)}}/></span>
    <button style={{
      marginLeft: '50px',
      padding: '4px 12px',
      fontSize: '11px',
      border: '1px solid #007bff',
      borderRadius: '3px',
      backgroundColor: 'white',
      color: '#d91e1e',
      cursor: 'pointer'
    }}>
      Удалить поле
    </button>
    <button style={{
      marginLeft: '80px',
      padding: '4px 12px',
      fontSize: '11px',
      border: '1px solid #007bff',
      borderRadius: '3px',
      backgroundColor: 'white',
      color: '#007bff',
      cursor: 'pointer'
    }}>
      Новый по шаблону
    </button>
  </div>
  
  <div style={{ marginTop: '4px', paddingTop: '4px',}}>
   { `Аттестацию проводил: `}
    <EditableSpan title={props.report.profession} changeTitle={(title) => {props.changerReportTitleBykey('profession', title)}}/> 
    ______________ 
    
    <EditableSpan title={props.report.engineer} changeTitle={(title) => {props.changerReportTitleBykey('engineer', title)}}/>
  </div>
</div>
</div>
</div>
    </div>
        )
      })
    }
    </>
    
  );
};