import React, { ChangeEvent, useState } from "react";
import { EditableSpan } from "../../../Common/EditableSpan/EditableSpan";
import { ConterType } from "./counterHelper";

type CountersPropsType = {
    i: number
    title: string
    rows: ConterType[]
    countersID: string
    isExportMode: boolean
    removeRow: (counterId: string, rowsId: string) => void
    inputHandler: (e: React.KeyboardEvent<HTMLInputElement>, counterId: string) => void
    changeValue: (e: ChangeEvent<HTMLInputElement>, counterId: string, rowsId: string) => void
    changeStigma: (stigma: string, counterId: string, rowsId: string, i: number) => void
}



export const Counters = (props: CountersPropsType) => {
    return(
        <>
      <thead>
        
        <tr>
          <th colSpan={4} style={{ textAlign: "center", height: "40px", color: 'red', cursor: "pointer" }}>
             {`${props.title}  ${props.i+1}`}
          </th>
        </tr>
        <tr style={{ height: "30px" }}>
          <th style={{ minWidth: "30px" }}>Номер п/п</th>
          <th style={{ minWidth: "120px" }}>Номер клейма</th>
          <th style={{ minWidth: "300px" }}>Номер счётчика</th>
          <th style={{ minWidth: "40px" }}>Модификация</th>
        </tr>
      </thead>

      <tbody>
        {props.rows?.map((el: any, i: number) => (
          <tr key={el.id}>
            <td>{i + 1}</td>
            <td data-type="string">
              <EditableSpan title={el.stigma} changeTitle={(title) => {props.changeStigma(title, props.countersID, el.id, i)}} />
            </td>
            <td data-type="string">
  {props.isExportMode ? (
    <span>{`'${el.counterNumber}`}</span>
  ) : (
    <input
    autoFocus
      type="text"
      value={ el.counterNumber}
      onChange={(e) => props.changeValue(e, props.countersID, el.id)}
      onKeyDown={(e) => props.inputHandler(e, props.countersID)}
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
  )}
</td>
            <td style={{ cursor: "pointer" }}
              onDoubleClick={() =>
                props.removeRow(props.countersID, el.id)
              }
            >
              {el.modification}
            </td>
          </tr>
        ))}
      </tbody>

    </>
    )
}