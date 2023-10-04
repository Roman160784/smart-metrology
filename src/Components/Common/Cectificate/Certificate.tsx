import React from 'react';
import { useParams } from 'react-router-dom';
import st from './Certificate.module.css'
import bgca from '../../../Pictures/bgca.jpg'
import certif from '../../../Pictures/certif.png'
import iso from '../../../Pictures/iso.png'

export const Certificate = () => {

    const params = useParams<'id'>();
    let reportId = params.id

    return (
        <div className={st.container}>
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
           
            </div>
        </div>
    )
}