// import axios from "axios";

// export const AdminInstance = axios.create({
//     baseURL: `https://gm.belgim.by/certificate/`,

// })

// type CustomerType = {
//     client_code: string
//     id: string
//     text: string
//     unp: string
// }

// export const customerAPI = {
//     findCustomer(client_code: string) {
//         const encodedClientCode = encodeURIComponent(client_code);
//         let res = AdminInstance.get<CustomerType[]>(`clients-list?q=${encodedClientCode}&id=0`);
//         console.log(res);
//         return res
        
//     },
// }

import axios from "axios";

export const AdminInstance = axios.create({
  baseURL: `https://gm.belgim.by/certificate/`,
});

type CustomerType = {
  client_code: string;
  id: string;
  text: string;
  unp: string;
};

export const customerAPI = {
  findCustomer(client_code: string) {
    const encodedClientCode = encodeURIComponent(client_code);
    return AdminInstance.get<CustomerType[]>(`clients-list?q=${encodedClientCode}&id=0`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        debugger
        if (error.code === 'ERR_NETWORK"') {
          const redirectUrl = error.response.headers['location'];
          console.log(redirectUrl); // Выводим URL для перенаправления
          // Выполняйте дополнительные действия с URL для перенаправления при необходимости
        } else {
          console.error(error); // Обрабатываем другие случаи ошибок
        }
        throw error;
      });
  },
};