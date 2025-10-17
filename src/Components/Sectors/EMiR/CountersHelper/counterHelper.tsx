import React, { ChangeEvent, useState, useRef, useEffect } from "react";
import { v1 } from "uuid";
import { useReactToPrint } from "react-to-print";
import { useDownloadExcel } from "react-export-table-to-excel";
import { Counters } from "./counters";
import { Button } from "../../../Common/Button/Button";

export type ConterType = {
  id: string;
  stigma: string;
  counterNumber: string;
  modification: string;
};

type countersType = {
  id: string;
  title: string;
};

type RowsStateType = {
  [key: string]: ConterType[];
};

export const CounterHelper = () => {
  const componentRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const currentPrintRef = useRef<HTMLDivElement | null>(null);
  const tableRefs = useRef<{ [key: string]: HTMLTableElement | null }>({});



  // хук печати (один на всё)
  const printHandler = useReactToPrint({
    content: () => currentPrintRef.current,
    documentTitle: "Таблица",
  });



  const handlePrint = (id: string) => {
    currentPrintRef.current = componentRefs.current[id];
    setTimeout(() => printHandler(), 0);
  };

  const countersID1 = v1();

  //
  const savedCounters = localStorage.getItem("counters");
  const savedRows = localStorage.getItem("rows");

  const [isExportMode, setIsExportMode] = useState(false);
  const [disabledMap, setDisabledMap] = useState<{ [id: string]: boolean }>({});
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [modTables, setModTables] = useState<{
    [mod: string]: { stigma: string; counterNumber: string }[];
  }>({});

  
  const [counters, setCounters] = useState<countersType[]>(
    savedCounters
      ? JSON.parse(savedCounters)
      : [{ id: countersID1, title: "Завеска" }]
  );

  const [rows, setRows] = useState<RowsStateType>(
    savedRows
      ? JSON.parse(savedRows)
      : {
          [countersID1]: [
            {
              id: v1(),
              stigma: "1111",
              counterNumber: "",
              modification: "475",
            },
          ],
        }
  );

 
  useEffect(() => {
    localStorage.setItem("counters", JSON.stringify(counters));
    localStorage.setItem("rows", JSON.stringify(rows));
  }, [counters, rows]);

  const addConters = () => {
    let newCounters: countersType = { id: v1(), title: "Завеска " };
    setCounters([...counters, newCounters]);
    setRows({
      ...rows,
      [newCounters.id]: [
        { id: v1(), stigma: "1111", counterNumber: "", modification: "475" },
      ],
    });
  };

  const removeCounters = (counterId: string) => {
    setCounters(counters.filter((el) => el.id !== counterId));
    delete rows[counterId];
    setRows({ ...rows });
  };

  const removeRow = (counterId: string, rowsId: string) => {
    setRows({
      ...rows,
      [counterId]: rows[counterId].filter((t) => t.id !== rowsId),
    });
  };

  const changeStigma = (
    stigma: string,
    counterId: string,
    rowsId: string,
    i: number
  ) => {
    setRows((prev) => {
      const currentRows = prev[counterId];
      const editedIndex = i;
      const baseNumber = +stigma;

      const newRows = currentRows.map((el, index) => {
        if (index < editedIndex) {
          return el;
        } else if (index === editedIndex) {
          return { ...el, stigma }; // пользователь ввёл новое значение
        } else {
          return { ...el, stigma: String(baseNumber + (index - editedIndex)) }; // пересчёт следующих
        }
      });

      return { ...prev, [counterId]: newRows };
    });
  };

  const changeValue = (
    e: ChangeEvent<HTMLInputElement>,
    counterId: string,
    rowId: string
  ) => {
    const newValue = e.currentTarget.value;
   

    setRows((prev) => ({
      ...prev,
      [counterId]: prev[counterId].map((el) =>
        el.id === rowId ? { ...el, counterNumber: newValue} : el
      ),
    }));
  };

  const handleModification = (counterId : string) => {


    setRows((prev) => {
      const updatedRows = prev[counterId].map((el) => {
        const modification = el.counterNumber.slice(0, 3);
        const counterNumber = el.counterNumber.slice(3);
  
        return { ...el, modification, counterNumber };
      });
  
      return { ...prev, [counterId]: updatedRows };
    });

    
  }

  const inputHandler = (
    e: React.KeyboardEvent<HTMLInputElement>,
    counterId: string
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();

      const newRow: ConterType = {
        id: v1(),
        stigma: "1111",
        counterNumber: "",
        modification: "",
      };

      setRows((prev) => ({
        ...prev,
        [counterId]: [...(prev[counterId] || []), newRow],
      }));
    }
  };

  
  const { onDownload } = useDownloadExcel({
    
    currentTableRef: selectedId ? tableRefs.current[selectedId] : null,
    filename: selectedId ? `Таблица_${selectedId}` : "Таблица",
    sheet: "Data",
  });

  
  // const handleExport = () => {
  //   setIsExportMode(true);
  //   setTimeout(() => {
  //     onDownload();
  //     setIsExportMode(false);
  //   }, 100);
  //   setDisabled(true)
  // };

  const handleExport = (id: string) => {
    setIsExportMode(true);
    setTimeout(() => {
      onDownload();
      setIsExportMode(false);
      setDisabledMap(prev => ({ ...prev, [id]: true })); 
    }, 100);
  };


  //
  const clearAll = () => {
    // Показываем модалку вместо прямой очистки
    setShowConfirmModal(true);
  };

  // Функция, которая выполняет фактическую очистку
  const confirmClearAll = () => {
    localStorage.removeItem("counters");
    localStorage.removeItem("rows");

    const newId = v1();
    setCounters([{ id: newId, title: "Завеска" }]);
    setRows({
      [newId]: [
        { id: v1(), stigma: "1111", counterNumber: "", modification: "475" },
      ],
    });

    // Закрываем модалку
    setShowConfirmModal(false);
  };

  // Функция отмены
  const cancelClearAll = () => setShowConfirmModal(false);

  const sortByModification = () => {
    const result: {
      [mod: string]: { stigma: string; counterNumber: string }[];
    } = {};

    counters.forEach((counter) => {
      const rowsForCounter = rows[counter.id] || [];
      rowsForCounter.forEach((row) => {
        if (!result[row.modification]) result[row.modification] = [];
        result[row.modification].push({
          stigma: row.stigma,
          //
          counterNumber: `'${row.counterNumber}`,
        });
      });
    });

    setModTables(result);
  };

  // const saveHandler = (id:string) => {
  //   setDisabled(false)
  //   alert('Сохранено')
  //   setSelectedId(id)
  // }

  const saveHandler = (id: string) => {
    setDisabledMap(prev => ({ ...prev, [id]: false }));
    setSelectedId(id);
    alert('Сохранено');
  };

  return (
    <div style={{ padding: "20px" }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "5px",
          justifyContent: "flex-start",
          boxSizing: "border-box",
          marginTop: "10px",
        }}
      >
        {counters?.map((el, i) => {
          let rowsForConters = rows[el.id] || [];
          return (
            <div
              ref={(elRef) => (componentRefs.current[el.id] = elRef)}
              key={el.id}
              style={{
                width: "calc((100% - 10px) / 2)",
                minWidth: "300px",
                boxSizing: "border-box",
              }}
            >
              <table
                ref={(table) => (tableRefs.current[el.id] = table)}
                border={1}
                style={{
                  borderCollapse: "collapse",
                  textAlign: "center",
                  width: "100%",
                }}
              >
                <Counters
                  rows={rowsForConters}
                  key={el.id}
                  i={i}
                  title={el.title}
                  countersID={el.id}
                  removeRow={removeRow}
                  inputHandler={inputHandler}
                  changeValue={changeValue}
                  changeStigma={changeStigma}
                  isExportMode={isExportMode}
                />
              </table>
              <div style={{ marginTop: "10px", marginLeft: "10px" }}>
                <Button
                  disabled={false}
                  title={"Печать"}
                  onClick={() => handlePrint(el.id)}
                />
                <span style={{ marginTop: "10px", marginLeft: "10px" }}>
                  <Button
                    disabled={false}
                    title={"Сохранить"}
                    onClick={() => {saveHandler(el.id)}}
                  />
                </span>
                <span style={{ marginTop: "10px", marginLeft: "10px" }}>
                  <Button
                    disabled={disabledMap[el.id] ?? true}
                    title={"Экспорт"}
                    onClick={() => handleExport(el.id)}
                  />
                </span>
                <span style={{ marginTop: "10px", marginLeft: "10px" }}>
                  <Button
                    disabled={false}
                    title={"Выделить модификацию"}
                    onClick={() => handleModification(el.id)}
                  />
                </span>
                <span style={{ marginTop: "10px", marginLeft: "10px" }}>
                  <Button
                    disabled={false}
                    title={"Удалить таблицу"}
                    onClick={() => removeCounters(el.id)}
                  />
                </span>
              </div>
            </div>
          );
        })}
      </div>
      <div style={{ marginTop: "10px", marginLeft: "10px" }}>
        <hr/>
        <Button
          disabled={false}
          title={"Добавить таблицу"}
          onClick={addConters}
        />
        <span>
          {" "}
          <Button
            disabled={false}
            title={"Очистить поле"}
            onClick={clearAll}
          />{" "}
        </span>
        <Button
          title="Сортировать по модификациям"
          onClick={sortByModification}
          disabled={false}
        />
      </div>

      {Object.entries(modTables).map(([mod, data]) => (
        <div key={mod} style={{ marginTop: "20px" }}>
          <h3 style={{ color: "green" }}>Модификация: {mod}</h3>
          <table
            ref={(table) => (tableRefs.current[mod] = table)}
            border={1}
            style={{
              borderCollapse: "collapse",
              textAlign: "center",
              width: "300px",
            }}
          >
            <thead>
              <tr>
                <th>Номер клейма</th>
                <th>
                  Номер счётчика
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, idx) => (
                <tr key={idx}>
                  <td>{row.stigma}</td>
                  <td>{row.counterNumber}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ marginTop: "10px", marginLeft: "10px" }}>
          <span style={{ marginTop: "10px", marginLeft: "10px" }}>
                  <Button
                    disabled={false}
                    title={"Сохранить"}
                    onClick={() => {saveHandler(mod)}}
                  />
                </span>
                <span style={{ marginTop: "10px", marginLeft: "10px" }}>
                  <Button
                    disabled={disabledMap[mod] ?? true}
                    title={"Экспорт"}
                    onClick={() => handleExport(mod)}
                  />
                </span>
                </div>
        </div>
      ))}

      {showConfirmModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "8px",
              minWidth: "300px",
              textAlign: "center",
            }}
          >
            <p>Вы уверены, что хотите удалить все таблицы?</p>
            <div
              style={{
                marginTop: "15px",
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              <Button
                title="Да, удалить"
                disabled={false}
                onClick={confirmClearAll}
              />
              <Button
                title="Отмена"
                disabled={false}
                onClick={cancelClearAll}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
