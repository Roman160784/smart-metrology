import React, { useEffect, useState } from "react";
import { v1 } from "uuid";
import { OdganizationComponent } from "./organizationComponent";
import { EditableSpan } from "../../../Common/EditableSpan/EditableSpan";
import { CreateLettersButton } from "./LetterButton";
import { SpravkaButton } from "./SpravkaButton";

export type OrganizatiosType = {
  id: string;
  name: string;
  email: string;
  adress: string;
};

type singersType = {
  singersId: string;
  name: string;
  postName: string;
};

export type LettrType = {
  lettrId: string;
  organizations: OrganizatiosType[];
  singers: singersType[];
  singer: string
  latterText: string;
  isponitel: string;
  date: string
  ceo: string
};

const organizations: OrganizatiosType[] = [
  {
    id: v1(),
    name: 'ОДО «Аметист»',
    adress: "212030, Республика Беларусь, Могилевская область, г. Могилев, ул. Первомайская, 71",
    email: "belaser@mail.ru",
  },
  {
    id: v1(),
    name: 'ООО «ТП консалт»',
    adress: "223049, Республика Беларусь, Минская область, Минский район, Щомыслицкий с/с, дом 16, комната 21/16 ",
    email: "tp_sales@tpconsult.by",
  },
  {
    id: v1(),
    name: 'Частное предприятие «Первое измерение»',
    adress: "220094, г. Минск, ул. Ванеева, 34, офис 313",
    email: "info@izm.by",
  },
  {
    id: v1(),
    name: 'ООО «КИП-Эксперт»',
    adress: "220000, Республика Беларусь, г. Минск, ул. Жуковского 11А, офис 6., ",
    email: "info@kip-expert.by",
  },
  {
    id: v1(),
    name: 'ООО «Хофма»',
    adress: "220000, Республика Беларусь, г. Минск",
    email: "3716666@mail.ru",
  },
  {
    id: v1(),
    name: 'ООО «Электронприбор БАЙ»',
    adress: "220000, Республика Беларусь, г. Минск, ул. Быховская 12Н",
    email: "by@1ep.by",
  },
  {
    id: v1(),
    name: 'НП ООО «ЭНЕРГОПРИБОР»',
    adress: "223063, Республика Беларусь, Минская обл., Минский район, Луговослободской с/с, дом 17, каб.23",
    email: "info@energopribor.net",
  },
  {
    id: v1(),
    name: 'ОДО «АТЛАС ИНВЕСТ»',
    adress: "220026, Республика Беларусь, Минск, пер. Бехтерева, 8, ком. 401",
    email: "link@atlasmetr.com",
  },
  {
    id: v1(),
    name: 'ЗАО «БЕЛПРОМПРИБОР»',
    adress: "225389, Республика Беларусь, Брестская область, Ляховичский р-н, д.Щербово",
    email: "info@bpp.by",
  },
  {
    id: v1(),
    name: 'ООО «АмперМера»',
    adress: "220000, Республика Беларусь, г. Минск, ул. Стебенева, д. 20/2, оф. 508",
    email: "ampermera@gmail.com",
  },
  {
    id: v1(),
    name: 'ООО «ПТП Промтехприбор»',
    adress: "220081, Республика Беларусь, Минский рн, д. Копище",
    email: "info@ptp.by",
  },
  {
    id: v1(),
    name: 'ООО «Метрология и автоматизация»',
    adress: "220000, Республика Беларусь, г. Минск, ул. Тимирязева, 67, пом.806",
    email: "info@mia-kip.by",
  },
  
];

const singers: singersType[] = [
  {
    singersId: v1(),
    name: "Р.С.Матвеенко",
    postName: "Начальник сектора ЭМР, ответственный исполнитель",
  },
  {
    singersId: v1(),
    name: "М.В.Дривило",
    postName: "Заместитель начальника испытательного центра",
  },
  {
    singersId: v1(),
    name: "Е.В.Атрощенко",
    postName: "Начальник испытательного центра",
  },
  { singersId: v1(), name: "О.А.Борович", postName: "Председатель комиссии по закупкам" },
  { singersId: v1(), name: "В.А.Мелешко", postName: "Заместитель председателя комиссии по закупкам" },
  { singersId: v1(), name: "А.И.Веремеенко", postName: "Начальник управления по стандартизации и сертификации" },
  { singersId: v1(), name: "А.В.Зайцев", postName: "Начальник отдела метрологии" },
  { singersId: v1(), name: "Н.В.Кебец ", postName: "Главный бухгалтер" },
  { singersId: v1(), name: "О.Л.Фролова", postName: "Начальник сектора ЭПиА" },
  { singersId: v1(), name: "Е.В.Порошина", postName: "Начальник сектора ОПРиК" },
  { singersId: v1(), name: "А.М.Дергачев", postName: "Начальник отдела МТ и ХО" },
  { singersId: v1(), name: "Н.В.Кабаева", postName: "Заведующая хозяйством Отдела МТ и ХО" },
  { singersId: v1(), name: "Е.А.Пинчук", postName: "Юрисконсульт сектора ОПРиК" },
  
];





