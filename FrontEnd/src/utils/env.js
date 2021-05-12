import pkJson from '../../package.json';

// let NODE_ENV = process.env.NODE_ENV || 'development';

let url = '';
// url = pkJson.config.url;
if (window.location.host !== 'localhost:8888') {
  url = `${window.location.protocol}//${window.location.host}`;
} else {
  url = pkJson.config.url;
}

export const env = {
  API_URL: 'http://localhost:8080/api/',
  AAD_CLIENT_ID: '225a8ec0-122d-46d2-9caa-852a641a12af',
};

export const defaultConfig = {
  url,
  api_url: `${url}/api/`,
};
