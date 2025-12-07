import axios from 'axios';
import { getAccessToken, getBaseUrl, getUserName, getUserPsw } from '../util/TokenUtil';
import { ENDPOINTS } from './config';

export const client = axios.create();

const request = async function (options, contentType, authorize = true) {
  // 🔹 Region’a göre base URL al
  options.baseURL = await getBaseUrl();

  // 🔹 Log baseURL ve path
  console.log("🌍 [Network] baseURL:", options.baseURL);
  console.log("➡️ [Network] act (options.url):", options.url);

  // 🔹 Header’lar
  const header = {
    'Content-Type': contentType == null ? 'application/json' : contentType,
    Accept: 'application/json',
    'Access-Control-Allow-Origin': '*',
  };

  // 🔹 Kullanıcı bilgileri ekleme
  if (options.url !== ENDPOINTS.LOGIN) {
    const user = await getUserName();
    const psw = await getUserPsw();
    options.url = `${options.url}&user=${user}&psw=${psw}`;
    console.log("🟡 [Network] POST BODY:", options.data);
  } else {
    const parsed = JSON.parse(options.data);
    options.url = `${options.url}&user=${parsed.user}&psw=${parsed.psw}`;
  }

  // 🔹 Authorization ekle
  if (authorize) {
    header['Authorization'] = 'Bearer ' + (await getAccessToken());
  }

  // 🔹 Final URL log
  console.log("🌍 [Network] FINAL REQUEST =>", options.baseURL + options.url);

  const onSuccess = function (response) {
    console.log("✅ [Network] Success:", options.baseURL + options.url);
    return response.data;
  };

  const onError = function (error) {
    if (error.response) {
      console.debug('Status:', error.response.status);
    } else {
      console.debug('Error Message:', error.message);
    }
    console.log("❌ [Network] Error at:", options.baseURL + options.url);
    return Promise.reject(error.response?.data || error.message);
  };

  // 🔹 Axios isteği gönder
  return client({ ...options, headers: { ...options.headers, ...header } })
    .then(onSuccess)
    .catch(onError);
};

const getRequest = function (path, urlData = '', authorize = true, retData = true) {
  return request(
    {
      url: path + urlData,
      method: 'GET',
    },
    'application/json',
    authorize,
    retData,
  );
};

const postRequest = function (path, data, authorize = true) {
  return request(
    {
      url: path,
      method: 'POST',
      data: JSON.stringify(data),
    },
    'application/json',
    authorize,
  );
};

const RequestType = {
  getRequest,
  postRequest,
};

export default RequestType;
