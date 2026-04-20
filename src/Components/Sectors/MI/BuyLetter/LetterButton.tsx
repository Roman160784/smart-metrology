
import React from "react";
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  AlignmentType,
  Table,
  TableRow,
  TableCell,
  WidthType,
  PageBreak,
  BorderStyle,
} from "docx";
import { saveAs } from "file-saver";
import { LettrType } from "./LatterBuyEquipment";

type Props = {
  letter: LettrType;
};

export const CreateLettersButton = ({ letter }: Props) => {

  // 👉 текст
  const text = (value: string, bold = false, size = 18) =>
  new TextRun({
    text: value,
    bold,
    size,
    font: "Times New Roman",
  });

  // 👉 абзац (НОРМАЛЬНЫЙ spacing)
  const p = (
    value: string,
    bold = false,
    align?: any,
    after = 0,
    indentLeft = 0,
    size = 18
  ) =>
    new Paragraph({
      alignment: align,
      children: [text(value, bold, size)],
      spacing: after ? { after } : undefined,
      indent: indentLeft ? { left: indentLeft } : undefined,
    });
  // 👉 таблица без границ
  const noBorderTable = (rows: TableRow[]) =>
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      layout: "fixed",
      borders: {
        top: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
        bottom: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
        left: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
        right: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
        insideHorizontal: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
        insideVertical: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
      },
      rows,
    });

  const createLetters = async () => {
    const children: any[] = [];

    letter.organizations.forEach((org, index) => {

      // 🔝 ШАПКА
      children.push(
        noBorderTable([
          new TableRow({
            children: [
              // LEFT
              new TableCell({
                width: { size: 50, type: WidthType.PERCENTAGE },
                children: [
                  p("ДЗЯРЖАУНЫ КАМ1ТЭТ ПА СТАНДАРТЫЗАЦЫ1", false, AlignmentType.CENTER,),
                  p("РЭСПУБЛ1К1 БЕЛАРУСЬ", false, AlignmentType.CENTER, 100),

                  p("«РЭСПУБЛ1КАНСКАЕ", true, AlignmentType.CENTER, ),
                  p("УН1ТАРНАЕ ПРАДПРЫЕМСТВА", true, AlignmentType.CENTER, ),

                  p("«ГОМЕЛЬСК1 ЦЭНТР СТАНДАРТЫЗАЦЫ1,", true, AlignmentType.CENTER,),
                  p("МЕТРАЛОГИ I СЕРТЫФ1КАЦЫ1»", true, AlignmentType.CENTER, 100),

                  p("вул. Лепяшынскага, 1, 246015, г. Гомель,", false, AlignmentType.CENTER,),
                  p("тэл. (0232) 26 33 01, факс (0232) 26 33 00", false, AlignmentType.CENTER, ),
                  p("e-mail: mail@gomelcsms.by, www. gomelcsms.by", false, AlignmentType.CENTER,),
                  p("p/p 3012041322298 у ф-ле № 300", false, AlignmentType.CENTER,),
                  p("ГАУ ААТ «ААБ Беларусбанк»,", false, AlignmentType.CENTER,),
                  p("вул. Фрунзе, 6а, 246050, г. Гомель ", false, AlignmentType.CENTER,),
                  p("МФА 151501661, УНП 400052222, АКПА 02568874", false, AlignmentType.CENTER,),
                ],
              }),

              // RIGHT
              new TableCell({
                width: { size: 50, type: WidthType.PERCENTAGE },
                children: [
                  p("ГОСУДАРСТВЕННЫЙ КОМИТЕТ ПО СТАНДАРТИЗАЦИИ", false, AlignmentType.CENTER),
                  p("РЕСПУБЛИКИ БЕЛАРУСЬ", false, AlignmentType.CENTER, 100),

                  p("«РЕСПУБЛИКАНСКОЕ", true, AlignmentType.CENTER),
                  p("УНИТАРНОЕ ПРЕДПРИЯТИЕ", true, AlignmentType.CENTER),

                  p("«ГОМЕЛЬСКИЙ ЦЕНТР СТАНДАРТИЗАЦИИ,", true, AlignmentType.CENTER),
                  p("МЕТРОЛОГИИ И СЕРТИФИКАЦИИ»", true, AlignmentType.CENTER, 100),

                  p("ул. Лепешинского, 1, 246015, г. Гомель,", false, AlignmentType.CENTER),
                  p("тел. (0232) 26 33 01, факс (0232) 26 33 00", false, AlignmentType.CENTER),
                  p("e-mail: mail@gomelcsms.by, www. gomelcsms.by", false, AlignmentType.CENTER),
                  p("p/с 3012041322298 в ф-ле № 300", false, AlignmentType.CENTER),
                  p("ГОУ ОАО «АСБ Беларусбанк»,", false, AlignmentType.CENTER),
                  p(" ул. Фрунзе, 6а, 246050, г. Гомель ", false, AlignmentType.CENTER),
                  p("МФО 151501661, УНП 400052222, ОКПО 02568874", false, AlignmentType.CENTER),
                ],
              }),
            ],
          }),
        ])
      );

      children.push(p("", false, undefined, 100));

      children.push(
        noBorderTable([
          new TableRow({
            children: [
              // LEFT
              new TableCell({
                width: { size: 50, type: WidthType.PERCENTAGE },
                children: [
                  p(`${letter.date} № 06-21/`, false, AlignmentType.LEFT,0, 0, 28),
                  
                ],
              }),

              // RIGHT
              new TableCell({
                width: { size: 50, type: WidthType.PERCENTAGE },
                children: [
                  p("Руководителю", false, AlignmentType.LEFT,0, 0, 28),
                  p(`${org.name}`, false, AlignmentType.LEFT,0, 0, 28),

                  p(`адрес: ${org.adress}`, false, AlignmentType.LEFT,0, 0, 28),
                  p(`e-mail: ${org.email}`, false, AlignmentType.LEFT,0, 0, 28),

                ],
              }),
            ],
          }),
        ])
      );

      children.push(p("", false, undefined, 100));

      
   

      children.push(p("", false, undefined, 200));

      

      // 🧾 заголовок
      children.push(
        p("Об участии в процедуре закупки", false, AlignmentType.CENTER, 0,0,28)
      );

      children.push(p("", false, undefined, 200));

      // 📝 текст
      children.push(
        p(`${letter.latterText}`, false, AlignmentType.LEFT, 0,0,28)
      );

      children.push(p("", false, undefined, 240));

      // ✍️ подпись
      children.push(
        noBorderTable([
          new TableRow({
            children: [
              new TableCell({
                children: [
                  p("Заместитель директора", false, AlignmentType.LEFT, 0, 0, 28),
                ],
              }),
      
              new TableCell({
                children: [
                  p(letter.singer, false, AlignmentType.RIGHT, 0, 0, 28),
                ],
              }),
            ],
          }),
        ])
      );

      children.push(p("", false, undefined, 100));

      // 📞 исполнитель
      children.push(p(letter.isponitel));

      // 📄 разрыв страницы
      if (index !== letter.organizations.length - 1) {
        children.push(new Paragraph({ children: [new PageBreak()] }));
      }
    });

    const doc = new Document({
        sections: [
          {
            properties: {
              page: {
                margin: {
                  left: 1134,  // 1 см
                  right: 567, // 👈 меньше отступ справа (0.5 см)
                  bottom: 567,
                },
              },
            },
            children,
          },
        ],
      });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, "letters.docx");
  };

  return <button onClick={createLetters}>Создать письма</button>;
};
