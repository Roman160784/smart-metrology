
//среднее значение из массива

export const calculateAverage = (data: string[], toFixed: number): string => {
    
    // Проверка на пустой массив
    if (data.length === 0) return '0'.replace('.', ',');
  
    // Сразу считаем сумму с округлением
    const factor = Math.pow(10, toFixed);
    const sum = data.reduce((acc, item) => {
      const num = parseFloat(item.replace(',', '.'));
      const rounded = Math.round(num * factor) / factor;
      return acc + rounded;
    }, 0);
  
    // Вычисляем среднее и округляем
    const average = sum / data.length;
    const roundedAverage = Math.round(average * factor) / factor;
  
    // Возвращаем строку с запятой
    return roundedAverage.toFixed(toFixed).replace('.', ',');
  };

//вычисление точности
  export const calculateAccuracySimple = (
    data: string[],
    point: string,
    toFixed: number
  ): string => {
    const target = parseFloat(point.replace(',', '.'));
    
    const maxDeviation = Math.max(
      ...data.map(item => 
        Math.abs(parseFloat(item.replace(',', '.')) - target)
      )
    );
    
    return maxDeviation.toFixed(toFixed).replace('.', ',');
  };

  //Вычисляем неравномерность

  export const calculateNonUniformity = (
    data: string[],        // массив измерений (строки с запятыми)
    averageValue: string,  // среднее значение (строка с запятой)
    toFixed: number        // количество знаков после запятой для округления
  ): string => {
    // 1. Парсим среднее значение
    const average = parseFloat(averageValue.replace(',', '.'));
    
    // 2. Парсим массив измерений
    const measurements = data.map(item => 
      parseFloat(item.replace(',', '.'))
    );
    
    // 3. Вычисляем отклонения ОТ СРЕДНЕГО ЗНАЧЕНИЯ
    const deviations = measurements.map(temp => 
      Math.abs(temp - average)  // абсолютное значение отклонения
    );
    
    // 4. Находим максимальное отклонение = неравномерность
    const maxDeviation = Math.max(...deviations);
    
    // 5. Округляем до toFixed знаков
    const factor = Math.pow(10, toFixed);
    const rounded = Math.round(maxDeviation * factor) / factor;
    
    // 6. Возвращаем строку с запятой
    return rounded.toFixed(toFixed).replace('.', ',');
  };




