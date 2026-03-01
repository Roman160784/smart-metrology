import React from 'react';
import st from '../../../ReportHeader/ReportHeader.module.css'
import iso from '../../../../Pictures/iso.png'
import { BscaTC } from './BSCA/BscaTestCentre';



export const ReportHeaderTC = () => {

    return (
        <>
        <div className={st.mainHeaderBlock}>
            <div >
                РЕСПУБЛИКАНСКОЕ УНИТАРНОЕ ПРЕДПРИЯТИЕ
                <br />
                «ГОМЕЛЬСКИЙ ЦЕНТР СТАНДАРТИЗАЦИИ, МЕТРОЛОГИИ И
                <br />
                СЕРТИФИКАЦИИ»
            </div>
            <div style={{paddingLeft: "10%"
      }}>
                <BscaTC/>
               <img  src={iso} alt="iso" />
            </div>
            
        </div>
        <div
  style={{
    width: "100%",
    textAlign: "center",
    fontFamily: "Times New Roman, Times, serif",
    marginTop: "6mm",
    marginBottom: "6mm"
  }}
>
  <div
    style={{
      fontSize: "18pt",
      fontWeight: "bold",
      marginBottom: "2mm"
    }}
  >
    Отдел метрологии
  </div>

  <div
    style={{
      fontSize: "12pt",
      marginBottom: "1.5mm"
    }}
  >
    246015, г.Гомель, ул.Лепешинского, 1
  </div>

  <div
    style={{
      fontSize: "12pt",
      whiteSpace: "nowrap"
    }}
  >
    тел. +375 232 23-02-34&nbsp;&nbsp;&nbsp;
    mail@gomelcsms.by&nbsp;&nbsp;&nbsp;
    www.gomelcsms.by
  </div>
</div>
        </>
    )
}