export const LatterBuyEquipment = () => {
  const [toolName, setToolName] = useState<string>('частотомера Ч3-96/2')
    

    const letter: LettrType = {
      lettrId: "5456456vdsvsdvsd5464YTTTR2212121",
      organizations: organizations,
      singers: singers,
      isponitel: 'Матвеенко Р.С. +375 232 230234',
      singer: 'В.А. Мелешко',
      date: '21.11.2026',
      ceo: 'М.А.Казачок',
      latterText:
       `Государственное предприятие «Гомельский ЦСМС» предлагает Вам принять участие в процедуре закупки по выбору поставщика ${toolName} в количестве 1 штук в соответствии с метрологическими характеристиками, указанными в действующем сертификате об утверждении типа средств измерений № 14622 от 15 декабря 2021 г. государственного реестра средств измерений Республики Беларусь.
       Просим указать стоимость, способ оплаты, сроки поставки и наличие свидетельства о прохождении метрологической оценки юридическими лицами, входящими в государственную метрологическую службу на закупаемое средство измерения. 
       Информацию просим выслать по 07.04.2026 до 17:00 на электронный адрес emr@gomelcsms.by.
       `
    };
    const [mainLetter, setMainLetter] = useState<LettrType>(letter)

    useEffect(() => {
      console.log('Обновлённый текст письма:', mainLetter.latterText);
  }, [mainLetter.latterText]);


    const addNewOrganizationHandler = () => {
      let newOrganization : OrganizatiosType = {id: v1(), name: '', adress: '', email: ''}
      setMainLetter(prev => ({
        ...prev,
        organizations: [...prev.organizations, newOrganization]
    }));
    }

    const removeOrganizationHanhler = (id: string) =>  {
      setMainLetter(prev => ({
        ...prev,
        organizations: prev.organizations.filter(el => el.id !== id)
    }));
    }

    const onChangeDataofOrganization = (formData: OrganizatiosType) => {
      setMainLetter(prev => {
          const updatedOrganizations = prev.organizations.map(el => 
              el.id === formData.id ? formData : el
          );
          return {
              ...prev,
              organizations: updatedOrganizations
          };
      });
  };

  const onChangeToolNameHandler = (toolName: string) => {
    setToolName(toolName)
  }

  const handleLatterTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
        
        setMainLetter(prev => ({
            ...prev,
            latterText: newValue
        }));
};

const onChangeNamesInLater = (key: keyof LettrType, title: string) => {
  setMainLetter(prev => ({
      ...prev,
      [key]: title
  }));
};

const onChangeSingers = (id: string, key: keyof singersType, title: string) => {
  setMainLetter(prev => ({
      ...prev,
      singers: prev.singers.map(singer => 
          singer.singersId === id 
              ? { ...singer, [key]: title }
              : singer
      )
  }));
};

  return (
    <div>
      <div style={{
    display: "flex",
    flexWrap: "wrap",
    gap: "20px"
}}>
    {
        mainLetter.organizations.map(el => (
            <div key={el.id} style={{ width: "calc(22% - 16px)" }}>
                <OdganizationComponent 
                    organizations={el}
                    onDelete={removeOrganizationHanhler}
                    onSave={onChangeDataofOrganization}
                />
            </div>
        ))
    }
</div>
<div style={{
    margin: '10px'
}}>
  <button onClick={addNewOrganizationHandler}>Добавиь организацию</button>
</div>

<div style={{
    margin: '10px'
}}></div>
<div style={{
    margin: '10px',
    fontSize:'24px'
}}>
  <span>{'Предмет закупки: '}</span>
  <EditableSpan title={toolName} changeTitle={(toolName) => {onChangeToolNameHandler(toolName)}}/>
</div>

<div style={{ margin: '10px' }}>
                <div>Текст письма</div>
                <textarea 
                    value={mainLetter.latterText}
                    onChange={handleLatterTextChange}
                    style={{
                        fontSize: '18px',
                        width: '1200px',
                        height: '300px',
                        resize: 'none'
                    }}
                />
            </div>
<div style={{
    margin: '10px',
    fontSize: '20px'
}}>
  <div>Письмо подписал</div>
  Заместитель директора <EditableSpan title={mainLetter.singer} changeTitle={(title) => {onChangeNamesInLater('singer', title)}}/>
</div>
<div style={{
    margin: '10px',
    fontSize: '20px'
}}>
  <div>Исполнитель</div>
   <EditableSpan title={mainLetter.isponitel} changeTitle={(title) => {onChangeNamesInLater('isponitel', title)}}/>
</div>
<div style={{
    margin: '10px',
    fontSize: '20px'
}}>
  <div>Дата</div>
   <EditableSpan title={mainLetter.date} changeTitle={(title) => {onChangeNamesInLater('date', title)}}/>
</div>
<div style={{
    margin: '10px',
    fontSize: '20px'
}}>
  
   <CreateLettersButton letter={mainLetter}/>
</div>
<div style={{
    margin: '10px'
}}>
  <div>Для справки</div>
  <table style={{
    borderCollapse: "collapse",
    width: "100%",
    maxWidth: "500px",
    border: "1px solid #ddd",
    textAlign: "center",
    fontSize: '20px'
}}>
    <thead>
        <tr style={{
            backgroundColor: "#f2f2f2",
            fontWeight: "bold"
        }}>
            <th style={{
                border: "1px solid #ddd",
                padding: "10px",
            }}>
                Должность
            </th>
            <th style={{
                border: "1px solid #ddd",
                padding: "10px",
            }}>
                ФИО
            </th>
        </tr>
    </thead>
    <tbody>
        {mainLetter.singers.map(el => (
            <tr key={el.singersId}>
                <td style={{
                    border: "1px solid #ddd",
                    padding: "10px"
                }}>
                  <EditableSpan title={el.postName} changeTitle={(title) => {onChangeSingers(el.singersId, 'postName', title)}}/>
                    
                </td>
                <td style={{
                    border: "1px solid #ddd",
                    padding: "10px"
                }}>
                  <EditableSpan title={el.name} changeTitle={(title) => {onChangeSingers(el.singersId, 'name', title)}}/>
                    
                </td>
            </tr>
        ))}
    </tbody>
</table>
</div>
<div>
<SpravkaButton 
letter={mainLetter}
toolName={toolName}
/>
</div>
    </div>
  )
};
