import React, { useEffect, useRef, useState } from 'react';
import { v1 } from 'uuid';
import styles from './attestation.module.css';
import iso from '../../../../Pictures/iso.png'
import { EditableSpan } from '../../../Common/EditableSpan/EditableSpan';
import { ProtocolSecondSheet } from './reportSecondPageAtestation';
import { calculateAccuracySimple, calculateAverage, calculateNonUniformity } from '../../../../Redux/utils/utilsForAttestation';
import { BscaIC } from '../../../Common/BSCA/bscaIC';
import { useReactToPrint } from "react-to-print";
/* ===================== TYPES ===================== */

type  valueForReportTable = {
  id: string
  data: string[]
  difference: string
  measuredMidleValue: string
  point: string
  discription: string
  tochnostGOST: string
  nerovnomernostGOST: string
  countTochnost: string
  countNerovnomernost: string
  toFixedValue: number
  sootv: string
  value: string
}


type Standard = {
  id: string;
  name: string;
  type: string;
  serialNumber: string;
  nextVerificationDate: string;
  
};

export type TestTool = {
  id: string
  attestationNumber: string
  valueForReportTable: valueForReportTable[],
  name: string
  serialNumber: string
  nameGOST: string
  tnpa: string
  title1: string
    title2: string
    title3: string
    title4: string
    title5: string
    title6: string
  
};

export type AttestationReport = {
  reportNumber: string;
  organization: string;
  date: string;
  nextDate: string
  engineer: string;
  profession: string;
  standards: Standard[];
  weather: {id: string; label: string; value: string }[];
  tools: TestTool[];
  
};

/* ===================== DATA ===================== */

const reportStart: AttestationReport = {
  reportNumber: '0000/26/2197',
  organization: 'Речицкая РЦГЭ',
  date: '17.01.2026',
  nextDate: '17.01.2027',
  engineer: 'Кусенков Н.А',
  profession: 'Инженер',
  standards: [
    {
      id: v1(),
      name: 'Измеритель температуры',
      type: 'ИТПМ',
      serialNumber: '123',
      nextVerificationDate: '17.01.2027',
    },
    {
      id: v1(),
      name: 'Измеритель температуры',
      type: 'ИТПМ',
      serialNumber: '123',
      nextVerificationDate: '17.01.2027',
    },
    {
      id: v1(),
      name: 'Измеритель температуры',
      type: 'ИТПМ',
      serialNumber: '123',
      nextVerificationDate: '17.01.2027',
    },
    {
      id: v1(),
      name: 'Измеритель температуры',
      type: 'ИТПМ',
      serialNumber: '123',
      nextVerificationDate: '17.01.2027',
    },
    {
      id: v1(),
      name: 'Измеритель температуры',
      type: 'ИТПМ',
      serialNumber: '123',
      nextVerificationDate: '17.01.2027',
    },
    {
      id: v1(),
      name: 'Измеритель температуры',
      type: 'ИТПМ',
      serialNumber: '123',
      nextVerificationDate: '17.01.2027',
    },
  
  ],
  weather: [
    {id: v1(), label: 'Температура воздуха, °C', value: '21,0 ' },
    {id: v1(), label: 'Относительная влажность воздуха, %', value: '46,0' },
    {id: v1(), label: 'Атмосферное давление, кПа', value: '100,1' },
    {id: v1(), label: 'Напряжение питающей сети, В', value: '228' },
    {id: v1(), label: 'Частота питающей сети, Гц', value: '50' },
  ],
  tools: [{
    id: '12345890643969349063422',
  attestationNumber: '0000/26/2197',
  valueForReportTable: [{
    id: 'nvjsdnvjsdn;kvnsdj;',
    data: ['1000,1', '1000,1','1000,1','1000,1','1000,1',],
    difference: '0,1',
    measuredMidleValue: '145445',
    point: '100,1',
    discription: 'Температура в опорной (заданной) точке',
    tochnostGOST: '0,2',
    nerovnomernostGOST: '0,3',
    countTochnost: '-',
    countNerovnomernost: '-',
    toFixedValue: 2,
    value: '°C',
    sootv: 'соотв.',
  }],
  name: 'Шкаф сушильный',
  serialNumber: '77777',
  nameGOST: 'ГОСТ.2323',
  tnpa: 'Паспорт',
    title1: 'Наименование',
    title2: 'Значение величины ГОСТ (ТО)',
    title3: 'Точность, данные ГОСТ (ТО) ±',
    title4: 'Неравномерность, данные ГОСТ (ТО) ±',
    title5: 'Измеряемая величина',
    title6: 'Оценка точности (погрешности) соответствие',
  }],
};
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const REPORT_STORAGE_KEY = 'attestation-report-v1';

