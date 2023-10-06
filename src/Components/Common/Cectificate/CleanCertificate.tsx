import React from 'react';
import st from './Certificate.module.css'
import bgca from '../../../Pictures/bgca.jpg'
import certif from '../../../Pictures/certif.png'
import iso from '../../../Pictures/iso.png'
import { StandardsTableHeader } from '../StandardsTableHeader/StandardsTableHeader';
import { ResultTableEsoHeader } from '../ResultTableEsoHeader/ResultTableEsoHeader';
import { Gym } from '../Gym/Gym';

export const CleanCertificate = () => {

    return(
        <>
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
                <div className={st.picturesBlock}>
                    <span >
                        <img className={st.pictures} src={bgca} alt="BGCA" />
                    </span>
                    <span >
                        <img className={st.pictures} src={certif} alt="BGCA" />
                    </span>
                    <span >
                        <img className={st.picturesIso} src={iso} alt="BGCA" />
                    </span>
                </div>
                <div className={st.certificateTitle}>
                    <h2>Свидетельство о калибровке</h2>
                </div>
                <div className={st.pageCount}>
                    <span > Страница 1 из 2</span>
                </div>
                <div className={st.certificateNumberBlock}>
                    <span className={st.certificateTitleB}>Номер свидетельства</span>
                    <span className={st.certificateNumber}>BY0004972</span>
                    <span className={st.certificateTitleB}>Дата калибровки</span>
                    <span className={st.certificateNumber}>11.11.2023</span>
                </div>
                <div className={st.certificateNumberBlock}>
                    <span className={st.certificateTitleB}>Объект калибровки</span>
                    <span className={st.certificateNumber}>Измеритель сопротивленияfd d df dfgfdbhdh заземдения Ис20/1 </span>
                    <div>
                        <span className={st.serialNumber}>зав. №</span>
                        <span className={st.certificateNumber}>11111111</span>
                    </div>
                </div>
                <div className={st.si}>{`(наименование  средства измерения/идентификация) `}</div>
                <div className={st.certificateNumberBlock}>
                    <span className={st.certificateTitleB}>Владелец средства измерения</span>
                    <span className={st.certificateNumber}>РПППРРРРРРРРр РОПШдсиывды рдиывдмивырдимывдр мирвыимрдвыимрдыв имывдми</span>
                    <div className={st.adres}>
                        <span className={st.adres}>адрес адрес адрес адрес</span>
                    </div>
                </div>
                <div className={st.si}>{`(информация о владельце средства измерения, адрес) `}</div>
                <div className={st.certificateNumberBlock}>
                    <span className={st.certificateTitleB}>Калибровочное клеймо-наклейка</span>
                    <span className={st.certificateNumber}>BY1111111</span>
                </div>
                <div className={st.certificateNumberBlock}>
                    <span className={st.certificateTitleB}>Метод калибровки</span>
                    <span className={st.certificateNumber}>МК.ГМ 1580 - 2013 Метод прямых измерений</span>
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
                    <span className={st.boss}>Д. В. Миранович - начальник сектора ЭМиР</span>
                </div>
                <div className={st.si}>{`(инициалы, фамилия, должность служащего)  `}</div>
                <div className={st.dateBlock}>
                    <span className={st.dateTitle}>Дата выдачи</span>
                    <span className={st.certificateNumber}>11.11.2023</span>
                </div>
            </div>
            <div className={st.page}>
                <div className={st.seconPageHeaderCetrificate}>
                <span className={st.certificateTitleB}>Свидетельство о калибровке</span>
                    <span className={st.certificateNumber}>BY0004972</span>
                    <span className={st.pageNumber}>Страница 2 из 2</span>
                </div>
                <div className={st.calibration}>
                <span>Калибровка выполнена с помощью</span>
                <span className={st.pageNumberTable}>Таблица 1</span>
                </div>
                <div className={st.standardsTable}>
                <table border={1} >
                    <tbody>
                    <StandardsTableHeader />
                    <tr>
                    <td> Наименование </td>
                    <td> Тип</td>
                    <td> Зав. №</td>
                    <td> Значение</td>
                    <td>Дата метрологической оценки</td>
                </tr>
                    </tbody>
                </table>
                </div>
                    <div className={st.aboutSrandards}>
                        <span>
                        Обеспечивается прослеживамость до Национальных эталонов - Ома НЭ РБ 29-16
                        </span>
                    </div>
                <div className={st.evidance}>
                    <span className={st.si}>{`(наименование эталонов и их статус/идентификация/доказательство прослеживаемости)`}</span>
                </div>
                <div className={st.weatherBlock}>
                    <span className={st.weather}>Условия калибровки: </span>
                    <span className={st.weather}>Температура воздуха: {'21.1'} ºС;</span>
                    <span className={st.weather}>Атмосферное давление: {'100.1'} кПа;</span>
                    <span className={st.weather}>Напряжение питающей сети: {'230,1'} В;</span>
                    <span className={st.weather}>Частота питающей сети: {'50,0'} Гц;</span>
                    
                </div>
                <div className={st.weatherDown}>
                <span className={st.si}>{`(условия окружающей среды и другие влияющие факторы)`}</span> 
                </div>
                <div className={st.calibration}>
                    <span>Результаты калибровки, включая неопределенность</span>
                    <span className={st.pageNumberTable2}>Таблица 2</span>
                </div>
                <div className={st.resultTableBlock}>
                    <table border={1}>
                        <tbody>
                            <tr>
                                <ResultTableEsoHeader/>
                            </tr>
                            <tr>
                                <td>afd</td>
                            </tr>
                            <tr>
                                <td>afd</td>
                            </tr>
                            <tr>
                                <td>afd</td>
                            </tr>
                            <tr>
                                <td>afd</td>
                            </tr>
                            <tr>
                                <td>afd</td>
                            </tr>
                            <tr>
                                <td>afd</td>
                            </tr>
                            <tr>
                                <td>afd</td>
                            </tr>
                            <tr>
                                <td>afd</td>
                            </tr>
                            <tr>
                                <td>afd</td>
                            </tr>
                            <tr>
                                <td>afd</td>
                            </tr>
                            <tr>
                                <td>afd</td>
                            </tr>
                            <tr>
                                <td>afd</td>
                            </tr>
                            <tr>
                                <td>afd</td>
                            </tr>
                            <tr>
                                <td>afd</td>
                            </tr>
                            <tr>
                                <td>afd</td>
                            </tr>
                            <tr>
                                <td>afd</td>
                            </tr>
                            <tr>
                                <td>afd</td>
                            </tr>
                            <tr>
                                <td>afd</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className={st.gym}>
                <Gym/>
                </div>
                <div className={st.correspondence}>
                    <span> Заключение о соответствии : </span>
                    <span> Мегаомметр </span>
                    <span> ЭС0202/2-Г </span>
                    <span>№ 11111</span>
                </div>
                <div className={st.gym}>
                    <span>
                    в калибруемых точках соответствует обязательным метрологическим требованиям в соответствии с описанием типа при установлении соответствия применно правило принятия решения, основанное на простой приёмке в соответствии с СТБ ISO/IEC Guide 98-4-2019
                    </span>
                </div>
                <div className={st.correspondence}>
                    <span>Дополнительная информация:</span>
                    <span> протокол калибровки № 1111/23/2160к</span>
                </div>
                
                <div className={st.correspondence}>
                    <span>Межкалибровочный интервал не должен превышать 12 месяцев </span>
                </div>
                <div className={st.correspondence}>
                    <span>Подпись лица, выполнившего калибровку </span>
                    <span className={st.face}>Р. С. Матвеенко, инженер  Iк </span>   
                </div>
            </div>
        </>
    )
}