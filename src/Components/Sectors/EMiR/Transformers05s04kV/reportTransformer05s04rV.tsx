import React, {
  ChangeEvent,
  useState,
  useRef,
  useEffect,
  useMemo,
} from "react";
import st from "./trnsformrer04kV.module.css";
import { OrganizationName } from "../../../Common/OrganizationName/organizarionName";
import { v1 } from "uuid";
import { EditableSpan } from "../../../Common/EditableSpan/EditableSpan";
import { TransformersTable04kV } from "./TransformerTable/transformersTable";
import { useReactToPrint } from "react-to-print";
import { DataInput } from "../../../Common/DataInput/DataInput";
import { ConfirmModal } from "../../../Common/ModalWindow/ModalWindow";
import { useDownloadExcel } from "react-export-table-to-excel";

type standarsTransformersType = {
  id: string
  nameType: string
  serialNumber: string
  accuracy: string
  verificationDate: string
};

export type transformerType = {
  id: string
  transformerName: string
  serialNumber: string
  cofficient: string
  accuracy: string
  load: string
  look: string
  result: string
  stigma: string
  data: string[]
};

export type ReportTransformer04kV05sType = {
  reportNumber: string
  organizationName: string
  bill: string
  date: string
  temperature: string
  humidity: string
  pressure: string
  voltage: string
  hz: string
  eginear: string
  standarts: standarsTransformersType[]
  transformer: transformerType[]
};

export const ReportTransformer04kV05s = () => {
  const [pageCount, setPageCount] = useState<number>(1);
  const currentPrintRef = useRef<HTMLDivElement | null>(null);
  const currentExelRef = useRef<HTMLDivElement | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [lastPage, setLastPage] = useState(2);
  // const componentRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

   // хук печати (один на всё)
   const printHandler = useReactToPrint({
    content: () => currentPrintRef.current,
    documentTitle: "Таблица",
  });

  const handlePrint = () => {
    setTimeout(() => printHandler(), 0);

  };

   const useExcelExport = (ref: React.RefObject<HTMLTableElement | HTMLDivElement>, fileName: string) => {
    const { onDownload } = useDownloadExcel({
      currentTableRef: ref.current,
      filename: fileName,
      sheet: "Трансформаторы",
    });
  
    return onDownload;
  };
  
  const [report, setReport] = useState<ReportTransformer04kV05sType>(() => {
    const saved = localStorage.getItem("reportTransformer");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.warn("Ошибка чтения localStorage:", e);
      }
    }

    return {
      reportNumber: "1111/10/2160",
      organizationName:
        'Филиал "Жлобинские электрические сети" РУП "Гомельэнерго"',
      bill: "2160-1111",
      date: "11.11.2025",
      temperature: "20,4",
      humidity: "38,9",
      pressure: "99,5",
      voltage: "228,9",
      hz: "50,0",
      eginear: "Инженер I категории Р.С. Матвеенко",
      standarts: [
        {
          id: v1(),
          nameType: "Трансформатор тока СА535/2",
          serialNumber: "117",
          accuracy: "0,02",
          verificationDate: "11.11.2025",
        },
        {
          id: v1(),
          nameType: "Компоратор СА507",
          serialNumber: "826",
          accuracy: "±0,005 %",
          verificationDate: "11.11.2025",
        },
        {
          id: v1(),
          nameType: "Магазин нагрузок СА5018-5",
          serialNumber: "257",
          accuracy: "±4 %",
          verificationDate: "11.11.2025",
        },
      ],
      transformer: [
        {
          id: v1(),
          transformerName: "ТОП-0,66-1-5-У3",
          serialNumber: "1234567891011",
          cofficient: "300/5",
          accuracy: "0,5s",
          load: "5",
          look: "Соответствует",
          result: "Годен",
          stigma: "15000000",
          data: [
            "0,63",
            "88",
            "0,35",
            "8",
            "0,11",
            "5",
            "0,08",
            "4",
            "0,05",
            "4",
            "0.33",
            "7",
          ],
        },
      ],
    };
  });

  useEffect(() => {
    localStorage.setItem("reportTransformer", JSON.stringify(report));
  }, [report]);


