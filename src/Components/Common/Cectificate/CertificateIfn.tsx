import React, { useRef } from 'react';
import st from './Certificate.module.css'
import bgca from '../../../Pictures/bgca.jpg'
import certif from '../../../Pictures/certif.png'
import iso from '../../../Pictures/iso.png'
import { StandardsTableHeader } from '../StandardsTableHeader/StandardsTableHeader';
import { ResultTableEsoHeader } from '../ResultTableEsoHeader/ResultTableEsoHeader';
import { Gym } from '../Gym/Gym';
import { ResultInDot } from '../ResultInDot/ResultInDot';
import { useSelector } from 'react-redux';
import { selectReportIfn } from '../../../Redux/selectors/eso-report-selectors';
import { useParams } from 'react-router-dom';
import { ReportIfnType } from '../../../Redux/IfnReducer';
import { useReactToPrint } from 'react-to-print';
import { LogoBlock } from '../BSCA/LogoBlock/logoBloc';




export const CertificateIfn = () => {

    const componentRef = useRef()
    const pdfHandler = useReactToPrint({
        content: () => componentRef.current!,
        documentTitle: 'Certificate',
    })

    let reportsIfn = useSelector(selectReportIfn)
    const params = useParams<'id'>();
    let reportId = params.id
    let report: ReportIfnType | undefined

    report = reportsIfn!.find(el => el.reportId === reportId)

    let newStandards = report?.standard.slice(0, -2)
    if (report && report.standard && newStandards) {
        report = { ...report, standard: newStandards }
    }

    return (
        //  @ts-ignore >
        <div className={st.container} ref={componentRef} onDoubleClick={pdfHandler}>
            <div className={st.page}>
                <div className={st.certificateHeader}>
                    <div>
                        <span>РЕСПУБЛИКАНСКОЕ УНИТАРНОЕ ПРЕДПРИЯТИЕ </span>
                    </div>
                    <div>
                        <span>«ГОМЕЛЬСКИЙ ЦЕНТР СТАНДАРТИЗАЦИИ, МЕТРОЛОГИИ</span>
                    </div>
                    <div>
                        <span>
                            И СЕРТИФИКАЦИИ»
                        </span>
                        <div>
                            <span>ОТДЕЛ МЕТРОЛОГИИ</span>
                        </div>
                    </div>
                </div>
                <LogoBlock/>
                {/* <div className={st.picturesBlock}>
                    <span >
                        <img className={st.pictures} src={bgca} alt="BGCA" />
                    </span>
                    <span >
                        <img className={st.pictures} src={certif} alt="BGCA" />
                    </span>
                    <span >
                        <img className={st.picturesIso} src={iso} alt="BGCA" />
                    </span>
                </div> */}
                <div className={st.certificateTitle}>
                    <h2>Свидетельство о калибровке</h2>
                </div>
                <div className={st.pageCount}>
                    <span > Страница 1 из 2</span>
                </div>
                <div className={st.certificateNumberBlock}>
                    <span className={st.certificateTitleB}>Номер свидетельства</span>
                    <span className={st.certificateNumber}>{report!.stigma}</span>
                    <span className={st.certificateTitleDate}>Дата калибровки</span>
                    <span className={st.certificateNumber}>{report!.calibrationDate}</span>
                </div>
                <div className={st.certificateNumberBlock}>
                    <span className={st.certificateTitleB}>Объект калибровки</span>
                    <span className={st.certificateNumber}>
                        {report!.calibrationObjectType}
                    </span>
                    <div>
                        <span className={st.serialNumber}>зав. №</span>
                        <span className={st.certificateNumber}>{report!.serialNumber}</span>
                    </div>
                </div>
                <div className={st.si}>{`(наименование  средства измерения/идентификация) `}</div>
                <div className={st.certificateNumberBlock}>
                    <span className={st.certificateTitleB}>Владелец средства измерения</span>
                    <span className={st.certificateNumber}>{report!.customer}</span>
                    <div className={st.adres}>
                        <span className={st.adres}>{report!.adresCustumer}</span>
                    </div>
                </div>
                <div className={st.si}>{`(информация о владельце средства измерения, адрес) `}</div>
                <div className={st.certificateNumberBlock}>
                    <span className={st.certificateTitleB}>Калибровочное клеймо-наклейка</span>
                    <span className={st.certificateNumber}>{report!.stigma}</span>
                    <div className={st.sig}>{`(порядковый номер) `}</div>
                </div>
                <div className={st.certificateNumberBlock}>
                    <span className={st.certificateTitleB}>Метод калибровки</span>
                    <span className={st.certificateNumber}>{report!.method}</span>
                </div>
                <div className={st.si}>{`(наименование метода/идентификация) `}</div>

                <div className={st.info}>
                    <hr />
                    <span>
                        {`Все измерения имеют прослеживаемость к единицам Международной системы единиц (СИ), которые воспроизводятся национальными эталонами единиц величин Республики Беларусь и (или) национальными эталонами единиц величин других стран`}
                    </span>
                    <hr />
                    <span>
                        {`Данное свидетельство может быть воспроизведено только полностью. Любая публикация или частичное воспризведение содержания свидетельства возможны с письменного разрешения  уполномоченного юридичесгого лица, выдавшего свидетельство.`}
                    </span>
                    <hr />
                </div>
                <div className={st.bossBlock}>
                    <span className={st.certificateTitleB}>Подпись</span>
                    <span className={st.boss}>{report!.boss}</span>
                </div>
                <div className={st.si}>{`(инициалы, фамилия, должность служащего)  `}</div>
                <div className={st.dateBlock}>
                    <span className={st.dateTitle}>Дата выдачи</span>
                    <span className={st.certificateNumber}>{report!.calibrationDate}</span>
                </div>
            </div>
            <div className={st.page2}>
                <div className={st.seconPageHeaderCetrificate}>
                    <span className={st.certificateTitleB}>Свидетельство о калибровке</span>
                    <span className={st.certificateNumber}>{report!.stigma}</span>
                    <span className={st.pageNumber2}>Страница 2 из 2</span>
                </div>
                <div className={st.calibration}>
                    <span>Калибровка выполнена с помощью</span>
                    <span className={st.pageNumberTable}>Таблица 1</span>
                </div>
                <div className={st.standardsTable}>
                    <table border={1} >
                        <tbody>
                            <StandardsTableHeader />
                            {
                                report!.standard.map((el, i) => {
                                    return (
                                        <tr key={i}>
                                            <td> {el.standardName} </td>
                                            <td> {el.standardType}</td>
                                            <td> {el.standardNumber}</td>
                                            <td> {el.value}</td>
                                            <td>{el.calibrationDate}</td>
                                        </tr>
                                    )
                                })
                            }

                        </tbody>
                    </table>
                </div>
                <div className={st.aboutSrandards}>
                    <span>
                        {report!.traceability}
                    </span>
                </div>
                <div className={st.evidance}>
                    <span className={st.naming2page}>{`(наименование эталонов и их статус/идентификация/доказательство прослеживаемости)`}</span>
                </div>
                <div className={st.weatherBlock}>
                    <span className={st.weather}> Условия калибровки: </span>
                    <span className={st.weather}> Температура воздуха: {report!.temperature} ºС;</span>
                    <span className={st.weather}> Относительная влажность воздуха: {report!.relativeHumidity}%;</span>
                    <span className={st.weather}> Атмосферное давление: {report!.pressure} кПа;</span>
                    <span className={st.weather}> Напряжение питающей сети: {report!.supplyVoltage} В;</span>
                    <span className={st.weather}> Частота питающей сети: {report!.frequency} Гц;</span>

                </div>
                <div className={st.weatherDown}>
                    <span className={st.naming2page}>{`(условия окружающей среды и другие влияющие факторы)`}</span>
                </div>
                <div className={st.calibration}>
                    <span>Результаты калибровки, включая неопределенность</span>
                    <span className={st.pageNumberTable2}>Таблица 2</span>
                </div>
                <div className={st.resultTableBlock}>
                    <table border={1}>
                        <tbody>
                            <tr>
                                <ResultTableEsoHeader />
                            </tr>
                            {
                                report!.calculation.map((el, i) => {
                                    return (
                                        <tr key={i}>
                                            <td className={''}>{`${el.calibrationDot} ${el.calibrationValue}`}</td>
                                            <td className={''}>{el.mode}</td>
                                            <td className={''}>{`${el.calibrationMiddleValue}  ${el.calibrationValue}`}</td>
                                            <td className={''}>{`${el.error}  ${el.calibrationValue}`}</td>
                                            <td className={''}> {` ±${el.permissibleValue}  ${el.calibrationValue}`}</td>
                                            <td className={''}>{`${el.expandedUncertainty}  ${el.calibrationValue}`}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
                <div className={st.gym}>
                    <Gym />
                </div>
                <div className={st.correspondence}>
                    <span> Заключение о соответствии : </span>
                    <span> {report!.calibrationObjectType}</span>
                    <span>{` № ${report!.serialNumber}`}</span>
                </div>
                <div className={st.gym}>
                    <span> <ResultInDot /> </span>
                </div>
                <div className={st.correspondence}>
                    <span>Дополнительная информация:</span>
                    <span> протокол калибровки № {report!.reportNumber}</span>
                </div>

                <div className={st.correspondence}>
                    <span>Межкалибровочный интервал не должен превышать 12 месяцев </span>
                </div>
                <div className={st.sign}>
                    <span>Подпись лица, выполнившего калибровку: </span>
                    <span className={st.face}>{report!.engineer}</span>
                </div>
                <div>
                    <span className={st.faceDiscription}>{`(инициалы, фамилия, должность служащего)`}</span>
                </div>
                <div className={''}>
                    <div className={st.adressLastPage}> {`ул.Лепешинского,1, 246015, г.Гомель,  +375 232 26-33-03, +375 232 26-33-25 факс,`}</div>
                    <div className={st.adressLastPage}>mail@gomelcsms.by, www.gomelcsms.by</div>
                    <div className={st.adressLastPage}>{`(адрес лаборатории, телефон, факс, эл. почта, web-сайт)`}</div>
                </div>
                <div className={st.sign}>
                    <span>Место проведения калибровки </span>
                    <span className={st.face}>{`государственное предприятие "Гомельский ЦСМС", 246015, г. Гомель, ул. Лепешинского, 1`} </span>
                </div>
            </div>
        </div>
    )
}
