export * from './constants';
export const setItemInLocalStorage = (key, value) => {
    if(!key || !value) {
     return console.error('key or value is missing');
    }
    const valueToStore = typeof value === 'string' ? value : JSON.stringify(value); 
    localStorage.setItem(key, valueToStore);
};

export const getItemInLocalStorage = (key) => {
    if(!key) {
     return console.error('key is missing');
    }
   return localStorage.getItem(key);
};

export const removeItemInLocalStorage = (key) => {
    if(!key) {
     return console.error('key is missing');
    } 
    localStorage.removeItem(key);
};


export const getFormBody = (params) => {
  let formBody = [];
  for (let property in params) {
    let encodedKey = encodeURIComponent(property); // 'user name' => 'user%20name'
    let encodedValue = encodeURIComponent(params[property]); // aakash 123 => aakash%20123

    formBody.push(encodedKey + '=' + encodedValue);
  }
  return formBody.join('&'); // 'username=aakash&password=123213'
};
