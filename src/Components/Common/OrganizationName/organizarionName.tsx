import React, { ChangeEvent, useState, useRef, useEffect } from "react";
import styles from './organizationName.module.css'


export const OrganizationName = () => {
    return(
        <div className={styles.header}>
        <p className={styles.orgName}>Государственное предприятие</p>
        <p className={styles.title}>«Гомельский ЦСМС» отдел метрологии</p>
        <p className={styles.address}>
          ул. Лепешинского, 1, г. Гомель, 246015, тел. 26-33-31
        </p>
        <table className={styles.table}>
      <tbody>
        <tr>
          <td className={styles.firstColumn}>БГЦА</td>
          <td rowSpan={2} className={styles.secondColumn}>
            BY/112-3-0056<br />
            СТБ 2542
          </td>
        </tr>
        <tr>
          <td className={styles.firstColumn}>BSCA</td>
        </tr>
      </tbody>
    </table>
      </div>
    )
}