import React, { useRef, useState } from 'react';
import styles from "./cectificatHV.module.css";
import { BscaTC } from '../../Common/BSCA/BscaTestCentre';
import iso from '../../../../../Pictures/iso.png'
import { useSelector } from 'react-redux';
import { selectReportHVequpment } from '../../../../../Redux/selectors/eso-report-selectors';
import { useReactToPrint } from 'react-to-print';

export const CertificatHV = () => {

    let report = useSelector(selectReportHVequpment)
    const componentRef = useRef()

    const pdfHandler = useReactToPrint({
        content: () => componentRef.current!,
        documentTitle: 'Certificate',
    })
    return (
        //  @ts-ignore >
        <div ref={componentRef} className={styles.printPage} onDoubleClick={pdfHandler}>
      <div className={styles.sheet}>
        <div className={styles.topBlock}>
        <span className={styles.nameOrg}> РЕСПУБЛИКАНСКОЕ УНИТАРНОЕ ПРЕДПРИЯТИЕ
«ГОМЕЛЬСКИЙ ЦЕНТР СТАНДАРТИЗАЦИИ, МЕТРОЛОГИИ И
СЕРТИФИКАЦИИ»</span>
          <div className={styles.line}></div>
          <div className={styles.hint}>наименование юридического лица ГМС</div>

    
          <div style={{ 
  display: 'flex', 
  justifyContent: 'center', 
  alignItems: 'center', 
  gap: '180pt' 
}}>
  <BscaTC />
  <img src={iso} alt="iso" />
</div>
<div className={styles.line}></div>
          <div className={styles.hint}>
            знак аккредитации или текстовая ссылка на аккредитацию юридического лица ГМС
          </div>
        </div>

        <h1 className={styles.title}>Свидетельство о калибровке</h1>

        <div className={styles.row}>
          <span className={styles.naming}>Номер свидетельства № {report.reportNumber}</span>
          
          <span className={styles.naming}>Дата калибровки {report.calibrationDate}</span>
          
          <span className={styles.naming}>Страница 1</span>
          
          <span className={styles.naming}>из 2</span>
          
        </div>

        <div className={styles.block}>
        <span className={styles.naming}> Объект калибровки: </span>
        <span className={styles.naming}> {report.calibrationObjectType}</span>
        <div>
        <span className={styles.naming}>{`Заводской (серийный) номер:  ${report.serialNumber}`}</span>
        
        </div>
          <div className={styles.line}></div>
          <div className={styles.hint}>
             наименование эталона единицы величины / средства измерения / идентификация
          </div>
        </div>

        <div className={styles.block}>
        <span className={styles.naming}>Владелец средства измерений:</span>
        <span className={styles.naming}>{report.customer}, {report.adresCustumer}</span>
          <div className={styles.line}></div>
          
          <div className={styles.hint}>
             информация о владельце средства измерений, адрес
          </div>
        </div>

        {/* <div className={styles.row}>
          <span>Калибровочное клеймо-наклейка</span>
          <span className={styles.shortLine}></span>
          <span className={styles.hintInline}>порядковый номер</span>
        </div> */}

        <div className={styles.block}>
        <span className={styles.naming}>Метод калибровки: {report.method} {report.methodType}</span>
          <div className={styles.line}></div>
          <div className={styles.hint}>
              наименование метода / идентификация
          </div>
        </div>

        <div className={styles.text}>
          <p>
            Все измерения имеют прослеживаемость к единицам Международной системы единиц (СИ),
            которые воспроизводятся национальными эталонами единиц величин Республики Беларусь
            и (или) национальными эталонами единиц величин других стран.
          </p>
          <p>
            Данное свидетельство может быть воспроизведено только полностью. Любая публикация
            или частичное воспроизведение содержания свидетельства возможно с письменного
            разрешения лаборатории, выдавшей свидетельство.
          </p>
        </div>

        <div className={styles.signRow}>
  <div className={styles.naming}>
    Уполномоченное лицо, утвердившее свидетельство
  </div>

  <div className={styles.signField}>
    <span className={styles.naming}></span>
    <div className={styles.line}></div>
    <div className={styles.hint}>подпись</div>
  </div>

  <div className={styles.signField}>
    <span className={styles.naming}>{report.boss}</span>
    <div className={styles.line}></div>
    <div className={styles.hint}>инициалы, фамилия, должность</div>
  </div>
</div>

<div className={styles.dateRow}>
  <span className={styles.naming}>Дата выдачи: {report.calibrationDate}</span>
  <div className={styles.dateLine}></div>
</div>

<div className={styles.stamp}>М.П.</div>
      </div>

   <div className={styles.sheet}>
   <div>
            <span className={styles.cetrif2page}>Свидетельство о калибровке</span>
            
        </div>
        <div className={styles.container2}>
            <span className={styles.naming}>Номер свидетельства: {report.reportNumber}</span>
            <span className={styles.naming}>Страница 2 из 2</span>
        </div>
        <div>
            <span className={styles.naming}>Калибровка выполнена с помощью:</span>
        </div>

<div>
<table style={{ 
  width: '100%', 
  borderCollapse: 'collapse',
  border: '1px solid #000'
}}>
  <thead>
    <tr>
      <th style={{ 
        border: '1px solid #000', 
        padding: '4px',
        textAlign: 'center',
        backgroundColor: '#f0f0f0'
      }}>Наименование СИ</th>
      <th style={{ 
        border: '1px solid #000', 
        padding: '4px',
        textAlign: 'center',
        backgroundColor: '#f0f0f0'
      }}>Тип</th>
      <th style={{ 
        border: '1px solid #000', 
        padding: '4px',
        textAlign: 'center',
        backgroundColor: '#f0f0f0'
      }}>Заводской номер</th>
      <th style={{ 
        border: '1px solid #000', 
        padding: '4px',
        textAlign: 'center',
        backgroundColor: '#f0f0f0'
      }}>Дата очередной метрологической оценки</th>
    </tr>
  </thead>
  <tbody>
  {
                          report.standard.map((el) => {
                            return(
                                        <tr style={{
                                            fontSize:'10pt'
                                        }} key={el.id}>
                                        <td >
                                            {el.standardName}
                                        </td>
                                        <td >
                                            {el.standardType}
                                        </td>
                                        <td >
                                            {el.standardNumber}
                                        </td>
                                        
                                        <td > {el.calibrationDate}
                                        </td>
                                        </tr>
                            )
                          })  
                        }              
  </tbody>
</table>
</div>
<div>

</div>
<div>{report.traceability}</div>
<hr />
<div className={styles.traceability}>наименование эталонов единиц величин и их статус/идентификация/ доказательство прослеживаемости</div>

<div>
    <span className={styles.naming}>Условия калибровки:</span>
    <span>Температура воздуха:{report.temperature} ºС, относительная влажность воздуха: {report.relativeHumidity} %,
     атмосферное давление: {report.pressure} кПа, напряжение питающей сети: {report.supplyVoltage} В, 
     частота питающей сети: {report.frequency} Гц.</span>
</div>
<hr />
<div className={styles.traceability}>условия окружающей среды и другие влияющие факторы</div>
<div>
<span className={styles.naming}>Результаты калибровки, включая неопределенность:</span>   
</div>
<div>
<table style={{ 
  width: '100%', 
  borderCollapse: 'collapse',
  border: '1px solid #000'
}}>
  <thead>
    <tr>
      <th style={{ 
        border: '1px solid #000',
        lineHeight: '1.0', 
        padding: '1px',
        textAlign: 'center',
        backgroundColor: '#f0f0f0'
      }}>Точка калибровки</th>
      <th style={{ 
        border: '1px solid #000', 
        lineHeight: '1.0', 
        padding: '1px',
        textAlign: 'center',
        backgroundColor: '#f0f0f0'
      }}>Измеренное значение</th>
      <th style={{ 
        border: '1px solid #000', 
        lineHeight: '1.0', 
        padding: '1px',
        textAlign: 'center',
        backgroundColor: '#f0f0f0'
      }}>Абсолютная погрешность</th>
      <th style={{ 
        border: '1px solid #000', 
        lineHeight: '1.0', 
        padding: '1px',
        textAlign: 'center',
        backgroundColor: '#f0f0f0'
      }}>Расширенная неопределённость</th>
      <th style={{ 
        border: '1px solid #000', 
        lineHeight: '1.0', 
        padding: '1px',
        textAlign: 'center',
        backgroundColor: '#f0f0f0'
      }}>{`Измеряемая величина (режим измерений)`}</th>
    </tr>
  </thead>
  <tbody>
    {
        report.calculation.map((el) => {
            return (
                <tr style={{ 
                  border: '1px solid #000', 
                  lineHeight: '1.0', 
                  padding: '1px',
                  textAlign: 'center',
                  
                }} key={el.calculationId}>
                        <td>{el.calibrationDot}</td>
                        <td>{el.calibrationMiddleValue}</td>
                        <td>{el.error}</td>
                        <td>{el.expandedUncertainty}</td>
                        <td>{` ${report.stendsCount !== '0' ? el.mode + ' ' + el.stend : el.mode}`}</td>
                </tr>
            )
        })
    }
  </tbody>
</table>
</div>
<div>
    <span className={styles.desk}>Расширенная неопределённость получена путём умножения суммарной
          стандартной неопределённости на коэффициент охвата k = 2,
          соответствующий уровню доверия, приблизительно равному 95 % при
          допущении нормального распределения. Оценивание неопределённости
          проведено в соответствии с ГОСТ 34100.3-2017/ISO/IEC Guide 98-3:2008 неопределенность измерения. Часть 3.
           Руководство по выражению неопределенности измерения.</span>
</div>
<div>
    <span className={styles.naming}>{`Межкалибровочный интервал (рекомендуемый) ____ месяцев`}</span>
</div>
<div>
    <span className={styles.naming}>{`Дополнительная информация: ${report.info}`}</span>
    <div className={styles.discr}>состояние объекта калибровки/регулировка и/или ремонт объекта калибровки до его калибровки</div>
</div>

<div
  style={{
    display: "grid",
    gridTemplateColumns: "auto 50mm 70mm",
    columnGap: "10mm",
    alignItems: "end",
    fontFamily: "Times New Roman, serif",
    fontSize: "12pt",
    marginTop: "8pt",
  }}
>
  {/* Текст слева */}
  <span>
    Подпись лица, выполнившего калибровку
  </span>

  {/* Подпись */}
  <div style={{ textAlign: "center" }}>
    <div
      style={{
        borderBottom: "1px solid #000",
        height: "10px",
        width: "100%",
      }}
    />
    <div style={{ fontSize: "11pt", marginTop: "1px" }}>
      подпись
    </div>
  </div>

  {/* ФИО + должность */}
  <div style={{ textAlign: "center" }}>
    {report.engineer}
    <div
      style={{
        borderBottom: "1px solid #000",
        height: "2px",
        width: "100%",
      }}
    />
    <div style={{ fontSize: "11pt", marginTop: "1px" }}>
      инициалы, фамилия и должность
    </div>
  </div>
</div>

<div>
    <span className={styles.desk}>Адреc юридического лица ГМС, выполнившего калибровку: 246015, г.Гомель, ул.Лепешинского,1. тел.: +375 232 26-33-03, +375 232 26-33-25 факс,
e-mail: mail@gomelcsms.by</span>
</div>
<div>
    <span className={styles.desk}>Место проведения калибровки: 246015, г.Гомель, ул.Лепешинского,1. государственное предприятие "Гомельский ЦСМС"</span>
</div>
   </div>
    </div>
    
    )
}