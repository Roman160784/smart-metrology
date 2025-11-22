import React from "react";
import styles from './bsca.module.css'


export const Bsca = () => {
    return(
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
    )
}