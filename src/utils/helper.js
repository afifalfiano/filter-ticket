/* eslint-disable object-curly-newline */
/* eslint-disable consistent-return */
/* eslint-disable import/prefer-default-export */
import * as CryptoJS from 'crypto-js';

function formatBytes(bytes, decimals = 2) {
  if (!+bytes) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / k ** i).toFixed(dm))} ${sizes[i]}`;
}

function daysCompare(startDate, endDate) {
  const difference = startDate.getTime() - endDate.getTime();
  const TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
  return TotalDays;
}

function encryptLocalStorage(key, data) {
  // Encrypt Info
  const encryptInfo = encodeURIComponent(
    CryptoJS.AES.encrypt(JSON.stringify(data), 'CCO').toString()
  );
  localStorage.setItem(key, encryptInfo);
}

function decryptLocalStorage(key) {
  // Decrypt Info
  const dataLocal = localStorage.getItem(key);
  if (dataLocal !== null) {
    const data = CryptoJS.AES.decrypt(decodeURIComponent(dataLocal), 'CCO');
    const decryptedInfo = JSON.parse(data.toString(CryptoJS.enc.Utf8));
    return decryptedInfo;
  }
  return null;
}
export { formatBytes, daysCompare, encryptLocalStorage, decryptLocalStorage };
