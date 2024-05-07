import React, { ChangeEvent, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import {
  addNewCalibrationFieldForE6andPsiTC,
  changeReportE6TitleTC,
  changeStandardCalibrationDateE6TC,
  removeCalibrationFieldE6TC,
  ReportE6Type,
  updateCalibrationObjectTypeE6TC,
  updateCalibrationValueE6TC,
  updateDaraForCalculationCalibrationE6TC,
  updateTestVoltageReportE6TC,
} from "../../../../Redux/E6Reducer";
import { selectReportE6 } from "../../../../Redux/selectors/eso-report-selectors";
import { useAppDispatch } from "../../../../Redux/store";
import { ReportHeader } from "../../../ReportHeader/ReportHeder";
import st from "../EmirEso/ReportEso/ReportEso.module.css";
import stl from "../../../ReportFirstPage/ReportFirstPage.module.css";
import { EditableSpan } from "../../../Common/EditableSpan/EditableSpan";
import { ReportSecondPage } from "../../../ReportSecondPage/ReportSecondPage";
import { ResultInDot } from "../../../Common/ResultInDot/ResultInDot";
import { Input } from "../../../Common/Input/Input";
import { Gym } from "../../../Common/Gym/Gym";
import { FiPrinter } from "react-icons/fi";
import { CalculationE6andPsi } from "./CalculationE6andPsi";
import { v1 } from "uuid";


export const ReportE6andPsi = () => {
  const dispatch = useAppDispatch();
  const componentRef = useRef();
  const navigate = useNavigate();
  const params = useParams<"id">();
  let reportId = params.id;
  const [value, setValue] = useState<string>("");
  const [lastPage, setLastPage] = useState<number>(3)
    let pageCounter: number = 3

  let reportsE6andPsi = useSelector(selectReportE6);
  let report: ReportE6Type;
  

  let element = reportsE6andPsi.find((el) => el.reportId === reportId);
  if (element) {
    report = element;
  } else {
    console.log("err");
  }

  const [selectedValue, setSelectedValue] = useState<string>(
    report!.calibrationObjectType
  );

  const pdfHandler = useReactToPrint({
    content: () => componentRef.current!,
    documentTitle: "Report",
  });

  const onSetLastPageHandler = ()=> {
    setLastPage(pageCounter)
  }
  const selectHandler = (
    reportId: string,
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    const newValue = event.target.value;
    setSelectedValue(newValue);
    dispatch(
      updateCalibrationObjectTypeE6TC({
        reportId: reportId,
        calibrationObjectType: newValue,
      })
    );
  };

  const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let newValue = e.currentTarget.value;
    setValue(newValue);
  };

  const onblurHandler = (reportId: string) => {
    if (value.trim() !== "") {
      dispatch(
        addNewCalibrationFieldForE6andPsiTC({
          reportId: reportId,
          calculationId: v1(),
          dot: +value,
        })
      );
    }
    setValue("");
  };

  const changeReportTitleHandler = (
    id: string,
    key: string,
    parameter: string
  ) => {
    dispatch(
      changeReportE6TitleTC({ reportId: id, key: key, parameter: parameter })
    );
  };

  const changeStandardDateHandler = (
    reportId: string,
    key: string,
    title: string,
    id: string
  ) => {
    dispatch(
      changeStandardCalibrationDateE6TC({
        reportId: reportId,
        key: key,
        parameter: title,
        id: id,
      })
    );
  };

  const updateDataForCalculation = (
    reportId: string,
    calculationId: string,
    index: number,
    dot: number
  ) => {
    dispatch(
      updateDaraForCalculationCalibrationE6TC({
        reportId: reportId,
        calculationId: calculationId,
        index: index,
        dot: dot,
      })
    );
  };
  const removeCalculationField = (reportId: string, id: string) => {
    dispatch(
      removeCalibrationFieldE6TC({ reportId: reportId, calculationId: id })
    );
  };
  const updateCalibrationValueHandler = (
    reportId: string,
    calculationId: string,
    calibrationValue: string
  ) => {
    dispatch(
      updateCalibrationValueE6TC({
        reportId: reportId,
        calculationId: calculationId,
        calibrationValue: calibrationValue,
      })
    );
  };
  const updateTestVoltageHandler = (
    reportId: string,
    calculationId: string,
    testVoltage: string
  ) => {
    dispatch(
      updateTestVoltageReportE6TC({
        reportId: reportId,
        calculationId: calculationId,
        testVoltage: testVoltage,
      })
    );
  };

  const navigateToCertificate = (reportId: string) => {
    navigate(`/certificate/${reportId}`);
  };
  return (
    //  @ts-ignore >
    <div className={st.container} ref={componentRef}>
      <div className={st.page}>
        <ReportHeader />
        <div>
          <div className={stl.reportNumber}>
            ПРОТОКОЛ КАЛИБРОВКИ № {""}
            <EditableSpan
              title={report!.reportNumber}
              changeTitle={(title) => {
                changeReportTitleHandler(
                  report.reportId,
                  "reportNumber",
                  title
                );
              }}
            />
          </div>
          <table className={stl.table} border={1}>
            <tbody>
              <tr>
                <td>Объект калибровки</td>
                <td>
                  {" "}
                  {`Мегаомметр   `}
                  <select
                    value={selectedValue}
                    onChange={(selectedValue) => {
                      selectHandler(report.reportId, selectedValue);
                    }}
                  >
                    <option value="Е6-24" selected={true}>
                      Е6-24
                    </option>
                    <option value="Е6-24/1">Е6-24/1</option>
                    <option value="Е6-24/2">Е6-24/2</option>
                    <option value="Е6-31">Е6-31</option>
                    <option value="Е6-31/1">Е6-31/1</option>
                    <option value="Е6-32">Е6-32</option>
                    <option value="ПСИ-2500">ПСИ-2500</option>
                    <option value="ПСИ-2510">ПСИ-2510</option>
                    <option value="ПСИ-2530">ПСИ-2530</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>Заводской номер</td>
                <td>
                  <EditableSpan
                    title={report!.serialNumber}
                    changeTitle={(title) => {
                      changeReportTitleHandler(
                        report.reportId,
                        "serialNumber",
                        title
                      );
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td>Основания для проведения калибровки</td>
                <td>
                  <EditableSpan
                    title={report!.application}
                    changeTitle={(title) => {
                      changeReportTitleHandler(
                        report.reportId,
                        "application",
                        title
                      );
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td>Наименование заказчика</td>
                <td>
                  <EditableSpan
                    title={report!.customer}
                    changeTitle={(title) => {
                      changeReportTitleHandler(
                        report.reportId,
                        "customer",
                        title
                      );
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td>Адрес Заказчика</td>
                <td>
                  <EditableSpan
                    title={report!.adresCustumer}
                    changeTitle={(title) => {
                      changeReportTitleHandler(
                        report.reportId,
                        "adresCustumer",
                        title
                      );
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td>Место проведения калибровки</td>
                <td>государственное предприятие "Гомельский ЦСМС"</td>
              </tr>
              <tr>
                <td>Дата проведения калибровки</td>
                <td>
                  <EditableSpan
                    title={report!.calibrationDate}
                    changeTitle={(title) => {
                      changeReportTitleHandler(
                        report.reportId,
                        "calibrationDate",
                        title
                      );
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td>Метод, методика калибровки </td>
                <td>
                  <EditableSpan
                    title={report!.method}
                    changeTitle={(title) => {
                      changeReportTitleHandler(
                        report.reportId,
                        "method",
                        title
                      );
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td>Условия проведения калибровки</td>
                <tr>
                  <td className={stl.tempreture}>
                    Температура воздуха:{" "}
                    <EditableSpan
                      title={report!.temperature}
                      changeTitle={(title) => {
                        changeReportTitleHandler(
                          report.reportId,
                          "temperature",
                          title
                        );
                      }}
                    />{" "}
                    ºС
                  </td>
                </tr>
                <tr>
                  <td className={stl.tempreture}>
                    Относительная влажность воздуха:{" "}
                    <EditableSpan
                      title={report!.relativeHumidity}
                      changeTitle={(title) => {
                        changeReportTitleHandler(
                          report.reportId,
                          "relativeHumidity",
                          title
                        );
                      }}
                    />{" "}
                    %
                  </td>
                </tr>
                <tr>
                  <td className={stl.tempreture}>
                    Атмосферное давление:{" "}
                    <EditableSpan
                      title={report!.pressure}
                      changeTitle={(title) => {
                        changeReportTitleHandler(
                          report.reportId,
                          "pressure",
                          title
                        );
                      }}
                    />{" "}
                    кПа
                  </td>
                </tr>
                <tr>
                  <td className={stl.tempreture}>
                    Напряжение питающей сети:{" "}
                    <EditableSpan
                      title={report!.supplyVoltage}
                      changeTitle={(title) => {
                        changeReportTitleHandler(
                          report.reportId,
                          "supplyVoltage",
                          title
                        );
                      }}
                    />{" "}
                    В
                  </td>
                </tr>
                <tr>
                  <td className={stl.tempreture}>
                    Частота питающей сети:{" "}
                    <EditableSpan
                      title={report!.frequency}
                      changeTitle={(title) => {
                        changeReportTitleHandler(
                          report.reportId,
                          "frequency",
                          title
                        );
                      }}
                    />{" "}
                    Гц
                  </td>
                </tr>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className={st.page}>
        <ReportSecondPage
          lastPage={lastPage}
          report={report!}
          changeStandardDate={changeStandardDateHandler}
        />
      </div>
      {report!.calculation.map((el, i) => {
        pageCounter++;
        return (
          <div key={i} className={st.page}>
            <div className={st.header}>
              <span className={st.headerTitle}>
                Протокол {report.reportNumber}
              </span>
              <span className={st.headerTitle}>
                от {report.calibrationDate}
              </span>
              <span className={st.headerTitle}>
                страница {i + 3} страниц {lastPage}{" "}
              </span>
            </div>
            <CalculationE6andPsi
              calculation={el}
              updateDataForCalculation={updateDataForCalculation}
              removeCalculationField={removeCalculationField}
              updateCalibrationValue={updateCalibrationValueHandler}
              updateTestVoltage={updateTestVoltageHandler}
            />
          </div>
        );
      })}
      <div className={st.page}>
        <div className={st.header}>
          <span className={st.headerTitle}>
            Протокол {report!.reportNumber}
          </span>
          <span className={st.headerTitle}>от {report!.calibrationDate}</span>
          <span className={st.headerTitle}>
            страница {lastPage} страниц {lastPage}
          </span>
        </div>
        <div className={st.inputBlock}>
          <Input
            value={value}
            onChange={inputHandler}
            onBlur={() => {
              onblurHandler(report.reportId);
            }}
          />
          <span className={st.spanInput}>Добавьте точку калибровки</span>
        </div>
        <div className={st.gym}>
          <Gym />
        </div>
        <div className={st.final}>
          <span>Заключение о соответствии:</span>
          <div className={st.final}>
            <span>{`${report!.calibrationObjectName} ${
              report!.calibrationObjectType
            } № ${report!.serialNumber}`}</span>
          </div>
          <div className={st.final}>
            <span>
              {" "}
              <ResultInDot />{" "}
            </span>
          </div>
          <div className={st.final}>
            <span>Калибровочное клеймо: </span>
            <EditableSpan
              title={report!.stigma}
              changeTitle={(title) => {
                changeReportTitleHandler(report.reportId, "stigma", title);
              }}
            />
          </div>
          <div className={st.final}>
            Калибровку выполнил: _____________________
            <EditableSpan
              title={report!.engineer}
              changeTitle={(title) => {
                changeReportTitleHandler(report.reportId, "engineer", title);
              }}
            />
          </div>
          <div className={st.final}>
            Проверил : _________________
            <EditableSpan
              title={report!.boss}
              changeTitle={(title) => {
                changeReportTitleHandler(report.reportId, "boss", title);
              }}
            />
          </div>
        </div>
        <div className={st.printer} onClick={onSetLastPageHandler}>
          <FiPrinter onClick={pdfHandler} />
          <span
            onClick={() => {
              navigateToCertificate(report.reportId);
            }}
            className={st.certificate}
          >
            {"Cоздать свидетельство"}
          </span>
        </div>
      </div>
    </div>
  );
};