const addTransformer = (data: number[]) => {
let dataForTransformer = data.map(el => el.toString().replace(".", ","))
setReport(prev => {
  const last = prev.transformer[prev.transformer.length - 1];

  const newStigma = last && !isNaN(Number(last.stigma))
    ? String(Number(last.stigma) + 1)
    : "1"; 

  return {
    ...prev,
    transformer: [
      ...prev.transformer,
      {
        ...last,
        id: v1(),
        serialNumber: "",
        stigma: newStigma,
        data: dataForTransformer,
      },
    ],
  };
});
}

const changeReportTitle = (key: string, title: string) => {
  setReport(prev => {
    const updated = {
      ...prev,
      [key]: title,
    };
    localStorage.setItem("report", JSON.stringify(updated)); 
    return updated;
  });
}

const removeTransformer = (id: string) => {
  setReport(prev => {
    const updated = {
      ...prev,
      transformer: prev.transformer.filter(t => t.id !== id),
    };
    localStorage.setItem("report", JSON.stringify(updated));
    return updated;
  });
}

const changeTransformerTitle = (id: string, key: string, title: string) => {
  setReport(prev => {
    const updated = {
      ...prev,
      transformer: prev.transformer.map(t =>
        t.id === id ? { ...t, [key]: title } : t
      ),
    };

    localStorage.setItem("report", JSON.stringify(updated));

    return updated;
  });
}

const changeTransformersData = (id: string, index: number, newValue: string) => {
  setReport(prev => {
    const updated = {
      ...prev,
      transformer: prev.transformer.map(t => {
        if (t.id === id) {
          const updatedData = [...t.data];
          updatedData[index] = newValue;
          return { ...t, data: updatedData };
        }
        return t;
      }),
    };

    localStorage.setItem("report", JSON.stringify(updated));
    return updated;
  });
}


const changeStandartsDate = (id: string, value: string) => {
  setReport(prev => {
    const updated = {
      ...prev,
      standarts: prev.standarts.map(s =>
        s.id === id ? { ...s, verificationDate: value } : s
      ),
    };

    localStorage.setItem("report", JSON.stringify(updated));
    return updated;
  });

}