const addOneYear = (dateStr: string): string => {
  const [day, month, year] = dateStr.split('.').map(Number);

  if (!day || !month || !year) return dateStr;

  const nextYear = year + 1;

  return `${String(day).padStart(2, '0')}.${String(month).padStart(2, '0')}.${nextYear}`;
};

const parseValue = (value: string) => {

  const valueFromFuction = value.trim();

  let toFixed = 0;
  const commaIndex = valueFromFuction.indexOf(',');
  if (commaIndex !== -1) {
    toFixed = valueFromFuction.length - commaIndex - 1;
  }

  

  return { valueFromFuction, toFixed };
};

const processArrayValues = (value: string, toFixed: number) => {
  
  let number = +value.replace(',', '.')
  let arr = ['', '', '', '', '']
  arr = arr.map(() => value);
  let measuredMidleValue = number
  let difference  = 0
  let countTochnost = 0
  let countNerovnomernost = 0
  let arrForCount = arr.map(()=> number.toFixed(toFixed))


  return {
    valueCount : number.toFixed(toFixed),
    measuredMidleValue: measuredMidleValue.toFixed(toFixed),
    difference: difference.toFixed(toFixed),
    countTochnost: countTochnost.toFixed(toFixed),
    countNerovnomernost: countNerovnomernost.toFixed(toFixed),
    arrForCount
  }
 
};







////////////////////////////////////////////////////////////////////////////////////////////
const loadReportFromStorage = (): AttestationReport => {
  try {
    const saved = localStorage.getItem(REPORT_STORAGE_KEY);
    return saved ? JSON.parse(saved) : reportStart;
  } catch {
    return reportStart;
  }
};

// const loadReportFromStorage = (): AttestationReport => {
//   try {
//     const saved = localStorage.getItem(REPORT_STORAGE_KEY);
//     if (!saved) return reportStart;

//     const parsed = JSON.parse(saved);

//     if (!parsed.__version) {
//       return reportStart; // старая схема
//     }

//     return parsed;
//   } catch {
//     return reportStart;
//   }
// };
/* ===================== COMPONENT ===================== */

