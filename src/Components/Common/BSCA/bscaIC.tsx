import React from "react";
import styles from './bsca.module.css'


export const BscaIC = () => {
    return(
        <table className={styles.table}>
      <tbody>
        <tr>
          <td className={styles.firstColumn}>БГЦА</td>
          <td rowSpan={2} className={styles.secondColumn}>
            BY/112 1.1751<br />
            ГОСТ ISO/IEC 17025
          </td>
        </tr>
        <tr>
          <td className={styles.firstColumn}>BSCA</td>
        </tr>
      </tbody>
    </table>
    )
}