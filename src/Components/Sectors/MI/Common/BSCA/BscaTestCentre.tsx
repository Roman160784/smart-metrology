import React from "react";

export const BscaTC = () => {
  return (
    <table
      style={{
        borderCollapse: "collapse",
        fontFamily: "Times New Roman, Times, serif",
        fontSize: "8pt",
        lineHeight: 1.2,
        width: "auto"
      }}
    >
      <tbody>
        <tr>
          <td
            style={{
              border: "1px solid #000",
              padding: "3mm 4mm",
              textAlign: "center",
              verticalAlign: "middle",
              whiteSpace: "nowrap"
            }}
          >
            БГЦА
          </td>

          <td
            rowSpan={2}
            style={{
              border: "1px solid #000",
              padding: "3mm 4mm",
              textAlign: "center",
              verticalAlign: "middle",
              whiteSpace: "nowrap"
            }}
          >
            BY/112&nbsp;5.0017
            <br />
            ГОСТ ISO/IEC 17025
          </td>
        </tr>

        <tr>
          <td
            style={{
              border: "1px solid #000",
              padding: "3mm 4mm",
              textAlign: "center",
              verticalAlign: "middle",
              whiteSpace: "nowrap"
            }}
          >
            BSCA
          </td>
        </tr>
      </tbody>
    </table>
  );
};