export const AttestationIO: React.FC = () => {

  const componentRef = useRef<HTMLDivElement>(null);
    const [report, setReport] = useState<AttestationReport>(loadReportFromStorage)


    useEffect(() => {
      const id = setTimeout(() => {
        localStorage.setItem(REPORT_STORAGE_KEY, JSON.stringify(report));
      }, 300);
    
      return () => clearTimeout(id);
    }, [report]);
    
    const changerReportTitleBykey = (
      key: string,
      value: string,
      id?: string
    ) => {
      setReport(prev => {
        // 👉 обновление инструмента
        if (id) {
          return {
            ...prev,
            tools: prev.tools.map(tool =>
              tool.id === id
                ? { ...tool, [key]: value }
                : tool
            ),
          };
        }
    
       
        if (key === 'date') {
          return {
            ...prev,
            date: value,
            nextDate: addOneYear(value),
          };
        }
    
        
        return {
          ...prev,
          [key]: value,
        };
      });
    };

    const changeStandartDate = (id: string, value: string) => {
      setReport(prev => ({
        ...prev,
        standards: prev.standards.map(standard =>
          standard.id === id
            ? { ...standard, nextVerificationDate: value }
            : standard
        ),
      }));
    }
    const changeWeather = (id: string, value: string) => {
      setReport(prev => ({
        ...prev,
        weather: prev.weather.map(item =>
          item.id === id
            ? { ...item, value }
            : item
        ),
      }));
    }
const changeNamingInTools = (reportId: string, toolsId: string, key: string, value: string) => {
  setReport(prev => ({
    ...prev,
    tools: prev.tools.map(tool =>
      tool.id !== reportId
        ? tool
        : {
            ...tool,
            valueForReportTable: tool.valueForReportTable.map(row =>
              row.id !== toolsId
                ? row
                : { ...row, [key]: value }
            ),
          }
    ),
  }));
}

const changeImportantValue = (reportId: string, toolsId: string, value: string) => {
  const { valueFromFuction, toFixed } = parseValue(value);
  let {valueCount, arrForCount, countNerovnomernost, countTochnost, difference, measuredMidleValue} 
  
  = processArrayValues(valueFromFuction, toFixed)
  setReport(prev => ({
    ...prev,
    tools: prev.tools.map(tool =>
      tool.id !== reportId
        ? tool
        : {
            ...tool,
            valueForReportTable: tool.valueForReportTable.map(row => {
              if (row.id !== toolsId) return row;

              return {
                ...row,
                data: arrForCount.map(el => el.replace('.', ',')),
                point: valueCount.replace('.', ','),
                measuredMidleValue: measuredMidleValue.replace('.', ','),
                difference: difference.replace('.', ','),
                countTochnost: countTochnost.replace('.', ','),
                countNerovnomernost: countNerovnomernost.replace('.', ','),
                toFixedValue: toFixed
              };
            })
          }
    )
  }))
};


const changeDataForCount = (toolId: string, rowId: string, value: string, index: number) => {

  setReport(prev => ({
    ...prev,
    tools: prev.tools.map(tool => {
      // Ищем нужный инструмент
      if (tool.id !== toolId) return tool;
      
      return {
        ...tool,
        valueForReportTable: tool.valueForReportTable.map(row => {
          // Ищем нужную строку в таблице
          if (row.id !== rowId) return row;
          const newData = [...row.data]; 
          if (index >= 0 && index < newData.length) {
            newData[index] = value; // обновляем элемент по индексу
          }
          
          let middleValue = calculateAverage(newData, row.toFixedValue)
         
          
          const tochnost = row.tochnostGOST !== '-' 
          ? calculateAccuracySimple(newData, row.point, row.toFixedValue)
          : '-';
        const nerovnovernost = row.nerovnomernostGOST !== '-'
          ? calculateNonUniformity(newData, middleValue, row.toFixedValue)
          : '-';

          return {
            ...row,
            data: newData,
            measuredMidleValue: middleValue,
            countTochnost: tochnost,
            countNerovnomernost: nerovnovernost
          };
        })
      };
    })
  }));
};
  
const addNewRow = (toolId: string) => {
  setReport(prev => {
    // Функция создания строки по умолчанию
    const createDefaultRow = (): valueForReportTable => ({
      id: v1(),
      data: ['0,0', '0,0', '0,0', '0,0', '0,0'],
      difference: '0,0',
      measuredMidleValue: '',
      point: '0,0',
      discription: 'Новая точка измерения',
      tochnostGOST: '-',
      nerovnomernostGOST: '-',
      countTochnost: '-',
      countNerovnomernost: '-',
      toFixedValue: 1,
      value: '°C',
      sootv: 'соотв.'
    });
    
    // Создаем полную копию предыдущего состояния
    const newReport: AttestationReport = {
      ...prev,
      tools: prev.tools.map(tool => {
        if (tool.id !== toolId) {
          // Возвращаем неизмененный инструмент
          return {
            ...tool,
            valueForReportTable: [...tool.valueForReportTable]
          };
        }
        
        // Получаем последнюю строку или создаем новую
        const lastRow = tool.valueForReportTable.length > 0 
          ? { ...tool.valueForReportTable[tool.valueForReportTable.length - 1] }
          : createDefaultRow();
        
        // Создаем новую строку
        const newRow: valueForReportTable = {
          ...lastRow,
          id: v1()
        };
        
        // Возвращаем обновленный инструмент
        return {
          ...tool,
          valueForReportTable: [...tool.valueForReportTable, newRow]
        };
      })
    };
    
    return newReport;
  });
};

const removeRow = (toolId: string, rowId: string) => {
  setReport(prev => {
    const tool = prev.tools.find(t => t.id === toolId);
    
    // Если инструмент не найден или это последняя строка
    if (!tool || tool.valueForReportTable.length <= 1) {
      return prev; // не удаляем последнюю строку
    }
    
    return {
      ...prev,
      tools: prev.tools.map(tool => 
        tool.id !== toolId
          ? tool
          : {
              ...tool,
              valueForReportTable: tool.valueForReportTable.filter(
                row => row.id !== rowId
              )
            }
      )
    };
  });
};

const addNewAttestat = (attestatNumber: string) => {
  const parts = attestatNumber.split('/');
  const [first, second, third] = parts;
  
  const newFirstNum = parseInt(first, 10) + 1;
  const formattedNewFirst = newFirstNum.toString().padStart(4, '0');
  const newAttestatNumber = `${formattedNewFirst}/${second}/${third}`;
  
  setReport(prevReport => {
    const lastTool = prevReport.tools[prevReport.tools.length - 1];
    
    if (!lastTool.valueForReportTable || lastTool.valueForReportTable.length === 0) {
      console.error('В предыдущем аттестате нет строк в таблице');
      return prevReport;
    }
    
    const firstRow = lastTool.valueForReportTable[0];
    
   
    const newTableRow = {
      ...firstRow, 
    };
    
   
    const newTool = {
      ...lastTool, 
      id: v1(), 
      attestationNumber: newAttestatNumber, 
      valueForReportTable: [newTableRow] 
    };
    
    return {
      ...prevReport,
      tools: [...prevReport.tools, newTool]
    };
  });
};


const removeAttestat = (toolsId: string) => {
  // Находим индекс аттестата
  const attestatIndex = report.tools.findIndex(tool => tool.id === toolsId);
  const attestatToRemove = report.tools[attestatIndex];
  
  if (!attestatToRemove) {
    alert('Аттестат не найден!');
    return;
  }
  
  // Проверяем, не последний ли это аттестат
  if (report.tools.length <= 1) {
    alert('Это единственный аттестат! Нельзя удалить последний аттестат.');
    return;
  }
  
  if (attestatIndex === 0) {
    const userConfirmed = window.confirm(
      `Внимание! Вы пытаетесь удалить исходный (опорный) аттестат!\n` +
      `Номер: ${attestatToRemove.attestationNumber}\n\n` +
      `Все созданные аттестаты используют его как шаблон.\n` +
      `Вы действительно хотите удалить опорный аттестат?`
    );
    
    if (!userConfirmed) {
      return;
    }
  } else {
    // Для не-опорных аттестатов обычное подтверждение
    const userConfirmed = window.confirm(
      `Удалить аттестат №${attestatToRemove.attestationNumber}?\n` +
      `${attestatToRemove.name}`
    );
    
    if (!userConfirmed) {
      return;
    }
  }
  
  // Удаляем
  setReport(prevReport => {
    const updatedTools = prevReport.tools.filter(tool => tool.id !== toolsId);
    const lastTool = updatedTools[updatedTools.length - 1];
    
    return {
      ...prevReport,
      reportNumber: lastTool.attestationNumber,
      tools: updatedTools
    };
  });
  
  alert(`Аттестат №${attestatToRemove.attestationNumber} успешно удален!`);
};

const removeStandard = (standardId: string) => {
  setReport(prevReport => {
    // Проверяем, сколько эталонов останется после удаления
    const remainingStandards = prevReport.standards.filter(standard => standard.id !== standardId);
    
    // Если останется 0 или меньше 1 эталона, не удаляем и показываем алерт
    if (remainingStandards.length < 1) {
      alert('Нельзя удалить последний эталон! Должен остаться хотя бы один эталон.');
      return prevReport;
    }
    
    // Удаляем эталон из массива
    return {
      ...prevReport,
      standards: remainingStandards
    };
  });
};

const cleanAllReport = () => {
  const userConfirmed = window.confirm(
    'Очистить локальное хранилище?\n' +
    'Все сохраненные данные будут удалены, и протокол вернется к начальному состоянию.'
  );
  
  if (userConfirmed) {
    localStorage.removeItem(REPORT_STORAGE_KEY);
    setReport(reportStart); // Сбрасываем стейт к начальному
    alert('Локальное хранилище очищено, протокол сброшен.');
  }
}

const loadAllStandards = () => {
  setReport(prevReport => ({
    ...prevReport,
    standards: reportStart.standards.map(standard => ({
      ...standard,
      id: v1() // Генерируем новые ID для каждого эталона
    }))
  }));
};

const pdfHandler = useReactToPrint({
  content: () => componentRef.current!,
  documentTitle: "Report",
});

return (

  
   <div ref={componentRef}>
  <div className={styles.container} >
    <div className={styles.pageFrame}>
      {/* Верхний блок с организацией и логотипами */}
      <div className={styles.topSection}>
        <div className={styles.organizationLeft}>
          <p>РЕСПУБЛИКАНСКОЕ УНИТАРНОЕ ПРЕДПРИЯТИЕ</p>
          <p>«ГОМЕЛЬСКИЙ ЦЕНТР СТАНДАРТИЗАЦИИ,</p>
          <p>МЕТРОЛОГИИ И СЕРТИФИКАЦИИ»</p>
        </div>
      </div>
      <div className={styles.centerHeader} style={{
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: '5mm',
  width: '100%'
}}>
  <div style={{ marginLeft: '30mm' }}>
    <BscaIC />
  </div>
  <img
    src={iso}
    alt="BGCA"
    style={{
      height: '20mm',
      width: 'auto',
      objectFit: 'contain',
      marginRight: '30mm'
    }}
  />
</div>

      {/* Центральный заголовок */}
      <div className={styles.centerTitle}>
        <h1>ИСПЫТАТЕЛЬНЫЙ ЦЕНТР</h1>
        <div className={styles.address}>
          <span>246015, г. Гомель, ул. Лепешинского, 1</span>
          <span>тел. +375 232 26-33-03 · mail@gomelcsms.by</span>
        </div>
      </div>

      {/* Основная информация */}
      <div className={styles.mainInfo}>
        <div className={styles.protocol}>
          <span>ПРОТОКОЛ АТТЕСТАЦИИ № </span>
          <strong><EditableSpan title={report.reportNumber} 
          changeTitle={(title) => {changerReportTitleBykey('reportNumber', title)}}/></strong>
          {/* <strong>{report.reportNumber}</strong> */}
        </div>
        <p className={styles.organizer}>
          {`Организация заказчик: `}
           <EditableSpan title={report.organization} changeTitle={(title) => {changerReportTitleBykey('organization', title)}}/>
        </p>
        <p className={styles.date}>
          {`Дата проведения аттестации:  `}
          <EditableSpan title={report.date} changeTitle={(title) => {changerReportTitleBykey('date', title)}}/>
        </p>
      </div>

      {/* Таблица эталонов */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Эталоны, применяемые при аттестации</h3>
        <table className={styles.table}>
          <thead>
            <tr>
              <th >Наименование</th>
              <th>Тип</th>
              <th>Зав. номер</th>
              <th>Дата поверки</th>
            </tr>
          </thead>
          <tbody>
            {report.standards?.map((item) => (
              <tr key={item.id}>
                <td style={{ cursor: 'pointer' }} onDoubleClick={() => {removeStandard(item.id)}}>{item.name}</td>
                <td>{item.type}</td>
                <td>{item.serialNumber}</td>
                <td><EditableSpan title={item.nextVerificationDate} changeTitle={(title) => {changeStandartDate(item.id, title)}}/></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Таблица условий */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Условия проведения аттестации</h3>
        <table className={styles.conditionsTable}>
          <tbody>
            {report.weather?.map((item, index) => (
              <tr key={index}>
                <td className={styles.conditionName}>{item.label}</td>
                <td className={styles.conditionValue}>
                <EditableSpan title={item.value} changeTitle={(title) => {changeWeather(item.id, title)}}/></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
    {/* ... твой существующий код ... */}
    
    <div style={{marginLeft: '38px', marginTop: '20px', display: 'flex', gap: '10px' }}>
      <button 
        onClick={cleanAllReport}
        style={{
          cursor: 'pointer',
          padding: '8px 16px',
          backgroundColor: '#ff4444',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          fontSize: '14px'
        }}
      >
        Очистить весь протокол
      </button>
      
      <button 
        onClick={loadAllStandards}
        style={{
          cursor: 'pointer',
          padding: '8px 16px',
          backgroundColor: '#44aaff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          fontSize: '14px'
        }}
      >
        Вернуть все эталоны
      </button>
      <button 
        onClick={pdfHandler}
        style={{
          cursor: 'pointer',
          padding: '8px 16px',
          backgroundColor: '#44aaff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          fontSize: '14px'
        }}
      >
        Печать протокола
      </button>
    </div>
  </div>
    </div>
  </div>
  
  <ProtocolSecondSheet report={report}
  changerReportTitleBykey={changerReportTitleBykey}
  changeNamingInTools={changeNamingInTools}
  changeImportantValue={changeImportantValue}
  changeDataForCount={changeDataForCount}
  addNewRow={addNewRow}
  removeRow={removeRow}
  addNewAttestat={addNewAttestat}
  removeAttestat={removeAttestat}
  />
  </div>
);
};
