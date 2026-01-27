

// AttestatGenerator.tsx
import React from 'react';
import { Document, Packer, Paragraph, TextRun, AlignmentType, Table, TableRow, TableCell, WidthType } from "docx";
import { AttestationReport, TestTool } from './attestation';
import saveAs from 'file-saver';

interface AttestatGeneratorProps {
  report: AttestationReport;
  tool: TestTool;
}

export const AttestatGenerator: React.FC<AttestatGeneratorProps> = ({ report, tool }) => {
  
  // Функция расчета даты окончания
  const calculateValidUntil = (date: string): string => {
    const [day, month, year] = date.split('.').map(Number);
    const nextYear = year + 1;
    return `${day.toString().padStart(2, '0')}.${month.toString().padStart(2, '0')}.${nextYear}`;
  };

  // Создаем заголовки таблицы на основе данных из tool
  const tableHeaders = [
    { text: "№", width: 6 },
    { text: tool.title1 || "Наименование", width: 24 },
    { text: tool.title2 || "Значение величины ГОСТ (ТО)", width: 12 },
    { text: "Полученное значение величины", width: 12 },
    { text: tool.title3 || "Точность, данные ГОСТ (ТО) ±", width: 9 },
    { text: "Полученное значение точности, ±", width: 9 },
    { text: tool.title4 || "Неравномерность, данные ГОСТ (ТО) ±", width: 9 },
    { text: "Полученное значение неравномерности, ±", width: 9 },
    { text: tool.title5 || "Измеряемая величина", width: 12 },
    { text: tool.title6 || "Измеряемая величина", width: 12 }
  ];

  const generateAttestat = async () => {
    const validUntilDate = calculateValidUntil(report.date);
    
    const doc = new Document({
      sections: [{
        properties: {
          page: {
            margin: {
              top: 567,    // 1 см
              right: 567,
              bottom: 567,
              left: 567
            }
          }
        },
        children: [
          // ПЕРВАЯ СТРАНИЦА
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: {
              top: { style: "single", size: 6, color: "000000" },
              right: { style: "single", size: 6, color: "000000" },
              bottom: { style: "single", size: 6, color: "000000" },
              left: { style: "single", size: 6, color: "000000" }
            },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    margins: {
                      top: 400,  // Уменьшаем верхний отступ (было 567)
                      right: 200, // Уменьшаем боковые отступы
                      bottom: 567,
                      left: 300
                    },
                    children: [
                      // Заголовок организации - ПОДНИМАЕМ ВЫШЕ
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: "Государственное предприятие «Гомельский ЦСМС»",
                            size: 28,
                            bold: true
                          })
                        ],
                        alignment: AlignmentType.CENTER,
                        spacing: { after: 200 }  // Уменьшаем отступ снизу (было 400)
                      }),
                      
                      // Номер аттестата - ПОДНИМАЕМ ВЫШЕ
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: `АТТЕСТАТ № ${tool.attestationNumber}`,
                            bold: true,
                            size: 32
                          })
                        ],
                        alignment: AlignmentType.CENTER,
                        spacing: { after: 100 }  // Уменьшаем отступ (было 200)
                      }),
                      
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: `от ${report.date}`,
                            size: 28,
                            bold: true,
                          })
                        ],
                        alignment: AlignmentType.CENTER,
                        spacing: { after: 300 }  // Уменьшаем отступ (было 600)
                      }),
                      
                      // Основной текст
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: "Удостоверяет, что ",
                            size: 28
                          }),
                          new TextRun({
                            text: tool.name,
                            size: 28,
                            bold: true,
                            underline: {}
                          })
                        ],
                        spacing: { after: 50 }
                      }),
                      
                      // Наименование оборудования
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: "наименование аттестационного испытательного оборудования",
                            size: 20,
                            italics: true
                          })
                        ],
                        indent: { left: 2268 },
                        spacing: { after: 100 }
                      }),
                      
                      // Заводской номер
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: `заводской (инв.) № `,
                            size: 28
                          }),
                          new TextRun({
                            text: `${tool.serialNumber}`,
                            size: 28,
                            bold: true,
                            underline: {},
                          }),
                          new TextRun({
                            text: ", принадлежащее",
                            size: 28,
                          })
                        ],
                        spacing: { after: 200 }
                      }),
                      
                      // Организация владелец
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: report.organization,
                            bold: true,
                            size: 28,
                            underline: {},
                          })
                        ],
                        spacing: { after: 100 }
                      }),

                      new Paragraph({
                        children: [
                          new TextRun({
                            text: "наименование организации",
                            size: 20,
                            italics: true
                          })
                        ],
                        spacing: { after: 100 },
                        indent: { left: 2268 },
                      }),
                      
                      // Тип аттестации
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: "по результатам ",
                            size: 28
                          }),
                          new TextRun({
                            text: "первичной",
                            size: 28
                          }),
                          new TextRun({
                            text: ", ",
                            size: 28
                          }),
                          new TextRun({
                            text: "периодической",
                            size: 28
                          }),
                          new TextRun({
                            text: ", ",
                            size: 28
                          }),
                          new TextRun({
                            text: "внеочередной",
                            size: 28
                          }),
                          new TextRun({
                            text: " аттестации,",
                            size: 28
                          })
                        ],
                        spacing: { after: 50 }
                      }),
                      
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: "(ненужное зачеркнуть)",
                            size: 20,
                            italics: true
                          })
                        ],
                        indent: { left: 2268 },
                        spacing: { after: 400 }
                      }),
                      
                      // ГОСТ
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: "проведенной в соответствии с ",
                            size: 28
                          }),
                          new TextRun({
                            text: tool.nameGOST,
                            bold: true,
                            size: 28,
                            underline: {}
                          })
                        ],
                        spacing: { after: 100 }
                      }),
                      
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: "наименование и обозначение документа на методику аттестации",
                            size: 20,
                            italics: true
                          })
                        ],
                        indent: { left: 2268 },
                        spacing: { after: 400 }
                      }),
                      
                      // Соответствие требованиям
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: "соответствует требованиям ",
                            size: 28
                          }),
                          new TextRun({
                            text: tool.tnpa,
                            bold: true,
                            size: 28,
                            underline: {}
                          })
                        ],
                        spacing: { after: 100 }
                      }),
                      
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: "наименование ТНПА на методику испытаний продукции или эксплуатационного документа",
                            size: 20,
                            italics: true,
                          })
                        ],
                        spacing: { after: 100 }
                      }),
                      
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: "и допускается их применению.",
                            size: 28
                          })
                        ],
                        spacing: { after: 600 }
                      }),
                      
                      // Срок действия
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: "Срок действия аттестата до ",
                            size: 28
                          }),
                          new TextRun({
                            text: validUntilDate,
                            bold: true,
                            size: 28,
                            underline: {}
                          })
                        ],
                        spacing: { after: 1200 }
                      }),
                      
                      // Подписи
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: "M.П.",
                            size: 32,
                            bold: true
                          }),
                        ],
                        spacing: { after: 1600 }
                      }), 
                      
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: `${report.profession}            __________        ${report.engineer}`,
                            size: 32,
                            bold: true,
                          }),
                        ],
                        spacing: { after: 50 },
                        indent: { left: 800 },
                      }),        
                      
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: `должность исполнителя                  подпись                         расшифровка подписи`,
                            size: 20,
                            italics: true
                          }),
                        ],
                        spacing: { after: 2200},
                        indent: { left: 600 },
                      })
                    ]
                  })
                ]
              })
            ]
          })
        ]
      },
      // ВТОРАЯ СТРАНИЦА
      {
        properties: {
          page: {
            margin: {
              top: 567,
              right: 260,
              bottom: 260,
              left: 284
            }
          }
        },
        children: [
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: {
              top: { style: "single", size: 6, color: "000000" },
              right: { style: "single", size: 6, color: "000000" },
              bottom: { style: "single", size: 6, color: "000000" },
              left: { style: "single", size: 6, color: "000000" }
            },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    margins: {
                      top: 300,    // Уменьшаем верхний отступ
                      right: 80,   // Уменьшаем правый отступ (было 567) - ТАБЛИЦА ШИРЕ
                      bottom: 300,
                      left: 80     // Уменьшаем левый отступ (было 567) - ТАБЛИЦА ШИРЕ
                    },
                    children: [
                      // Заголовок H3
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: "Результаты аттестации",
                            size: 32,
                            bold: true
                          })
                        ],
                        alignment: AlignmentType.CENTER,
                        spacing: { after: 200 }  // Уменьшаем отступ
                      }),
                      
                      // Название таблицы
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: "Точностные характеристики",
                            size: 28,
                            bold: true
                          })
                        ],
                        alignment: AlignmentType.CENTER,
                        spacing: { after: 150 }  // Уменьшаем отступ
                      }),
                      
                      // Таблица с данными (динамически создаем) - РАСШИРЯЕМ
                      new Table({
                        width: { size: 100, type: WidthType.PERCENTAGE },
                        columnWidths: tableHeaders.map(header => header.width),
                        margins: {
                          top: 0,
                          right: 0,
                          bottom: 0,
                          left: 0
                        },
                        borders: {
                          top: { style: "single", size: 2, color: "000000" },
                          right: { style: "single", size: 2, color: "000000" },
                          bottom: { style: "single", size: 2, color: "000000" },
                          left: { style: "single", size: 2, color: "000000" },
                          insideHorizontal: { style: "single", size: 1, color: "000000" },
                          insideVertical: { style: "single", size: 1, color: "000000" }
                        },
                        rows: [
                          // Заголовок таблицы (мапим заголовки)
                          new TableRow({
                            children: tableHeaders.map(header => 
                              new TableCell({
                                children: [
                                  new Paragraph({
                                    children: [
                                      new TextRun({
                                        text: header.text,
                                        bold: true,
                                        size: 18.5  // Уменьшаем размер шрифта для заголовков
                                      })
                                    ],
                                    alignment: AlignmentType.CENTER
                                  })
                                ],
                                margins: { top: 80, right: 14, bottom: 80, left: 14 },  // Уменьшаем отступы
                                verticalAlign: "center"
                              })
                            )
                          }),
                          
                          // Данные строки (мапим данные из tool.valueForReportTable)
                          ...(tool.valueForReportTable?.map((rowData, index) => 
                            new TableRow({
                              children: [
                                // 1. Номер п/п
                                new TableCell({
                                  children: [
                                    new Paragraph({
                                      text: (index + 1).toString(),
                                      alignment: AlignmentType.CENTER
                                    })
                                  ],
                                  margins: { top: 20, right: 80, bottom: 20, left: 80 },
                                  verticalAlign: "center"
                                }),
                                
                                // 2. Наименование (title1)
                                new TableCell({
                                  children: [
                                    new Paragraph({
                                      text: rowData.discription || "",
                                      alignment: AlignmentType.LEFT
                                    })
                                  ],
                                  margins: { top: 20, right: 20, bottom: 20, left: 20 },
                                  verticalAlign: "center"
                                }),
                                
                                // 3. Значение величины ГОСТ (ТО) (title2)
                                new TableCell({
                                  children: [
                                    new Paragraph({
                                      text: rowData.point || "",
                                      alignment: AlignmentType.CENTER
                                    })
                                  ],
                                  margins: { top: 20, right: 20, bottom: 20, left: 20 },
                                  verticalAlign: "center"
                                }),
                                
                                // 4. Полученное значение величины
                                new TableCell({
                                  children: [
                                    new Paragraph({
                                      text: rowData.measuredMidleValue || "",
                                      alignment: AlignmentType.CENTER
                                    })
                                  ],
                                  margins: { top: 20, right: 20, bottom: 20, left: 20 },
                                  verticalAlign: "center"
                                }),
                                
                                // 5. Точность, данные ГОСТ (ТО) ± (title3)
                                new TableCell({
                                  children: [
                                    new Paragraph({
                                      text: rowData.tochnostGOST || "",
                                      alignment: AlignmentType.CENTER
                                    })
                                  ],
                                  margins: { top: 80, right: 20, bottom: 80, left: 20 },
                                  verticalAlign: "center"
                                }),
                                
                                // 6. Полученное значение точности, ±
                                new TableCell({
                                  children: [
                                    new Paragraph({
                                      text: rowData.countTochnost || "-",
                                      alignment: AlignmentType.CENTER
                                    })
                                  ],
                                  margins: { top: 80, right: 20, bottom: 80, left: 20 },
                                  verticalAlign: "center"
                                }),
                                
                                // 7. Неравномерность, данные ГОСТ (ТО) ± (title4)
                                new TableCell({
                                  children: [
                                    new Paragraph({
                                      text: rowData.nerovnomernostGOST || "",
                                      alignment: AlignmentType.CENTER
                                    })
                                  ],
                                  margins: { top: 80, right: 20, bottom: 80, left: 20 },
                                  verticalAlign: "center"
                                }),
                                
                                // 8. Полученное значение неравномерности, ±
                                new TableCell({
                                  children: [
                                    new Paragraph({
                                      text: rowData.countNerovnomernost || "-",
                                      alignment: AlignmentType.CENTER
                                    })
                                  ],
                                  margins: { top: 80, right: 20, bottom: 80, left: 20 },
                                  verticalAlign: "center"
                                }),
                                
                                // 9. Измеряемая величина (title5)
                                new TableCell({
                                  children: [
                                    new Paragraph({
                                      text: rowData.value || "",
                                      alignment: AlignmentType.CENTER
                                    })
                                  ],
                                  margins: { top: 80, right: 20, bottom: 80, left: 20 },
                                  verticalAlign: "center"
                                }),
                                new TableCell({
                                  children: [
                                    new Paragraph({
                                      text: rowData.sootv || "",
                                      alignment: AlignmentType.CENTER
                                    })
                                  ],
                                  margins: { top: 80, right: 20, bottom: 80, left: 20 },
                                  verticalAlign: "center"
                                }),
                                
                              ],
                              
                            }),
                              
                          ) || [])
                          
                        ]
                        
                      }),
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: `Аттестацию проводил: ${report.profession} ${report.engineer} _______________________`,
                            size: 28,
                            underline: {}
                          }),
                        ],
                        spacing: { after: 50 },
                        indent: { left: 800 },
                      }),
                      new Paragraph({
                        children: [
                        
                          new TextRun({
                            text: `должность, фамилия, имя, отчество, подпись`,
                            size: 20,
                            italics: true
                          }),
                        ],
                        spacing: { after: 50 },
                        indent: { left: 4000 },
                      }),
                      // Если данных нет, показываем сообщение
                      ...(tool.valueForReportTable?.length === 0 ? [
                        new Paragraph({
                          children: [
                            new TextRun({
                              text: "Нет данных для отображения",
                              size: 24,
                              italics: true
                            })
                          ],
                          alignment: AlignmentType.CENTER,
                          spacing: { before: 400, after: 200 }
                        })
                      ] : [])
                    ]
                  })
                ]
              })
            ]
          })
        ]
      }]
    });

    // Генерируем и скачиваем документ
    try {
      const blob = await Packer.toBlob(doc);
      saveAs(blob, `Аттестат_${tool.attestationNumber.replace(/\//g, '_')}.docx`);
    } catch (error) {
      console.error('Ошибка при создании аттестата:', error);
      alert('Произошла ошибка при создании аттестата');
    }
  };

  return (
    <button 
      onClick={generateAttestat}
      style={{
        marginLeft: '10px',
        padding: '4px 12px',
        fontSize: '11px',
        border: '1px solid #007bff',
        borderRadius: '3px',
        backgroundColor: 'white',
        color: '#007bff',
        cursor: 'pointer'
      }}
    >
      Сформировать аттестат
    </button>
  );
};

export default AttestatGenerator;