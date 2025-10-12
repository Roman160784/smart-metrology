import React, { ChangeEvent, useState } from "react";
import { v1 } from "uuid";
import { EditableSpan } from "../../../Common/EditableSpan/EditableSpan";

type ConterType = {
  id: string;
  stigma: string;
  counterNumber: string;
  modification: string;
};

export const CounterHelper = () => {
  const [rows, setRows] = useState<Array<ConterType>>([
    { id: v1(), stigma: "1111", counterNumber: "", modification: "475" },
  ]);

  
  

  const removeRow = (id: string) => {
    let newArr = rows.filter((el) => el.id !== id);
    setRows(newArr);
  };

  

  const changeValue = (e: ChangeEvent<HTMLInputElement>, id: string) => {
    const newValue = e.currentTarget.value;

    
    const modification = newValue.slice(0, 3);
    const counterNumber = newValue.slice(3);

    setRows((prev) =>prev.map((el) =>el.id === id ? { ...el, modification, counterNumber } : el))
      
  };

  

  const inputHandler = (e: React.KeyboardEvent<HTMLInputElement>,  id: string) => {
    
    if (e.key === "Enter") {
      // Добавляем новую строку
      const newRow = {
        id: v1(),
        stigma: "1111",
        counterNumber: "",
        modification: "",
      };
      setRows((prev) => [...prev, newRow]);
      e.preventDefault();
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <table
        border={1}
        style={{ borderCollapse: "collapse", textAlign: "center" }}
      >
        <thead>
          <tr style={{ height: "30px" }}>
            <th style={{ minWidth: "30px" }}>Номер п/п</th>
            <th style={{ minWidth: "120px" }}>Номер клейма</th>
            <th style={{ minWidth: "300px" }}>Номер счётчика</th>
            <th style={{ minWidth: "40px" }}>Модификация</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((el, i) => {
            return (
              <tr key={el.id}>
                <td>{i + 1}</td>
                <td>
                  {<EditableSpan title={el.stigma} changeTitle={() => {}} />}
                </td>
                <td>
                  <input
                    type="text"
                    autoFocus
                    value={el.modification + el.counterNumber} 
                    onKeyDown={(e) => inputHandler(e, el.id)}
                    onChange={(e) => changeValue(e, el.id)}
                    style={{
                      width: "100%",
                      height: "100%",
                      boxSizing: "border-box",
                      padding: "0",
                      margin: "0",
                      border: "none",
                      textAlign: "center",
                    }}
                  />
                </td>
                <td onDoubleClick={() => removeRow(el.id)}>
                  {el.modification}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
