import { log } from "console";
import React, { useState } from "react";
import * as XLSX from "xlsx";

export const ReportHelper = () => {
  const [file1Data, setFile1Data] = useState<any[]>([]);
  const [file2Data, setFile2Data] = useState<any[]>([]);
  const [code, setCode] = useState<string>("-");
  const [month, setMonth] = useState<string>("");
  const [diference, setDiference] = useState<any[]>([]);

  
const exportTableToExcel = () => {
    const table = document.getElementById('my-table');
    if (!table) return;
  
    const workbook = XLSX.utils.table_to_book(table, { sheet: 'Sheet1' });
    XLSX.writeFile(workbook, 'table.xlsx');
  };

  const setCodeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.currentTarget.value);
  };
  const parseToObjects = (rows: (string | number)[][]): any[] => {
    const headers = rows[0] as string[];
    return rows.slice(1).map((row) => {
      const obj: Record<string, string> = {};
      headers.forEach((header, idx) => {
        obj[header] = String(row[idx] ?? "").trim();
      });
      return obj;
    });
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fileNumber: 1 | 2
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (evt) => {
      const result = evt.target?.result;
      if (!result) return;

      const isCSV = file.name.endsWith(".csv");

      if (isCSV) {
        const text =
          typeof result === "string"
            ? result
            : new TextDecoder().decode(result as ArrayBuffer);
        const rows = text
          .split(/\r?\n/)
          .map((line) => line.trim())
          .filter(Boolean)
          .map((line) => line.replace(/^\uFEFF/, "").split(";"));

        const dataObjects = parseToObjects(rows);
        if (fileNumber === 1) setFile1Data(dataObjects);
        else setFile2Data(dataObjects);
      } else {
        const workbook = XLSX.read(result, { type: "array" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 }) as (
          | string
          | number
        )[][];

        const dataObjects = parseToObjects(rows);
        if (fileNumber === 1) setFile1Data(dataObjects);
        else setFile2Data(dataObjects);
      }
    };

    if (file.name.endsWith(".csv")) {
      reader.readAsText(file);
    } else {
      reader.readAsArrayBuffer(file);
    }
  };

  console.log("белгим", file2Data[0]);

  const arrayFronOei = file1Data.filter(
    (el) =>
      el['"Номер свидетельства"']?.includes(code) &&
      el['"Дата поверки"'].split("-")[1]?.includes(month)
  );

  const onClicHandler = () => {
    console.log("хер там");

    const certsInFirst = new Set();

    for (const obj1 of file1Data) {
      const cert1Raw = obj1['"Номер свидетельства"'];
      if (typeof cert1Raw !== "string") continue;
      const parts = cert1Raw.split("-");
      if (parts.length < 2) continue;
      certsInFirst.add(parts[1].trim());
    }

    let diderentInSecond = file2Data.filter((obj2) => {
      const cert2Raw = obj2['"№ свидетельства"'];
      if (typeof cert2Raw !== "string") return false;
      const cert2 = cert2Raw.replace(/^'+|'+$/g, "").trim();

      return !certsInFirst.has(cert2);
    });

    setDiference(diderentInSecond);
  };

  const keys = Object.keys(diference[0] || {});

  return (
    <div style={{ padding: "20px" }}>
      <h2>Загрузка Excel-файлов</h2>

      <div style={{ marginBottom: "10px" }}>
        Введите код сектора из свидетельства {"  "}
        <input value={code} type="text" onChange={(e) => setCodeHandler(e)} />
        <div style = {{ fontSize: "24px", color: "green" }} >Вы ввели код сектора: {code}</div>
      </div>
      <div style={{ marginBottom: "10px" }}>
        введите месяц поверки {"  "}
        <input
          placeholder="08"
          value={month}
          type="text"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setMonth(e.currentTarget.value)
          }
        />
        <div style = {{ fontSize: "24px", color: "green" }}>Вы ввели {month} месяц </div>
      </div>

      <div style={{ marginBottom: "10px" }}>
        Файл из oei.by{" "}
        <input
          type="file"
          accept=".xlsx, .xls, .csv"
          onChange={(e) => handleFileChange(e, 1)}
        />
        <div style={{ fontSize: "24px", color: "red" }}>
          в базе OEI {arrayFronOei.length} свидетельств
        </div>
      </div>

      <div style={{ marginBottom: "10px" }}>
        Файл из базы БелГИМ{" "}
        <input
          type="file"
          accept=".xlsx, .xls, .csv"
          onChange={(e) => handleFileChange(e, 2)}
        />
        <div style={{ fontSize: "24px", color: "red" }}>
          в базе БелГИМ {file2Data.length} свидетельств
        </div>
      </div>
      <div>
        <button onClick={onClicHandler}>
          Найти недостающие свидетельства
        </button>
      </div>

      <div>
        <table id="my-table"
          style={{
            borderCollapse: "collapse",
            width: "100%",
            border: "1px solid black",
            marginTop: "20px",
          }}
        >
          <thead>
            <tr>
              {keys.map((el, i) => (
                <th
                  key={i}
                  style={{
                    border: "1px solid black",
                    padding: "8px",
                    textAlign: "center",
                  }}
                >
                  {el}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {diference.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {keys.map((key, i) => (
                  <td
                    key={i}
                    style={{
                      border: "1px solid black",
                      padding: "8px",
                    }}
                  >
                    {typeof row[key] === "object"
                      ? JSON.stringify(row[key])
                      : row[key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button onClick={exportTableToExcel}>Экспорт в Excel</button>
    </div>
  );
};
