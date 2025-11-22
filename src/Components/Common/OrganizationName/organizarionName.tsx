import React, { ChangeEvent, useState, useRef, useEffect } from "react";
import styles from './organizationName.module.css'
import { Bsca } from "../BSCA/bsca";


export const OrganizationName = () => {
    return(
        <div className={styles.header}>
        <p className={styles.orgName}>Государственное предприятие</p>
        <p className={styles.title}>«Гомельский ЦСМС» отдел метрологии</p>
        <p className={styles.address}>
          ул. Лепешинского, 1, г. Гомель, 246015, тел. 26-33-31
        </p>
        <Bsca/>
      </div>
    )
}