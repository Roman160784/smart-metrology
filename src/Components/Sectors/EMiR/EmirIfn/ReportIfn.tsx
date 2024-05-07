import React, { ChangeEvent, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import { addNewCalibrationFieldIfnReportTC, changeReportTitleIfnTC, changeStandardCalibrationDateIfnTC, removeCalibrationFieldIfnTC, ReportIfnType, updateCalibrationObjectTypeIfnTC, updateCalibrationValueIfnTC, updateDaraForCalculationCalibrationIfnTC, updateModeForCalculationIfnTC, updateStandardDataForCalculationCalibrationIfnTC } from '../../../../Redux/IfnReducer';
import { selectReportIfn } from '../../../../Redux/selectors/eso-report-selectors';
import { useAppDispatch } from '../../../../Redux/store';
import st from '../EmirEso/ReportEso/ReportEso.module.css'
import stl from '../../../ReportFirstPage/ReportFirstPage.module.css'
import { ReportHeader } from '../../../ReportHeader/ReportHeder';
import { EditableSpan } from '../../../Common/EditableSpan/EditableSpan';
import { SuperSelect } from '../../../Common/SuperSelect/SuperSelect';
import { ReportSecondPage } from '../../../ReportSecondPage/ReportSecondPage';
import { CalculatonIfn } from './CalculationIfn';
import { FiPrinter } from 'react-icons/fi';
import { ResultInDot } from '../../../Common/ResultInDot/ResultInDot';
import { Input } from '../../../Common/Input/Input';
import { Gym } from '../../../Common/Gym/Gym';
import { v1 } from 'uuid';

export const ReportIfn = () => {

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const componentRef = useRef()
    const params = useParams<'id'>();
    const [value, setValue] = useState<string>('')
    const [lastPage, setLastPage] = useState<number>(3)
    let pageCounter: number = 3
    let reportId = params.id
    let reportsIfn = useSelector(selectReportIfn)
    let report: ReportIfnType
    

    let element = reportsIfn.find(el => el.reportId === reportId)
    if (element) {
        report = element
    } else {
        console.log('err');
    }

    const pdfHandler = useReactToPrint({
        content: () => componentRef.current!,
        documentTitle: 'Report',
    })

    const onSetLastPageHandler = ()=> {
        setLastPage(pageCounter)
      }

    const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newValue = e.currentTarget.value
        setValue(newValue)
    }

    const onblurHandler = (reportId: string) => {
        if (value.trim() !== '') {
            dispatch(addNewCalibrationFieldIfnReportTC({ reportId: reportId, calculationId: v1(), dot: +value, }))
        }
        setValue('')
    }

    const changeReportTitleHandler = (id: string, key: string, parameter: string) => {
        dispatch(changeReportTitleIfnTC({ reportId: id, key: key, parameter: parameter }))
    }

    const changeCalibrationObjectType = (reportId: string, option: string | number) => {
        dispatch(updateCalibrationObjectTypeIfnTC({ reportId: reportId, calibrationObjectType: option }))
    }

    const changeStandardDateHandler = (reportId: string, key: string, title: string, id: string) => {
        dispatch(changeStandardCalibrationDateIfnTC({ reportId: reportId, key: key, parameter: title, id: id }))
    }

    const removeCalculationField = (reportId: string, id: string) => {
        dispatch(removeCalibrationFieldIfnTC({ reportId: reportId, calculationId: id }))
    }

    const updateDataForCalculation = (reportId: string, calculationId: string, index: number, dot: number) => {
        dispatch(updateDaraForCalculationCalibrationIfnTC({ reportId: reportId, calculationId: calculationId, index: index, dot: dot }))
    }

    const updateCalibrationValueHandler = (reportId: string, calculationId: string, calibrationValue: string) => {
        dispatch(updateCalibrationValueIfnTC({ reportId: reportId, calculationId: calculationId, calibrationValue: calibrationValue }))
    }

    const updateModeforCalculationHandler = (reportId: string, calculationId: string, mode: string) => {
        dispatch(updateModeForCalculationIfnTC({reportId: reportId, calculationId: calculationId, mode: mode}))
    }

    const changeStandardStatus = (reportId: string, calculationId: string, id: string, standardValue: number, checked: boolean) => {
        dispatch(updateStandardDataForCalculationCalibrationIfnTC({reportId: reportId, calculationId: calculationId, id: id, standardValueInDot: standardValue, checked: checked}))
        
    }

    const navigateToCertificate = (reportId: string) => {
        navigate(`/certificateIfn/${reportId}`)
    }

    return (
        //  @ts-ignore >
        <div className={st.container} ref={componentRef}>
            <div className={st.page}>
                <ReportHeader />
                <div>
                    <div className={stl.reportNumber}>ПРОТОКОЛ КАЛИБРОВКИ № {''}
                        <EditableSpan title={report!.reportNumber} changeTitle={(title) => { changeReportTitleHandler(report.reportId, 'reportNumber', title) }} /> </div >
                    <table className={stl.table} border={1}>
                        <tbody>
                            <tr>
                                <td>Объект калибровки</td>
                                <td>
                                    <SuperSelect options={report!.allCalibrationObjectTypes} onChangeOption={(option) => { changeCalibrationObjectType(report!.reportId, option) }} />
                                </td>
                            </tr>
                            <tr>
                                <td>Заводской номер</td>
                                <td><EditableSpan title={report!.serialNumber}
                                    changeTitle={(title) => { changeReportTitleHandler(report.reportId, 'serialNumber', title) }} /></td>
                            </tr>
                            <tr>
                                <td>Основания для проведения калибровки</td>
                                <td><EditableSpan title={report!.application}
                                    changeTitle={(title) => { changeReportTitleHandler(report.reportId, 'application', title) }} /></td>
                            </tr>
                            <tr>
                                <td>Наименование заказчика</td>
                                <td><EditableSpan title={report!.customer}
                                    changeTitle={(title) => { changeReportTitleHandler(report.reportId, 'customer', title) }} /></td>
                            </tr>
                            <tr>
                                <td>Адрес Заказчика</td>
                                <td><EditableSpan title={report!.adresCustumer}
                                    changeTitle={(title) => { changeReportTitleHandler(report.reportId, 'adresCustumer', title) }} /></td>
                            </tr>
                            <tr>
                                <td>Место проведения калибровки</td>
                                <td>государственное предприятие "Гомельский ЦСМС"</td>
                            </tr>
                            <tr>
                                <td>Дата проведения калибровки</td>
                                <td><EditableSpan title={report!.calibrationDate}
                                    changeTitle={(title) => { changeReportTitleHandler(report.reportId, 'calibrationDate', title) }} /></td>
                            </tr>
                            <tr>
                                <td>Метод, методика калибровки </td>
                                <td><EditableSpan title={report!.method}
                                    changeTitle={(title) => { changeReportTitleHandler(report.reportId, 'method', title) }} /></td>
                            </tr>
                            <tr>
                                <td>Условия проведения калибровки</td>
                                <tr>
                                    <td className={stl.tempreture}>
                                        Температура воздуха: <EditableSpan title={report!.temperature}
                                            changeTitle={(title) => { changeReportTitleHandler(report.reportId, 'temperature', title) }} /> ºС</td>
                                </tr>
                                <tr>
                                    <td className={stl.tempreture}>
                                        Относительная влажность воздуха: <EditableSpan title={report!.relativeHumidity}
                                            changeTitle={(title) => { changeReportTitleHandler(report.reportId, 'relativeHumidity', title) }} /> %</td>
                                </tr>
                                <tr>
                                    <td className={stl.tempreture}>
                                        Атмосферное давление: <EditableSpan title={report!.pressure}
                                            changeTitle={(title) => { changeReportTitleHandler(report.reportId, 'pressure', title) }} /> кПа</td>
                                </tr>
                                <tr>
                                    <td className={stl.tempreture}>
                                        Напряжение питающей сети: <EditableSpan title={report!.supplyVoltage}
                                            changeTitle={(title) => { changeReportTitleHandler(report.reportId, 'supplyVoltage', title) }} /> В</td>
                                </tr>
                                <tr>
                                    <td className={stl.tempreture}>
                                        Частота питающей сети: <EditableSpan title={report!.frequency}
                                            changeTitle={(title) => { changeReportTitleHandler(report.reportId, 'frequency', title) }} /> Гц</td>
                                </tr>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className={st.page}>
                <ReportSecondPage lastPage={lastPage} report={report!} changeStandardDate={changeStandardDateHandler} />
            </div>
            {
                report!.calculation.map((el, i) => {
                    pageCounter++
                    return (
                        <div key={i} className={st.page}>
                            <div className={st.header}>
                                <span className={st.headerTitle}>Протокол  {report.reportNumber}</span>
                                <span className={st.headerTitle}>от {report.calibrationDate}</span>
                                <span className={st.headerTitle}>страница {i + 3} страниц {lastPage} </span>
                            </div>
                            <CalculatonIfn calculation={el}
                                updateDataForCalculation={updateDataForCalculation}
                                removeCalculationField={removeCalculationField}
                                updateCalibrationValue={updateCalibrationValueHandler}
                                updateCalculationMode={updateModeforCalculationHandler}
                                changeStatus={changeStandardStatus}
                                />
                        </div>
                    )
                })
            }
            <div className={st.page}>
                <div className={st.header}>
                    <span className={st.headerTitle}>Протокол  {report!.reportNumber}</span>
                    <span className={st.headerTitle}>от {report!.calibrationDate}</span>
                    <span className={st.headerTitle}>страница {lastPage} страниц {lastPage}</span>
                </div>
                <div className={st.inputBlock}><Input value={value} onChange={inputHandler} onBlur={() => { onblurHandler(report.reportId) }} />
                    <span className={st.spanInput}>Добавьте точку калибровки</span></div>
                <div className={st.gym}>
                    <Gym />
                </div>
                <div className={st.final}>
                    <span>Заключение о соответствии:</span>
                    <div className={st.final}>
                        <span>{`${report!.calibrationObjectType} № ${report!.serialNumber}`}</span>
                    </div>
                    <div className={st.final}>
                        <span> <ResultInDot /> </span>
                    </div>
                    <div className={st.final}>

                        <span>Калибровочное клеймо: </span>
                        <EditableSpan title={report!.stigma} changeTitle={(title) => { changeReportTitleHandler(report.reportId, 'stigma', title) }} />
                    </div>
                    <div className={st.final}>
                        Калибровку выполнил: _____________________
                        <EditableSpan title={report!.engineer} changeTitle={(title) => { changeReportTitleHandler(report.reportId, 'engineer', title) }} />
                    </div>
                    <div className={st.final}>
                        Проверил : _________________
                        <EditableSpan title={report!.boss} changeTitle={(title) => { changeReportTitleHandler(report.reportId, 'boss', title) }} />
                    </div>
                </div>
                <div className={st.printer} onClick={onSetLastPageHandler}>
                    <FiPrinter onClick={pdfHandler} />
                    <span onClick={() => { navigateToCertificate(report.reportId) }} className={st.certificate}>{'Cоздать свидетельство'}</span>
                </div>
            </div>
        </div>
    )
}