const removeAlltransformers = () => {
  const initialTransformer = {
    id: v1(),
    transformerName: "ТОП-0,66-1-5-У3",
    serialNumber: "",
    cofficient: "300/5",
    accuracy: "0,5s",
    load: "5",
    look: "Соответствует",
    result: "Годен",
    stigma: "15000000",
    data: [
      "0,63", "88", "0,35", "8", "0,11", "5",
      "0,08", "4", "0,05", "4", "0.33", "7",
    ],
  };

  setReport(prev => {
    const updated = {
      ...prev,
      transformer: [initialTransformer], // сбрасываем к начальному состоянию
    };
    localStorage.setItem("report", JSON.stringify(updated));
    return updated;
  });
  setIsModalOpen(false)
}

  const rowsPerPage = 30;

  // разбиваем таблицу на страницы
  const transformerPages = useMemo(() => {
    const chunks = [];
    for (let i = 0; i < report.transformer.length; i += rowsPerPage) {
      chunks.push(report.transformer.slice(i, i + rowsPerPage));
    }
    return chunks;
  }, [report.transformer]);

  const pageCounts: number = transformerPages.length;

  // ..............................
  const exportToExcel = useExcelExport(currentExelRef, "Отчёт_Трансформаторы");

  const handleExportExcel = () => {
    setIsExporting(true);

    setTimeout(() => {
      exportToExcel(); 
      setIsExporting(false);
    }, 300);
  };

  return (
    <div ref={currentPrintRef} className={st.pageWrapper}>
      <div  className={st.page}>
        <div>
          <div>
            <OrganizationName />
          </div>
          <div className={st.pageNumber}>
  Страница {1} из {lastPage}
    </div>
        </div>
        <div className={st.protocolTitle}>
          Протокол поверки трансформаторов тока №{" "}
          <EditableSpan title={report.reportNumber} changeTitle={(title) => {changeReportTitle('reportNumber', title)}} />
        </div>
        <div className={st.title}>
          <div className={st.el}>
            Наименование организации заказчика:{" "}
            <EditableSpan
              title={report.organizationName}
              changeTitle={(title) => {changeReportTitle('organizationName', title)}}
            />
          </div>
          <div className={st.el}>
            Hомер квитанции-счёт:{" "}
            <EditableSpan title={report.bill} changeTitle={(title) => {changeReportTitle('bill', title)}} />
          </div>
          <div className={st.el}>
            Дата проведения поверки начало/окончание:{" "}
            <EditableSpan title={report.date} changeTitle={(title) => {changeReportTitle('date', title)}} />
          </div>
          <div className={st.el}>
            Условия проведения поверки: -{" "}
            
          </div>
          <div className={st.el}>
            температура окружающей среды, °C -{" "}
            <EditableSpan title={report.temperature} changeTitle={(title) => {changeReportTitle('temperature', title)}} />
          </div>
          <div className={st.el}>
            относительная влажность воздуха, % -{" "}
            <EditableSpan title={report.humidity} changeTitle={(title) => {changeReportTitle('humidity', title)}} />
          </div>
          <div className={st.el}>
            атмосферное давление, кПа -{" "}
            <EditableSpan title={report.pressure} changeTitle={(title) => {changeReportTitle('pressure', title)}} />
          </div>
          <div className={st.el}>
            напряжение питающей сети, В -{" "}
            <EditableSpan title={report.voltage} changeTitle={(title) => {changeReportTitle('voltage', title)}} />
          </div>
          <div className={st.el}>
            частота питающей сети, Гц -{" "}
            <EditableSpan title={report.hz} changeTitle={(title) => {changeReportTitle('hz', title)}} />
          </div>
          <div className={st.el}>
            ТНПА: ГОСТ 8.217-2003 "Тртансформаторы тока. Методика поверки"
          </div>
          <div className={st.el}>
            Эталоны:
            <table border={1} className={st.standartTable}>
              <thead>
                <tr>
                  <th>Наименование и тип СИ</th>
                  <th>Заводской номер</th>
                  <th>Класс точности / погрешность</th>
                  <th>Дата метрологической оценки</th>
                </tr>
              </thead>
              <tbody>
                {report.standarts.map((el) => {
                  return (
                    <tr key={el.id}>
                      <td>{el.nameType}</td>
                      <td>{el.serialNumber}</td>
                      <td>{el.accuracy}</td>
                      <td>
                        <EditableSpan
                          title={el.verificationDate}
                          changeTitle={(title) => {changeStandartsDate(el.id, title)}}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <button onClick={() => setIsModalOpen(true)}>очистить поле</button>
            <button onClick={handleExportExcel}>📄 Экспорт в Excel</button>
            {isModalOpen && (
      <ConfirmModal
        title="Очистка всех данных"
        message="Вы уверены, что хотите удалить все трансформаторы?"
        onConfirm={removeAlltransformers}
        onCancel={() => setIsModalOpen(false)}
      />
    )}
          </div>
        </div>
      </div>
      <div >
      {transformerPages.map((pageData, pageIndex) => (
  <div ref={currentExelRef} key={pageIndex} className={st.page}>
   
    <TransformersTable04kV
    isExporting={isExporting}
    report={report}
     setLastPage={setLastPage}
      lastPage={lastPage}
      pageData={pageData}
      pageIndex={pageIndex}
      pageCount={pageCounts}
      rowsPerPage={rowsPerPage}
      removeTransformer={removeTransformer}
      changeTransformerTitle={changeTransformerTitle}
      changeTransformersData={changeTransformersData}
      
    />
     <button onClick={() => handlePrint()}>печать</button>
        <DataInput  setData={addTransformer}/>
        <div>
        Поверку выполнил ___________________ <EditableSpan title={report.eginear} changeTitle={(title) => {changeReportTitle('eginear', title)}} />
      </div>
  </div>
))}  
      </div>
    </div>
  );
};
