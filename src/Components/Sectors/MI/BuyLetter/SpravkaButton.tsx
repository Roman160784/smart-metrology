
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
  BorderStyle,
} from "docx";
import { saveAs } from "file-saver";
import { LettrType } from "./LatterBuyEquipment";

type LettrTypeProps = {
  letter: LettrType;
  toolName: string;
};

export const SpravkaButton = ({ letter, toolName }: LettrTypeProps) => {
  const text = (value: string, bold = false, size = 24) =>
    new TextRun({
      text: value,
      bold,
      size,
      font: "Times New Roman",
    });

  const p = (
    value: string,
    bold = false,
    align?: any,
    after = 0,
    size = 24
  ) =>
    new Paragraph({
      alignment: align,
      spacing: after ? { after } : undefined,
      children: [text(value, bold, size)],
    });

  const cell = (value: string, bold = false) =>
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({
          text: value,
          bold,
          size: 24,
          font: "Times New Roman",
        }),
      ],
    });

  const createSpravka = async () => {
    const children: any[] = [];

    // 🧾 Заголовок
    children.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 100 },
        children: [
          new TextRun({
            text: "СПРАВКА",
            bold: true,
            size: 28,
            font: "Times New Roman",
          }),
        ],
      })
    );

    children.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 50 },
        children: [
          new TextRun({
            text: "о маркетинговом исследовании",
            size: 24,
            font: "Times New Roman",
          }),
        ],
      })
    );

    children.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 100 },
        children: [
          new TextRun({
            text:
              "при ориентировочной стоимости закупки от 200 до 1000 базовых величин",
            size: 24,
            font: "Times New Roman",
          }),
        ],
      })
    );

    // 📌 1. Предмет закупки
    children.push(p("1. Предмет закупки:", false, AlignmentType.LEFT, 100));

    // 📊 ТАБЛИЦА
    const table = new Table({
      width: {
        size: 100,
        type: WidthType.PERCENTAGE,
      },
      rows: [
        // HEADER
        new TableRow({
          children: [
            new TableCell({ children: [cell("№ п/п", true)] }),
            new TableCell({
              children: [cell("Наименование товаров", true)],
            }),
            new TableCell({ children: [cell("Требования", true)] }),
            new TableCell({ children: [cell("Количество", true)] }),
            new TableCell({ children: [cell("Оплата", true)] }),
            new TableCell({ children: [cell("Срок", true)] }),
          ],
        }),

        // ROW
        new TableRow({
          children: [
            new TableCell({ children: [cell("1")] }),
            new TableCell({ children: [cell(toolName)] }),
            new TableCell({
              children: [
                cell("в соответствии с техническими требованиями"),
              ],
            }),
            new TableCell({ children: [cell("1 шт.")] }),
            new TableCell({ children: [cell("100% предоплата")] }),
            new TableCell({ children: [cell("до 120 дней")] }),
          ],
        }),
      ],
    });

    // ⚠️ ВАЖНО: таблицу добавляем ОТДЕЛЬНО, НЕ внутри Paragraph
    children.push(table);

    // 📌 2. Иные сведения
    children.push(
      new Paragraph({
        spacing: { after: 0 },
        children: [
          new TextRun({
            text: "2. Иные сведения:",
            size: 24,
            font: "Times New Roman",
          }),
        ],
      })
    );

    children.push(
      new Paragraph({
        spacing: { after: 0 },
        children: [
          new TextRun({
            text:
              "2.1 Перед закупкой начальником сектора ЭМР испытательного центра Матвеенко Р.С. было проведено маркетинговое исследование рынка по предмету закупки, по результатам маркетингового исследования установлено, что в Республики Беларусь указанный товар ПРОИЗВОДИТСЯ.",
            size: 24,
            font: "Times New Roman",
          }),
        ],
      })
    );

    children.push(
      new Paragraph({
        spacing: { after: 0 },
        children: [
          new TextRun({
            text:
              `К участию в закупке ${toolName} были приглашены организации:`,
            size: 24,
            font: "Times New Roman",
          }),
        ],
      })
    );

    // список организаций
    children.push(
        new Paragraph({
          spacing: { after: 0 },
          children: [
            new TextRun({
              text: letter.organizations
                .map((org) => `${org.name} (посредник)`)
                .join(", "),
              size: 24,
              font: "Times New Roman",
            }),
          ],
        })
      );

      children.push(
        new Paragraph({
          spacing: { after: 0 },
          children: [
            new TextRun({
              text:
                `2.2. Закупаемый товар не содержится в перечне товаров согласно Приложению 32 к постановлению Совета Министров Республики Беларусь 15.03.2012 № 229.`,
              size: 24,
              font: "Times New Roman",
            }),
          ],
        })
      );
      children.push(
        new Paragraph({
          spacing: { after: 0 },
          children: [
            new TextRun({
              text:
                `2.3. Товар не содержится в реестре опасной продукции.`,
              size: 24,
              font: "Times New Roman",
            }),
          ],
        })
      );
      children.push(
        new Paragraph({
          spacing: { after: 0 },
          children: [
            new TextRun({
              text:
                `3. Основания исследования – закупка согласно Бизнес-плана на 2026 год и заявке на текущую закупку (приобретение) продукции (услуги) №20 от 14.01.2026.`,
              size: 24,
              font: "Times New Roman",
            }),
          ],
        })
      );

      children.push(
        new Paragraph({
          spacing: { after: 0 },
          children: [
            new TextRun({
              text:
                `4 Сведения об исследовании конъюнктуры рынка закупаемых товаров (работ, услуг):`,
              size: 24,
              font: "Times New Roman",
            }),
          ],
        })
      );

      const suppliersTable = new Table({
        width: {
          size: 100,
          type: WidthType.PERCENTAGE,
        },
        rows: [
          // 🔹 HEADER
          new TableRow({
            children: [
              new TableCell({
                children: [
                  cell(
                    "Наименование поставщика (подрядчика, исполнителя), с указанием статуса* – производитель/ сбытовая организации (официальный торговый представитель) производителя/ посредник",
                    true
                  ),
                ],
              }),
              new TableCell({
                children: [cell("Место нахождения", true)],
              }),
              new TableCell({
                children: [cell("Цена на предлагаемый товар (работу, услугу) с НДС, белорусские рубли", true)],
              }),
              new TableCell({
                children: [cell("Способ исследования", true)],
              }),
            ],
          }),
      
          // 🔹 DATA (map)
          ...letter.organizations.map(
            (org, index) =>
              new TableRow({
                children: [
                  // 1 колонка
                  new TableCell({
                    children: [cell(`${org.name} (посредник)`)],
                  }),
      
                  // 2 колонка
                  new TableCell({
                    children: [cell(org.adress)],
                  }),
      
                  // 3 колонка (пустая)
                  new TableCell({
                    children: [cell("")],
                  }),
      
                  // 4 колонка
                  new TableCell({
                    children: [
                      cell(
                        "Предоставлено коммерческое предложение\n(вх. № 4298 от 08.04.2026 г.)"
                      ),
                    ],
                  }),
                ],
              })
          ),
        ],
      });

      children.push(suppliersTable);

      children.push(
        new Paragraph({
          spacing: { after: 20 },
          children: [
            new TextRun({
              text:
                `* В случае не подтверждения статуса «производитель» или «сбытовая организация (официальный торговый представитель)», статус такого участника определяется как «посредник».`,
              size: 24,
              italics: true,
              font: "Times New Roman",
            }),
          ],
        })
      );

      children.push(
        new Paragraph({
          spacing: { after: 0 },
          children: [
            new TextRun({
              text:
                `5 Сведения о результатах:`,
              size: 24,
              font: "Times New Roman",
            }),
          ],
        })
      );
      children.push(
        new Paragraph({
          spacing: { after: 0 },
          children: [
            new TextRun({
              text:
                `Полное наименование организации (индивидуального предпринимателя, фамилия, собственное имя и отчество физического лица), с которой рекомендовано заключить договор:                               на сумму                     белорусских рублей без учёта НДС 20 %. Стоимость товара составляет                      белорусских рублей с учётом НДС 20%.`,
              size: 24,
              font: "Times New Roman",
            }),
          ],
        })
      );
      
      const signTable = new Table({
        width: {
          size: 100,
          type: WidthType.PERCENTAGE,
        },
        borders: {
          top: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
          bottom: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
          left: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
          right: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
          insideHorizontal: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
          insideVertical: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
        },
        rows: letter.singers.slice(0, 5).map((singer) =>
          new TableRow({
            children: [
              // 1️⃣ Должность
              new TableCell({
                children: [
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: singer.postName,
                        size: 24,
                        font: "Times New Roman",
                      }),
                    ],
                  }),
                ],
              }),
      
              // 2️⃣ Подпись (линия + текст)
              new TableCell({
                children: [
                  new Paragraph({
                    alignment: AlignmentType.CENTER,
                    children: [
                      new TextRun({
                        text: "____________",
                        size: 24,
                      }),
                    ],
                  }),
                  new Paragraph({
                    alignment: AlignmentType.CENTER,
                    children: [
                      new TextRun({
                        text: "(подпись)",
                        size: 20,
                        italics: true,
                      }),
                    ],
                  }),
                ],
              }),
      
              // 3️⃣ ФИО
              new TableCell({
                children: [
                  new Paragraph({
                    alignment: AlignmentType.RIGHT,
                    children: [
                      new TextRun({
                        text: singer.name,
                        size: 24,
                        font: "Times New Roman",
                      }),
                    ],
                  }),
                ],
              }),
            ],
          })
        ),
      });

      children.push(signTable);

      children.push(
        new Paragraph({
          spacing: { after: 0 },
          children: [
            new TextRun({
              text:
                `Члены комиссии по закупкам:`,
              size: 24,
              font: "Times New Roman",
            }),
          ],
        })
      );

      const signTableRest = new Table({
        width: {
          size: 100,
          type: WidthType.PERCENTAGE,
        },
        borders: {
          top: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
          bottom: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
          left: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
          right: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
          insideHorizontal: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
          insideVertical: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
        },
        rows: letter.singers.slice(5).map((singer) =>
          new TableRow({
            children: [
              // 1️⃣ Должность
              new TableCell({
                children: [
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: singer.postName,
                        size: 24,
                        font: "Times New Roman",
                      }),
                    ],
                  }),
                ],
              }),
      
              // 2️⃣ Подпись
              new TableCell({
                children: [
                  new Paragraph({
                    alignment: AlignmentType.CENTER,
                    children: [
                      new TextRun({
                        text: "____________",
                        size: 24,
                      }),
                    ],
                  }),
                  new Paragraph({
                    alignment: AlignmentType.CENTER,
                    children: [
                      new TextRun({
                        text: "(подпись)",
                        size: 20,
                        italics: true,
                      }),
                    ],
                  }),
                ],
              }),
      
              // 3️⃣ ФИО
              new TableCell({
                children: [
                  new Paragraph({
                    alignment: AlignmentType.RIGHT,
                    children: [
                      new TextRun({
                        text: singer.name,
                        size: 24,
                        font: "Times New Roman",
                      }),
                    ],
                  }),
                ],
              }),
            ],
          })
        ),
      });

      children.push(signTableRest)

      children.push(
        new Paragraph({
          spacing: { after: 20 },
          children: [
            new TextRun({
              text:
                `Решение руководителя:`,
              size: 24,
              font: "Times New Roman",
            }),
          ],
        })
      );

      children.push(
        new Paragraph({
          spacing: { after: 20 },
          children: [
            new TextRun({
              text:
                `Закупку товара (работы, услуги) произвести у                      на сумму                    белорусских рублей без учёта НДС 20 %. Стоимость товара составляет                                      белорусских рублей с учётом НДС 20%.`,
              size: 24,
              font: "Times New Roman",
            }),
          ],
        })
      );

      const directorTable = new Table({
        width: {
          size: 100,
          type: WidthType.PERCENTAGE,
        },
        borders: {
          top: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
          bottom: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
          left: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
          right: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
          insideHorizontal: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
          insideVertical: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
        },
        rows: [
          // 🔹 верхняя строка
          new TableRow({
            children: [
              // Должность
              new TableCell({
                width: { size: 40, type: WidthType.PERCENTAGE },
                children: [
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: "Директор",
                        size: 24,
                        font: "Times New Roman",
                      }),
                    ],
                  }),
                ],
              }),
      
              // Линия
              new TableCell({
                width: { size: 30, type: WidthType.PERCENTAGE },
                children: [
                  new Paragraph({
                    alignment: AlignmentType.CENTER,
                    children: [
                      new TextRun({
                        text: "______________",
                        size: 24,
                      }),
                    ],
                  }),
                ],
              }),
      
              // ФИО
              new TableCell({
                width: { size: 30, type: WidthType.PERCENTAGE },
                children: [
                  new Paragraph({
                    alignment: AlignmentType.RIGHT,
                    children: [
                      new TextRun({
                        text: "М.А.Казачок",
                        size: 24,
                        font: "Times New Roman",
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
      
          // 🔹 нижняя строка (подпись)
          new TableRow({
            children: [
              new TableCell({ children: [new Paragraph("")] }),
      
              new TableCell({
                children: [
                  new Paragraph({
                    alignment: AlignmentType.CENTER,
                    children: [
                      new TextRun({
                        text: "(подпись)",
                        size: 20,
                        italics: true,
                      }),
                    ],
                  }),
                ],
              }),
      
              new TableCell({ children: [new Paragraph("")] }),
            ],
          }),
        ],
      });

      children.push(directorTable);

      const dateTable = new Table({
        width: {
          size: 100,
          type: WidthType.PERCENTAGE,
        },
        borders: {
          top: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
          bottom: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
          left: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
          right: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
          insideHorizontal: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
          insideVertical: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
        },
        rows: [
          // 🔹 линия
          new TableRow({
            children: [
              new TableCell({
                width: { size: 40, type: WidthType.PERCENTAGE },
                children: [new Paragraph("")],
              }),
      
              new TableCell({
                width: { size: 30, type: WidthType.PERCENTAGE },
                children: [
                  new Paragraph({
                    alignment: AlignmentType.LEFT,
                    children: [
                      new TextRun({
                        text: "________________",
                        size: 24,
                      }),
                    ],
                  }),
                ],
              }),
      
              new TableCell({
                width: { size: 30, type: WidthType.PERCENTAGE },
                children: [new Paragraph("")],
              }),
            ],
          }),
      
          // 🔹 (дата)
          new TableRow({
            children: [
              new TableCell({ children: [new Paragraph("")] }),
      
              new TableCell({
                children: [
                  new Paragraph({
                    alignment: AlignmentType.LEFT,
                    children: [
                      new TextRun({
                        text: "(дата)",
                        size: 20,
                        italics: true,
                      }),
                    ],
                  }),
                ],
              }),
      
              new TableCell({ children: [new Paragraph("")] }),
            ],
          }),
        ],
      });
      

      children.push(dateTable);

    // 📄 документ
    const doc = new Document({
      sections: [
        {
          children,
        },
      ],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, "spravka.docx");
  };

  return <button onClick={createSpravka}>Создать СПРАВКУ</button>;
};